import React, { useEffect, useState } from "react";
import { useStateValue } from "../store/store";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Axios from "axios";
import { baseUrl } from "../constants/constant";
function previewModalEdit() {
  const [initialState, dispatch] = useStateValue();

  useEffect(() => {
    const closeModal = (e) => {
      if (e.path[0].id == "close") {
        dispatch({
          type: "setShowModalEdit",
          payload: false,
        });
      } else {
        if (e.keyCode == 27) {
          dispatch({
            type: "setShowModalEdit",
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

  const onDel = () => {
    Swal.fire({
      title: "Delete post?",
      text: "Are you sure you want to delete this post?",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(baseUrl + "/api_delPost.php", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            action: "delPost",
            post_id: initialState.modalEditPostId,
          },
        }).then((res) => {
          let { status, meg } = res.data;
          if (status) {
            Swal.fire({
              icon: "success",
              text: meg,
              timer: 1500,
              showConfirmButton: false,
            }).then(() => {
              window.location.reload();
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
    });
  };

  return (
    <div>
      {initialState.showModalEdit ? (
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
                {initialState.modalEditUserId ==
                  window.localStorage.getItem("user_id") && (
                  <button
                    onClick={onDel}
                    className="text-red-500 cursor-pointer  font-bold text-sm py-3 border-b-[1px]  "
                  >
                    {" "}
                    delete
                  </button>
                )}
                {initialState.modalEditUserId ==
                  window.localStorage.getItem("user_id") && (
                  <button
                    onClick={() => {
                      dispatch({
                        type: "serPreviewModalStatus",
                        payload: false,
                      });
                      dispatch({ type: "setShowModalEdit", payload: false });
                      dispatch({
                        type: "setModalEdit",
                        payload: true,
                      });
                    }}
                    className="text-gray-600 cursor-pointer  font-bold text-sm py-3 border-b-[1px]  "
                  >
                    {" "}
                    edit
                  </button>
                )}
                <button
                  onClick={() => {
                    dispatch({
                      type: "setShowModalEdit",
                      showModal: false,
                    });
                  }}
                  className=" cursor-pointer  font-bold text-sm py-3 border-b-[1px]  "
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

export default previewModalEdit;
