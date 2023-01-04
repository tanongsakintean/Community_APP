import React from "react";
import logo from "../assets/logo.png";

import { AiOutlinePlusSquare, AiFillBell } from "react-icons/ai";
import { useStateValue } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { baseImg } from "../constants/constant";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const [initialState, dispatch] = useStateValue();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between bg-[#ffffff] shadow-md sticky z-10 top-0">
      <Link to="/">
        <div className="flex">
          <img src={logo} className="h-20 w-20" />
          <div className="flex items-center font-bold text-lg font-mono">
            <h1>Community APP</h1>
          </div>
        </div>
      </Link>

      <div className="flex justify-between items-center px-2">
        <div>
          <AiOutlinePlusSquare
            onClick={() =>
              dispatch({
                type: "setShowModal",
                showModal: true,
              })
            }
            className="text-4xl  cursor-pointer"
          />
        </div>
    
        <div className="mx-2 flex justify-center items-center mr-5 ">
          <Link
            to="/profile"
            onClick={() => {
              dispatch({
                type: "setProfile",
                payload: window.localStorage.getItem("user_id"),
              });
            }}
          >
            {window.localStorage.getItem("user_img") == "" ? (
              <FaUserCircle className="text-4xl cursor-pointer" />
            ) : (
              <img
                src={
                  baseImg +
                  window.localStorage.getItem("user_id") +
                  "/profile/" +
                  window.localStorage.getItem("user_img")
                }
                className="w-12 h-12  object-cover  shadow-md rounded-[50px] cursor-pointer"
              />
            )}
          </Link>
        </div>
        <div>
          <button
            onClick={() => {
              window.localStorage.clear();
              navigate("/login");
            }}
            type="button"
            className="p-3 bg-[#B1B2FF] hover:bg-[#6f71f4] rounded-[15px] text-white font-bold  "
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
