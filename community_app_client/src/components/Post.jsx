import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle, FaRegSmile } from "react-icons/fa";
import { baseImg } from "../constants/constant";
import { useStateValue } from "../store/store";
import Axios from "axios";
import { baseUrl } from "../constants/constant";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function Post({ post_id, user_id, caption, Img, Likes, Date, Name, Profile }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [initialState, dispatch] = useStateValue();
  const [count, setCount] = useState(Likes);
  const [like, setLike] = useState(initialState.previewModal.like_status);
  const [comment, setComment] = useState("");

  const onComment = () => {
    if (comment != "") {
      Axios.post(baseUrl + "/api_addComment.php", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          action: "comment",
          post_id: post_id,
          user_id: window.localStorage.getItem("user_id"),
          user_reply: user_id,
          comment: comment,
        },
      }).then((res) => {
        let { status } = res.data;
        if (status) {
          setComment("");
        }
      });
    }
  };

  useEffect(() => {
    Axios.post(baseUrl + "/api_getCountLike.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "getLike",
        post_id: post_id,
      },
    }).then((res) => {
      setCount(res.data);
    });
  }, [initialState.previewModal.like_count]);

  useEffect(() => {
    Axios.post(baseUrl + "/api_CheckLike.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "checkLike",
        like_user: user_id,
        user_id: window.localStorage.getItem("user_id"),
        post_id: post_id,
      },
    }).then((res) => {
      setLike(res.data);
    });
  }, [initialState.previewModal.like_status]);

  const onUnlike = () => {
    Axios.post(baseUrl + "/api_unLike.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "unlike",
        like_user: user_id,
        user_id: window.localStorage.getItem("user_id"),
        post_id: post_id,
      },
    }).then((res) => {
      let { status, count } = res.data;
      setLike(status);
      setCount(count);
    });
  };

  const onLike = () => {
    Axios.post(baseUrl + "/api_Like.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "like",
        like_user: user_id,
        user_id: window.localStorage.getItem("user_id"),
        post_id: post_id,
      },
    }).then((res) => {
      let { status, count } = res.data;
      setLike(status);
      setCount(count);
    });
  };

  return (
    <div className="w-[500px] bg-white rounded-md shadow-md my-10 outline outline-2 outline-gray-200  ">
      <div className="flex justify-between">
        <Link
          to="/profile"
          onClick={() => {
            dispatch({
              type: "setProfile",
              payload: user_id,
            });
          }}
        >
          {" "}
          <div className="flex items-center space-x-2 p-2">
            {Profile == "" ? (
              <FaUserCircle className="text-4xl cursor-pointer" />
            ) : (
              <img
                src={baseImg + user_id + "/profile/" + Profile}
                className="w-12 h-12 object-cover rounded-[50px] cursor-pointer"
              />
            )}

            <p className="font-bold">{Name}</p>
          </div>
        </Link>

        <div className="flex justify-center items-center p-2">
          <BsThreeDots
            className="text-2xl text-gray-500 hover:text-black cursor-pointer"
            onClick={() => {
              dispatch({
                type: "setDataModalEdit",
                payload: {
                  post_id: post_id,
                  user_id: user_id,
                  caption: caption,
                  Img: Img,
                },
              });

              dispatch({
                type: "setShowModalEdit",
                payload: true,
              });
            }}
          />
        </div>
      </div>
      <div>
        <Carousel image={Img} U_id={user_id} P_id={post_id} />
      </div>
      <div>
        <motion.div
          initial={{
            marginTop: 5,
            padding: 5,
            paddingLeft: 5,
            opacity: 0,
            scale: 0.5,
            width: 100,
            cursor: "pointer",
            display: "flex",
          }}
          className="space-x-2 "
          animate={{ opacity: 1, scale: 1 }}
        >
          {like ? (
            <AiFillHeart
              onClick={() => {
                onUnlike();
              }}
              className=" text-red-500 text-4xl  scale-100 hover:scale-150"
            />
          ) : (
            <AiOutlineHeart
              onClick={() => {
                onLike();
              }}
              className=" text-black text-4xl  scale-100 hover:scale-150"
            />
          )}

          <AiOutlineMessage
            onClick={() => {
              dispatch({
                type: "setUserReply",
                payload: {
                  user_reply: user_id,
                  user_reply_status: 0,
                },
              });
              dispatch({
                type: "setPreviewModal",
                previewModal: {
                  like_count: count,
                  like_status: like,
                  status: true,
                  post_id: post_id,
                  user_id: user_id,
                  caption: caption,
                  Img: Img,
                  Likes: Likes,
                  Date: Date,
                  Name: Name,
                  Profile: Profile,
                },
              });

              dispatch({
                type: "setDataModalEdit",
                payload: {
                  post_id: post_id,
                  user_id: user_id,
                  caption: caption,
                  Img: Img,
                },
              });
            }}
            className="text-black hover:text-[#435359] text-4xl  scale-100 hover:scale-150"
          />
        </motion.div>
      </div>
      <div>
        <div className="p-2">
          <div>
            <p className="font-bold text-xs">{count} LIKES</p>
          </div>
          <div>
            <h1 className="text-md">{caption}</h1>
            <p className="text-xs text-gray-500">{Date}</p>
          </div>
        </div>
      </div>
      <div className="bg-[#fcfcfc]">
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
        )}
        <div className=" px-2 py-4">
          <div className="flex ">
            <div>
              {" "}
              <FaRegSmile
                onClick={() => {
                  setShowEmoji(!showEmoji);
                }}
                className="text-2xl cursor-pointer"
              />
            </div>

            <div className=" ml-3 w-full">
              <input
                onFocus={() => setShowEmoji(false)}
                onKeyDown={(e) => {
                  e.key == "Enter" ? onComment() : null;
                }}
                onChange={(event) => setComment(event.target.value)}
                value={comment}
                type="text"
                placeholder="Add comment ..."
                className="outline-none text-sm bg-transparent"
              />
            </div>
            <div>
              <button
                onClick={onComment}
                className="font-bold text-[#B1B2FF] hover:text-[#8f91fa]"
              >
                POST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
