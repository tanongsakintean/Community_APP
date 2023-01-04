import React from "react";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import { useStateValue } from "../store/store";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/constant";

function forgotPassword() {
  const [initialState, dispatch] = useStateValue();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let username = data.username;
    Axios.post(baseUrl + "/api_forgotpassword.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "checkEmail",
        username: username,
      },
    }).then((res) => {
      let { status, meg, data } = res.data;
      if (status) {
        Swal.fire({
          icon: "success",
          text: meg,
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          dispatch({
            type: "setUserName",
            payload: username,
          });
          navigate("../changepassword");
        });
      } else {
        Swal.fire({
          icon: "error",
          text: meg,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };
  document.title = "ForgotPassword Page";

  return (
    <div className=" flex justify-center items-center sm:p-24 p-10 w-full h-[100vh]  bg-[#dde5f4]">
      <div className=" md:w-96 h-[20rem]  sm:w-80 w-full   p-5 rounded-[50px]  bg-[#f1f8fe] ">
        <div className="flex my-5 justify-center">
          <h1 className="text-md font-bold text-gray-500">
            please Enter your Email Address for check ?
          </h1>
        </div>

        <div className="mx-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-5  drop-shadow-md  bg-white p-3 rounded-[15px]">
              <label className="font-mono  ">Email Address </label>
              <div className="flex ">
                <HiOutlineMail className="m-1 text-2xl" />
                <input
                  placeholder="example@gmail.com"
                  type="email"
                  className="outline-none  m-1 w-full    border-black "
                  {...register("username", { required: true })}
                />
              </div>

              {/* errors will return when field validation fails  */}
              {errors.username && (
                <span className="text-red-500">
                  Please enter Email Address!
                </span>
              )}
            </div>

            <input
              type="submit"
              className="mb-7 rounded-[15px] font-bold cursor-pointer bg-[#9092f5] hover:bg-[#b2b3f4]  w-full p-3 text-white"
              value="Send"
            />
            <div className="flex justify-between">
              <Link to="../signup" className="  text-sm">
                Signup
              </Link>
              <Link to="../login" className="  text-sm">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default forgotPassword;
