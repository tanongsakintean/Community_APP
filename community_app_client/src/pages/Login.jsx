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

function Login() {
  const [initialState, dispatch] = useStateValue();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    Axios.post(baseUrl + "/api_login.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "login",
        ...data,
      },
    }).then((res) => {
      let { status, meg, data } = res.data;
      if (status) {
        window.localStorage.setItem("user_login", true);
        window.localStorage.setItem("user_id", data.user_id);
        window.localStorage.setItem("user_img", data.user_img);
        window.localStorage.setItem(
          "user_FullName",
          data.user_fname + " " + data.user_lname
        );
        dispatch({
          status: true,
          type: "login",
        });
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
  };
  document.title = "Login Page";

  return (
    <div className=" flex justify-center sm:p-24 p-10 w-full h-[100vh]  bg-[#dde5f4]">
      <div className=" md:w-96  sm:w-80 w-full   p-5 rounded-[50px]  bg-[#f1f8fe] ">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-60 h-60" />
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
                <span className="text-red-500">Please enter Email Address!</span>
              )}
            </div>

            <div className="flex flex-col mb-5  drop-shadow-md  bg-white p-3 rounded-[15px]">
              <label className="font-mono  ">Password</label>
              <div className="flex">
                <AiOutlineLock className="m-1 text-2xl" />
                <input
                  placeholder="........"
                  type="password"
                  className="outline-none  m-1 w-full    border-black "
                  {...register("password", { required: true })}
                />
              </div>

              {/* errors will return when field validation fails  */}
              {errors.password && (
                <span className="text-red-500">Please enter Password!</span>
              )}
            </div>

            <input
              type="submit"
              className="mb-7 rounded-[15px] font-bold cursor-pointer bg-[#9092f5] hover:bg-[#b2b3f4]  w-full p-3 text-white"
              value="Login"
            />
            <div className="flex justify-between">
              <Link to="../signup" className="  text-sm">
                Signup
              </Link>
              <Link to="../forgotPassword" className="  text-sm">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
