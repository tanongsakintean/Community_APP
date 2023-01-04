import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useStateValue } from "../store/store";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import HeadCaption from "./HeadCaption";
import { baseUrl } from "../constants/constant";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import CarouselEditModal from "./CarouselEditModal";

function ModalEdit() {
  const [caption, setCaption] = useState("");
  const [initialState, dispatch] = useStateValue();
  const [files, setFiles] = useState("");
  useEffect(() => {
    if (initialState.modalEditStatus) {
      setCaption(initialState.modalEditCaption);
      setFiles(initialState.modalEditImg);
    }
  }, [initialState.modalEditStatus]);



  const onPost = () => {
    Axios.post(baseUrl + "/api_editPost.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "editPost",
        post_id: initialState.modalEditPostId,
        caption: caption,
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
  };

  useEffect(() => {
    const closeModal = (e) => {
      if (e.path[0].id == "close") {
        dispatch({
          type: "setDataModalEdit",
          payload: {
            caption: "",
            Img: "",
            post_id: "",
          },
        });
        dispatch({
          type: "setModalEdit",
          payload: false,
        });
      } else {
        if (e.keyCode == 27) {
          dispatch({
            type: "setDataModalEdit",
            payload: {
              caption: "",
              Img: "",
              post_id: "",
            },
          });
          dispatch({
            type: "setModalEdit",
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
      {initialState.modalEditStatus ? (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            id="close"
          >
            <div className="w-[971px]  flex relative my-6 mx-auto">
              {/*content*/}
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2  border-b border-solid border-slate-200 rounded-t">
                  <div className="flex justify-center items-center w-full">
                    <h3 className="text-lg font-mono font-thin ">Edit post</h3>
                  </div>
                  <div className="flex justify-center items-center w-10 h-full">
                    <button
                      onClick={onPost}
                      className="text-[#B1B2FF]  font-semibold hover:text-[#7d7ff7]"
                    >
                      Done
                    </button>
                  </div>
                </div>
                {/*body*/}

                <div className="flex h-[571px]  justify-around">
                  <CarouselEditModal
                    image={files}
                    U_id={window.localStorage.getItem("user_id")}
                    P_id={initialState.modalEditPostId}
                  />
                  <motion.div
                    initial={{
                      opacity: 0,
                      width: 0,
                    }}
                    animate={{
                      opacity: 1,
                      width: 500,
                    }}
                  >
                    <HeadCaption
                      Img={window.localStorage.getItem("user_img")}
                      Name={window.localStorage.getItem("user_FullName")}
                    />

                    <div className=" pl-4">
                      <textarea
                        style={{ resize: "none" }}
                        className="w-full outline-none overflow-scroll h-[190px]"
                        placeholder="Write a caption..."
                        onChange={(e) => setCaption(e.target.value)}
                        value={caption}
                      ></textarea>
                    </div>

                    <div>
                      <Picker
                        previewPosition={"none"}
                        data={data}
                        onEmojiSelect={(e) => {
                          setCaption(caption + e.native);
                        }}
                      />
                    </div>
                  </motion.div>

                  {/*footer*/}
                </div>
              </div>
            </div>
          </motion.div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default ModalEdit;
