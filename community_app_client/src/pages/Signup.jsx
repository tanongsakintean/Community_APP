import React from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineLock } from "react-icons/ai";
import { CgRename } from "react-icons/cg";
import { Link } from "react-router-dom";
import Axios from "axios";
import { baseUrl } from "../constants/constant";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Signup() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.NewPassword != data.ReplyPassword) {
      Swal.fire({
        icon: "error",
        text: "Passwords do not match",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Axios.post(baseUrl + "/api_signup.php", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          action: "signup",
          ...data,
        },
      }).then((res) => {
        let { status, meg } = res.data;
        if (status) {
          Swal.fire({
            icon: "success",
            text: meg,
            timer: 1500,
            showConfirmButton: false,
          }).then(() => navigate("/login"));
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
  document.title = "Signup Page";

  return (
    <div className=" flex justify-center sm:p-24 p-10 w-full md:h-[100vh] h-[105vh]  bg-[#dde5f4]">
      <div className=" sm:w-[40rem]  w-full  p-5 rounded-[50px]  bg-[#f1f8fe] ">
        <div className="flex justify-center m-5">
          <h1 className="md:text-[3rem] text-[2rem] font-mono text-[#9092f5] font-bold">
            Sign Up
          </h1>
        </div>

        <div className="mx-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between flex-wrap">
              <div className="flex flex-col mb-5 md:w-64 w-full drop-shadow-md  bg-white p-3 rounded-[15px]">
                <label className="font-mono">First Name </label>
                <div className="flex ">
                  <CgRename className="m-1 text-2xl" />
                  <input
                    placeholder="Example"
                    type="text"
                    className="outline-none  m-1 w-full    border-black "
                    {...register("fname", { required: true })}
                  />
                </div>

                {/* errors will return when field validation fails  */}
                {errors.fname && (
                  <span className="text-red-500">Please enter First Name!</span>
                )}
              </div>

              <div className="flex flex-col mb-5 md:w-64 w-full  drop-shadow-md  bg-white p-3 rounded-[15px]">
                <label className="font-mono  ">Last Name </label>
                <div className="flex ">
                  <CgRename className="m-1 text-2xl" />
                  <input
                    placeholder="Example"
                    type="text"
                    className="outline-none  m-1 w-full    border-black "
                    {...register("lname", { required: true })}
                  />
                </div>

                {/* errors will return when field validation fails  */}
                {errors.lname && (
                  <span className="text-red-500">Please enter Last Name!</span>
                )}
              </div>
            </div>

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
                <span className="text-red-500">Please enter Email Address!</span>
              )}
            </div>

            <div className="flex flex-col mb-5  drop-shadow-md  bg-white p-3 rounded-[15px]">
              <label className="font-mono  ">NewPassword</label>
              <div className="flex">
                <AiOutlineLock className="m-1 text-2xl" />
                <input
                  placeholder="........"
                  type="password"
                  className="outline-none  m-1 w-full    border-black "
                  {...register("NewPassword", { required: true })}
                />
              </div>

              {/* errors will return when field validation fails  */}
              {errors.NewPassword && (
                <span className="text-red-500">Please enter NewPassword!</span>
              )}
            </div>

            <div className="flex flex-col mb-5  drop-shadow-md  bg-white p-3 rounded-[15px]">
              <label className="font-mono  ">ReplyPassword</label>
              <div className="flex">
                <AiOutlineLock className="m-1 text-2xl" />
                <input
                  placeholder="........"
                  type="password"
                  className="outline-none  m-1 w-full    border-black "
                  {...register("ReplyPassword", { required: true })}
                />
              </div>

              {/* errors will return when field validation fails  */}
              {errors.ReplyPassword && (
                <span className="text-red-500">Please enter ReplyPassword!</span>
              )}
            </div>

            <input
              type="submit"
              className="mb-7 rounded-[15px] font-bold cursor-pointer bg-[#9092f5] hover:bg-[#b2b3f4]  w-full p-3 text-white"
              value="Signup"
            />
            <div>
              Already a Member?{" "}
              <span>
                {" "}
                <Link
                  to="../login"
                  className=" cursor-pointer text-[#9092f5]  text-md font-bold"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
