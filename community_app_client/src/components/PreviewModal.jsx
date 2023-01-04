import React, { useEffect, useState } from "react";
import { useStateValue } from "../store/store";
import { IoClose } from "react-icons/Io5";
import { motion } from "framer-motion";
import CarouselPreview from "./CarouselPreview";
import { baseImg, baseUrl } from "../constants/constant";
import { FaUserCircle, FaRegSmile } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function PreviewModal() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [comment, setComment] = useState("");
  const [initialState, dispatch] = useStateValue();
  const [like, setLike] = useState(initialState.previewModal.like_status);
  const [userComment, setUserComment] = useState([]);
  const [userReply, setUserReply] = useState("");

  const getUserReply = (user_id) => {
    Axios.post(baseUrl + "/api_getReply.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "getReply",
        user_id: user_id,
      },
    }).then((res) => {
      setUserReply(user_id);
      setComment(
        "@" + res.data.user_fname + " " + res.data.user_lname + " " + comment
      );
    });
  };

  useEffect(() => {
    Axios.post(baseUrl + "/api_getComment.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "getComment",
        post_id: initialState.previewModal.post_id,
      },
    }).then((res) => {
      if (res.data == "" || res.data == null) {
        setUserComment([]);
      } else {
        setUserComment([...res.data]);
      }
    });
  }, [initialState.previewModal.post_id]);

  useEffect(() => {
    Axios.post(baseUrl + "/api_CheckLike.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "checkLike",
        like_user: initialState.previewModal.user_id,
        user_id: window.localStorage.getItem("user_id"),
        post_id: initialState.previewModal.post_id,
      },
    }).then((res) => {
      setLike(res.data);
    });
  }, [initialState.previewModal.like_status]);

  const onDel = (com_id) => {
    Swal.fire({
      title: "Delete Comment?",
      text: "Do you want to delete this comment?",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete",
      cancelButtonText: "cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(baseUrl + "/api_delComment.php", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            action: "del",
            com_id: com_id,
          },
        }).then((res) => {
          let { status } = res.data;
          if (status) {
            Axios.post(baseUrl + "/api_getComment.php", {
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                action: "getComment",
                post_id: initialState.previewModal.post_id,
              },
            }).then((res) => {
              if (res.data == "" || res.data == null) {
                setUserComment([]);
              } else {
                setUserComment([...res.data]);
              }
            });
          }
        });
      }
    });
  };

  const onComment = () => {
    if (comment != "" && userReply != "") {
      Axios.post(baseUrl + "/api_addComment.php", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          action: "comment",
          post_id: initialState.previewModal.post_id,
          user_id: window.localStorage.getItem("user_id"),
          user_reply: userReply,
          comment: comment,
        },
      }).then((res) => {
        let { status } = res.data;
        if (status) {
          setComment("");
          setUserReply("");
          Axios.post(baseUrl + "/api_getComment.php", {
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              action: "getComment",
              post_id: initialState.previewModal.post_id,
            },
          }).then((res) => {
            if (res.data == "" || res.data == null) {
              setUserComment([]);
            } else {
              setUserComment([...res.data]);
            }
          });
        }
      });
    } else {
      Axios.post(baseUrl + "/api_addComment.php", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          action: "comment",
          post_id: initialState.previewModal.post_id,
          user_id: window.localStorage.getItem("user_id"),
          user_reply: window.localStorage.getItem("user_id"),
          comment: comment,
        },
      }).then((res) => {
        let { status } = res.data;
        if (status) {
          setComment("");
          setUserReply("");
          Axios.post(baseUrl + "/api_getComment.php", {
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              action: "getComment",
              post_id: initialState.previewModal.post_id,
            },
          }).then((res) => {
            if (res.data == "" || res.data == null) {
              setUserComment([]);
            } else {
              setUserComment([...res.data]);
            }
          });
        }
      });
    }
  };

  const onUnlike = () => {
    Axios.post(baseUrl + "/api_unLike.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "unlike",
        like_user: initialState.previewModal.user_id,
        user_id: window.localStorage.getItem("user_id"),
        post_id: initialState.previewModal.post_id,
      },
    }).then((res) => {
      let { status, count } = res.data;
      setLike(status);
      dispatch({
        type: "update_like_status",
        payload: {
          like_status: status,
          like_count: count,
        },
      });
    });
  };

  const onLike = () => {
    Axios.post(baseUrl + "/api_Like.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "like",
        like_user: initialState.previewModal.user_id,
        user_id: window.localStorage.getItem("user_id"),
        post_id: initialState.previewModal.post_id,
      },
    }).then((res) => {
      let { status, count } = res.data;
      setLike(status);
      dispatch({
        type: "update_like_status",
        payload: {
          like_status: status,
          like_count: count,
        },
      });
    });
  };

  useEffect(() => {
    const closeModal = (e) => {
      if (e.path[0].id == "close") {
        setShowEmoji(false);
        dispatch({
          type: "setPreviewModal",
          previewModal: {
            like_status: like,
            status: false,
            post_id: "",
            user_id: "",
            caption: "",
            Img: "",
            Likes: "",
            Date: "",
            Name: "",
            Profile: "",
          },
        });
        setUserReply("");
        setComment("");
      } else {
        if (e.keyCode == 27) {
          setShowEmoji(false);
          dispatch({
            type: "setPreviewModal",
            previewModal: {
              like_status: like,
              status: false,
              post_id: "",
              user_id: "",
              caption: "",
              Img: "",
              Likes: "",
              Date: "",
              Name: "",
              Profile: "",
            },
          });
          setComment("");
          setUserReply("");
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
      {initialState.previewModal.status ? (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none"
            id="close"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <IoClose
                onClick={() => {
                  dispatch({
                    type: "setPreviewModal",
                    previewModal: {
                      like_status: like,
                      status: false,
                      post_id: "",
                      user_id: "",
                      caption: "",
                      Img: "",
                      Likes: "",
                      Date: "",
                      Name: "",
                      Profile: "",
                    },
                  });
                }}
                className=" cursor-pointer text-white text-3xl absolute top-4 z-20 right-4"
              />
            </motion.div>

            <div className="w-[1200px] h-[920px] flex relative my-6 mx-auto ">
              {/*content*/}
              <div className=" border-0 rounded-lg shadow-lg relative flex  w-full bg-white outline-none focus:outline-none ">
                {/*body*/}
                <div className="w-[700px]  rounded-l-lg  ">
                  <CarouselPreview
                    image={initialState.previewModal.Img}
                    U_id={initialState.previewModal.user_id}
                    P_id={initialState.previewModal.post_id}
                  />
                </div>
                <div className="w-full">
                  <div className=" border-b-2 ">
                    <div className="flex justify-between items-center space-x-2 p-2">
                      <Link
                        to="/profile"
                        onClick={() => {
                          dispatch({
                            type: "setProfile",
                            payload: initialState.previewModal.user_id,
                          });
                        }}
                      >
                        <div className="flex  justify-center items-center">
                          {initialState.previewModal.Profile == "" ? (
                            <FaUserCircle className="text-5xl cursor-pointer" />
                          ) : (
                            <img
                              src={
                                baseImg +
                                initialState.previewModal.user_id +
                                "/profile/" +
                                initialState.previewModal.Profile
                              }
                              className="w-12 h-12 object-cover rounded-[50px] cursor-pointer"
                            />
                          )}
                          <p className="font-bold mx-2  ">
                            {initialState.previewModal.Name}
                          </p>
                        </div>
                      </Link>

                      <div className="flex justify-center items-center p-2">
                        <BsThreeDots
                          className="text-2xl text-gray-500 hover:text-black cursor-pointer"
                          onClick={() => {
                            dispatch({
                              type: "setShowModalEdit",
                              payload: true,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex w-[31.2rem] flex-col h-[50rem]  scrollbar-hide overflow-x-hidden   items-start space-x-2 p-2 scroll-smooth    overflow-y-auto">
                      <div className="flex  pl-4 py-2">
                        <Link
                          to="/profile"
                          onClick={() => {
                            dispatch({
                              type: "setProfile",
                              payload: initialState.previewModal.user_id,
                            });
                          }}
                        >
                          {initialState.previewModal.Profile == "" ? (
                            <FaUserCircle className="text-4xl cursor-pointer " />
                          ) : (
                            <img
                              src={
                                baseImg +
                                initialState.previewModal.user_id +
                                "/profile/" +
                                initialState.previewModal.Profile
                              }
                              className="h-12 w-12 object-cover rounded-[50px] cursor-pointer"
                            />
                          )}
                        </Link>
                        <p className=" break-all  w-[27rem] p-2 text-sm">
                          <b>{initialState.previewModal.Name}</b>{" "}
                          {initialState.previewModal.caption}
                        </p>
                      </div>
                      <p className="text-xs w-full pl-[58px]   text-gray-500">
                        {initialState.previewModal.Date}
                      </p>
                      <div>
                        {userComment.map((com) => {
                          return (
                            <div key={com[0]} className="flex p-2">
                              <div>
                                <Link
                                  to="/profile"
                                  onClick={() => {
                                    dispatch({
                                      type: "setProfile",
                                      payload: com[3],
                                    });
                                  }}
                                >
                                  {com[12] == "" ? (
                                    <FaUserCircle className="text-5xl cursor-pointer " />
                                  ) : (
                                    <img
                                      src={
                                        baseImg + com[3] + "/profile/" + com[12]
                                      }
                                      className="w-[4rem] h-12 object-cover rounded-[50px] cursor-pointer "
                                    />
                                  )}
                                </Link>
                              </div>
                              <div className=" pl-2 flex justify-center flex-col  w-full">
                                <p className="font-mono text-md">
                                  {com[10] + " " + com[11]}
                                </p>
                                <div className="w-full ">
                                  <p className="text-sm break-all">{com[4]}</p>
                                </div>
                                <div className="flex mt-2">
                                  <div className="mx-2 flex justify-center items-center">
                                    <p className="text-xs text-gray-500">
                                      {com[5]}
                                    </p>
                                  </div>
                                  <div className="mx-2 space-x-4 flex justify-center items-center">
                                    <button
                                      onClick={() => {
                                        getUserReply(com[3]);
                                      }}
                                      className="text-xs text-gray-500 hover:text-black"
                                    >
                                      Reply
                                    </button>

                                    {com[3] ==
                                      window.localStorage.getItem(
                                        "user_id"
                                      ) && (
                                      <button
                                        onClick={() => {
                                          onDel(com[0]);
                                        }}
                                        className="text-xs text-gray-500 hover:text-red-500"
                                      >
                                        Delete
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className=" border-t-2 absolute bottom-0 z-10 w-[31.2rem]  ">
                    <div className="flex  w-full">
                      {showEmoji && (
                        <div className=" absolute -mt-[20rem] bg-white z-50">
                          <Picker
                            previewPosition={"none"}
                            data={data}
                            onEmojiSelect={(e) => {
                              setComment(comment + e.native);
                            }}
                          />
                        </div>
                      )}{" "}
                      <div className="p-2">
                        {like ? (
                          <AiFillHeart
                            onClick={() => {
                              onUnlike();
                            }}
                            className=" cursor-pointer text-red-500 text-4xl  scale-100 hover:scale-150"
                          />
                        ) : (
                          <AiOutlineHeart
                            onClick={() => {
                              onLike();
                            }}
                            className=" text-black cursor-pointer text-4xl  scale-100 hover:scale-150"
                          />
                        )}
                      </div>
                      <div className="flex  justify-center items-center">
                        {" "}
                        <FaRegSmile
                          onClick={() => {
                            setShowEmoji(!showEmoji);
                          }}
                          className="text-2xl cursor-pointer"
                        />
                      </div>
                      <div className=" flex mx-2  justify-items-center items-center  w-[22rem]">
                        <input
                          onFocus={() => {
                            setShowEmoji(false);
                          }}
                          onKeyDown={(e) => {
                            e.key == "Enter" && comment != ""
                              ? onComment()
                              : null;
                          }}
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                          placeholder="Add a comment..."
                          type="text"
                          className="outline-none border-none w-full"
                        />
                      </div>
                      <div className="flex  justify-items-start items-center ">
                        <button
                          onClick={onComment}
                          className="font-bold text-[#B1B2FF] hover:text-[#8f91fa]"
                        >
                          POST
                        </button>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className=" opacity-70 fixed inset-0 z-20 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default PreviewModal;
