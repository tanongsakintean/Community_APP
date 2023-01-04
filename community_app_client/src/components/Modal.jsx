import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useStateValue } from "../store/store";
import { motion } from "framer-motion";
import { FaPhotoVideo } from "react-icons/fa";
import { BsArrowLeft, BsCloudFogFill } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import Preview from "./Preview";
import Swal from "sweetalert2";
import HeadCaption from "./HeadCaption";
import { baseUrl } from "../constants/constant";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function Modal() {
  const [showComment, setShowComment] = useState(false);
  const [caption, setCaption] = useState("");
  const [initialState, dispatch] = useStateValue();
  const [files, setFiles] = useState([]);

  const onPost = async () => {
    let formData = new FormData();
    files.forEach((file) => {
      formData.append("user_img[]", file);
    });
    formData.append("action", "add");
    formData.append("caption", caption);
    formData.append("user_id", window.localStorage.getItem("user_id"));
    await Axios.post(baseUrl + "/api_addPost.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

  const { open, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((f) => {
          return f;
        })
      );
    },
    noClick: true,
  });

  useEffect(() => {
    const closeModal = (e) => {
      if (e.path[0].id == "close") {
        if (files.length != 0) {
          Swal.fire({
            title: "Discard post?",
            text: "If you leave, your edits won't be saved.",
            showCancelButton: true,
            confirmButtonColor: "red",
            confirmButtonText: "Discard",
            cancelButtonText: "cancel",
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              setFiles([]);
              setCaption("");
              setShowComment(false);
              dispatch({
                type: "setShowModal",
                showModal: false,
              });
            }
          });
        } else {
          dispatch({
            type: "setShowModal",
            showModal: false,
          });
        }
      } else {
        if (e.keyCode == 27) {
          if (files.length != 0) {
            Swal.fire({
              title: "Discard post?",
              text: "If you leave, your edits won't be saved.",
              showCancelButton: true,
              confirmButtonColor: "red",
              confirmButtonText: "Discard",
              cancelButtonText: "cancel",
              reverseButtons: true,
            }).then((result) => {
              if (result.isConfirmed) {
                setFiles([]);
                setCaption("");
                setShowComment(false);
                dispatch({
                  type: "setShowModal",
                  showModal: false,
                });
              }
            });
          } else {
            dispatch({
              type: "setShowModal",
              showModal: false,
            });
          }
        }
      }
    };
    window.addEventListener("click", closeModal);
    window.addEventListener("keydown", closeModal);
    return () => {
      window.removeEventListener("click", closeModal);
      window.removeEventListener("keydown", closeModal);
    };
  }, [files]);

  return (
    <div>
      {initialState.showModal ? (
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
                  <div className="flex justify-center items-center w-10 h-full">
                    {files.length != 0 && (
                      <BsArrowLeft
                        onClick={() => {
                          Swal.fire({
                            title: "Discard post?",
                            text: "If you leave, your edits won't be saved.",
                            showCancelButton: true,
                            confirmButtonColor: "red",
                            confirmButtonText: "Discard",
                            cancelButtonText: "cancel",
                            reverseButtons: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              setFiles([]);
                              setCaption("");
                              setShowComment(false);
                            }
                          });
                        }}
                        className="text-4xl cursor-pointer pl-2 "
                      />
                    )}
                  </div>

                  <div className="flex justify-center items-center w-full">
                    <h3 className="text-lg font-mono font-thin ">
                      Create new post
                    </h3>
                  </div>
                  <div className="flex justify-center items-center w-20 h-full">
                    {files.length != 0 ? (
                      showComment ? (
                        <button
                          onClick={() => onPost()}
                          type="button"
                          className=" font-mono  text-[#B1B2FF] hover:text-[#7b7df8]"
                        >
                          Share
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowComment(true)}
                          type="button"
                          className=" font-mono  text-[#B1B2FF] hover:text-[#7b7df8]"
                        >
                          Next
                        </button>
                      )
                    ) : null}
                  </div>
                </div>
                {/*body*/}

                <div className="flex  justify-around">
                  <div className="relative flex flex-col w-full  justify-center items-center   h-[571px]">
                    <div
                      {...getRootProps({
                        className: " dropzone w-full h-full",
                      })}
                    >
                      <div className="flex flex-col justify-center items-center justify-items-center h-full mt-14 ">
                        <div className="flex justify-center items-center">
                          <FaPhotoVideo className="  w-20 h-20 text-[#ccced3] hover:text-black " />
                        </div>
                        <p className=" font-mono mt-8">
                          Drag photos and videos here{" "}
                        </p>
                        <input {...getInputProps()} />
                        <button
                          type="button"
                          className="p-2 font-mono text-white bg-blue-500 outline-none cursor-pointer rounded-[15px] mt-2"
                          onClick={open}
                        >
                          select from computer
                        </button>
                      </div>
                    </div>

                    {files.length != 0 && (
                      <Preview className="absolute " Img={files} />
                    )}
                  </div>

                  {showComment && (
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
                  )}

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

export default Modal;
