import React, { useEffect, useState } from "react";
import { useStateValue } from "../store/store";
import { calcLength, motion } from "framer-motion";
import Swal from "sweetalert2";
import Axios from "axios";
import { baseUrl } from "../constants/constant";
function ModalMenuProfile() {
  const [initialState, dispatch] = useStateValue();
  const [profile, setProfile] = useState();

  const DelImg = () => {
    Axios.post(baseUrl + "/api_DelImg.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "delProfile",
        user_id: initialState.profile.user_id,
      },
    }).then((res) => {
      let { status } = res.data;
      if (status) {
        window.localStorage.setItem("user_img", "");
        dispatch({
          type: "setMenuProfileStatus",
          payload: false,
        });
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

  const UploadImg = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("img", file);
    formData.append("user_id", window.localStorage.getItem("user_id"));
    formData.append("user_img", window.localStorage.getItem("user_img"));
    formData.append("action", "uploadImg");
    Axios.post(baseUrl + "/api_UploadImg.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      let { status, img } = res.data;

      if (status) {
        window.localStorage.setItem("user_img", img);
        dispatch({
          type: "setMenuProfileStatus",
          payload: false,
        });
        Swal.fire({
          icon: "success",
          text: "",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          text: img,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  useEffect(() => {
    const closeModal = (e) => {
      if (e.path[0].id == "close") {
        dispatch({
          type: "setMenuProfileStatus",
          payload: false,
        });
      } else {
        if (e.keyCode == 27) {
          dispatch({
            type: "setMenuProfileStatus",
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
      {initialState.MenuProfileStatus ? (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            id="close"
          >
            <div className=" w-[400px]  flex relative my-6 mx-auto">
              {/*content*/}
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <button
                  onClick={DelImg}
                  className="text-red-500 cursor-pointer  font-bold text-sm py-3 border-b-[1px]  "
                >
                  Remove Current Photo{" "}
                </button>
                <label className=" border-b-[1px]  flex flex-col items-center  bg-white  py-3    cursor-pointer  ">
                  <span className=" text-[#6f71f4] text-base leading-normal">
                    Upload Photo
                  </span>
                  <input
                    multiple={false}
                    onChange={(e) => {
                      UploadImg(e);
                    }}
                    type="file"
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => {
                    dispatch({
                      type: "setMenuProfileStatus",
                      payload: false,
                    });
                  }}
                  className=" cursor-pointer  font-bold text-sm py-3   "
                >
                  {" "}
                  cancel
                </button>
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

export default ModalMenuProfile;
