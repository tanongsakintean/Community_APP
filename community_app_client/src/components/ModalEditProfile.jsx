import React, { useEffect, useState } from "react";
import { useStateValue } from "../store/store";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Axios from "axios";
import { baseUrl } from "../constants/constant";
import { useForm } from "react-hook-form";

function ModalEditProfile() {
  const [initialState, dispatch] = useStateValue();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    Axios.post(baseUrl + "/api_EditProfile.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "editProfile",
        user_id: window.localStorage.getItem("user_id"),
        fname: data.First_name,
        lname: data.Last_name,
        bio: data.Bio,
      },
    }).then((res) => {
      let { status } = res.data;
      if (status) {
        Swal.fire({
          icon: "success",
          text: "",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  useEffect(() => {
    const closeModal = (e) => {
      if (e.path[0].id == "close") {
        dispatch({
          type: "setProfileEditStatus",
          payload: false,
        });
      } else {
        if (e.keyCode == 27) {
          dispatch({
            type: "setProfileEditStatus",
            payload: false,
          });
        }
      }
    };
    window.addEventListener("click", closeModal);
    window.addEventListener("keydown", closeModal);
    return () => {
      window.removeEventListener("click", closeModal);
      window.removeEventListener("keydown", closeModal);
    };
  }, []);

  return (
    <div>
      {initialState.ProfileEditStatus ? (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            id="close"
          >
            <div className=" w-[400px]  flex relative my-6 mx-auto">
              {/*content*/}
              <div className=" border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="  flex justify-center  mt-10">
                  <h1 className=" text-xl  font-mono">Edit My Profile</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                  <div className=" my-5  ">
                    <div className="justify-center space-x-5 flex">
                      <div className="flex justify-center items-center">
                        <p>Fast Name</p>
                      </div>
                      <input
                        placeholder="Enter your Fist name"
                        type="text"
                        className="  shadow-md text-md p-2  outline-none  border-[1px] border-gray-200  "
                        {...register("First_name", {
                          required: true,
                          value: initialState.Profile_fname,
                        })}
                      />
                    </div>

                    <div className=" flex justify-center ml-[5.5rem] ">
                      {errors.First_name && (
                        <span className="text-red-500 mt-1">
                          Please enter your first name
                        </span>
                      )}
                    </div>
                  </div>

                  <div className=" my-5  ">
                    <div className="justify-center space-x-5 flex">
                      <div className="flex justify-center items-center">
                        <p>Last Name</p>
                      </div>
                      <input
                        placeholder="Enter your Fist name"
                        type="text"
                        className="  shadow-md text-md p-2  outline-none  border-[1px] border-gray-200  "
                        {...register("Last_name", {
                          required: true,
                          value: initialState.Profile_lname,
                        })}
                      />
                    </div>

                    <div className=" flex justify-center ml-[5.5rem] ">
                      {errors.Last_name && (
                        <span className="text-red-500 mt-1">
                          Please enter your last name
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="my-5">
                    <div className="flex  justify-center space-x-5">
                      <div className="flex justify-center items-center">
                        <p>Bio</p>
                      </div>
                      <textarea
                        {...register("Bio", {
                          required: false,
                          value: initialState.Profile_bio,
                        })}
                        placeholder="Enter your Bio"
                        className=" w-[14rem] shadow-md text-md p-2  outline-none  border-[1px] border-gray-200  "
                      ></textarea>
                    </div>
                    <div className=" flex justify-center ml-[5.5rem] "></div>
                  </div>

                  <div className="flex  justify-around m-3">
                    <button
                      onClick={() => {
                        dispatch({
                          type: "setProfileEditStatus",
                          payload: false,
                        });
                      }}
                      className=" p-2 bg-[#fd6b6b] hover:bg-[red] w-24 text-white rounded-[5px] "
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className=" p-2  w-24 bg-[#9d9ef9] hover:bg-[#696bf8] text-white rounded-[5px] "
                    >
                      Edit
                    </button>
                  </div>
                </form>
                {/*body*/}
              </div>
            </div>
          </motion.div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default ModalEditProfile;
