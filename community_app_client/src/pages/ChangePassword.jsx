import React from "react";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import { useStateValue } from "../store/store";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/constant";

function ChangePassword() {
  const [initialState, dispatch] = useStateValue();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.new_password != data.reply_password) {
      Swal.fire({
        icon: "error",
        text: "Password not match",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Axios.post(baseUrl + "/api_ChangePassword.php", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          action: "changepassword",
          password: data.new_password,
          email: initialState.username,
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
            navigate("../");
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
    }
  };
  document.title = "Change Password Page";

  return (
    <div className=" flex justify-center items-center sm:p-24 p-10 w-full h-[100vh]  bg-[#dde5f4]">
      <div className=" md:w-96 h-[26rem]  sm:w-80 w-full   p-5 rounded-[50px]  bg-[#f1f8fe] ">
        <div className="flex my-5 justify-center">
          <h1 className="text-xl font-bold text-gray-500">please Enter new Password ?</h1>
        </div>

        <div className="mx-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-5  drop-shadow-md  bg-white p-3 rounded-[15px]">
              <label className="font-mono  ">New Password </label>
              <div className="flex ">
                <HiOutlineMail className="m-1 text-2xl" />
                <input
                  placeholder="New Password"
                  type="password"
                  className="outline-none  m-1 w-full    border-black "
                  {...register("new_password", { required: true })}
                />
              </div>

              {/* errors will return when field validation fails  */}
              {errors.new_password && (
                <span className="text-red-500">
                  Please enter your new password!
                </span>
              )}
            </div>

            <div className="flex flex-col mb-5  drop-shadow-md  bg-white p-3 rounded-[15px]">
              <label className="font-mono  ">Reply Password </label>
              <div className="flex ">
                <HiOutlineMail className="m-1 text-2xl" />
                <input
                  placeholder="Reply Password"
                  type="password"
                  className="outline-none  m-1 w-full    border-black "
                  {...register("reply_password", { required: true })}
                />
              </div>

              {/* errors will return when field validation fails  */}
              {errors.reply_password && (
                <span className="text-red-500">
                  Please enter your reply password!
                </span>
              )}
            </div>

            <input
              type="submit"
              className="mb-7 rounded-[15px] font-bold cursor-pointer bg-[#9092f5] hover:bg-[#b2b3f4]  w-full p-3 text-white"
              value="Change Password"
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

export default ChangePassword;
