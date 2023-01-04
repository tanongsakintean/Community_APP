import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { baseImg } from "../constants/constant";

function HeadCaption({ Img, Name }) {
  return (
    <div className="flex items-center space-x-2 p-2">
      {Img == "" ? (
        <FaUserCircle className="text-4xl cursor-pointer " />
      ) : (
        <img
          src={
            baseImg + window.localStorage.getItem("user_id") + "/profile/" + Img
          }
          className="w-10 h-10 object-cover rounded-[50px] cursor-pointer"
        />
      )}

      <p className="font-bold">{Name}</p>
    </div>
  );
}

export default HeadCaption;
