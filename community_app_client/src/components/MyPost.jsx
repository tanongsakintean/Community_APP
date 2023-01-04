import React, { useState, useEffect } from "react";
import { baseImg, baseUrl } from "../constants/constant";
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import Axios from "axios";
import { useStateValue } from "../store/store";
function MyPost({ post }) {
  ///bug enter first time like this like it not show liked
  const [initialState, dispatch] = useStateValue();
  const {
    user_id,
    post_id,
    post_img,
    post_likes,
    post_description,
    post_date,
  } = post;
  const [MouseEnter, setMouseEnter] = useState(false);
  const [comment, setComment] = useState();
  const [count, setCount] = useState(0);
  const [like, setLike] = useState(initialState.previewModal.like_status);

  const getCountLike = () => {
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
  };

  const checkLike = () => {
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
  };

  const getPost = async (post_id) => {
    getCountLike();
    checkLike();
    Axios.post(baseUrl + "/api_getPostProfile.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "getPostDetail",
        post_id: post_id,
      },
    }).then((res) => {
      // dispatch({
      //   type: "setUserReply",
      //   payload: {
      //     user_reply: user_id,
      //     user_reply_status: 0,
      //   },
      // });

      dispatch({
        type: "setPreviewModal",
        previewModal: {
          like_count: 0,
          like_status: like,
          status: true,
          post_id: post_id,
          user_id: user_id,
          caption: post_description,
          Img: post_img,
          Likes: post_likes,
          Date: post_date,
          Name: res.data.user_fname + " " + res.data.user_lname,
          Profile: res.data.user_img,
        },
      });

      dispatch({
        type: "setDataModalEdit",
        payload: {
          post_id: post_id,
          user_id: user_id,
          caption: post_description,
          Img: post_img,
        },
      });
    });
  };

  useEffect(() => {
    Axios.post(baseUrl + "/api_getProfilePost.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "getProfilePost",
        post_id: post_id,
      },
    }).then((res) => {
      setComment(res.data);
    });
  }, [post_id]);

  return (
    <div
      className="w-[15rem] h-[15rem] mx-5 my-5  shadow-md "
      onMouseEnter={() => {
        setMouseEnter(true);
      }}
      onMouseLeave={() => {
        setMouseEnter(false);
      }}
    >
      {MouseEnter && (
        <div>
          <div
            onClick={() => {
              getPost(post_id);
            }}
            className="cursor-pointer absolute flex justify-center w-[15rem] z-40  space-x-10 h-[15rem] items-center"
          >
            <div className="flex justify-center items-center ">
              <AiFillHeart className=" text-white text-4xl  " />
              <p className="text-white ml-2">{post_likes}</p>
            </div>
            <div className="flex justify-center items-center ">
              <AiFillMessage className="text-white  text-4xl  " />
              <p className="text-white ml-2">{comment.length}</p>
            </div>
          </div>
          <div className="bg-black absolute w-[15rem]  h-[15rem] opacity-30 z-30"></div>
        </div>
      )}

      <img
        src={
          baseImg + user_id + "/posts/" + post_id + "/" + post_img.split(",")[0]
        }
        className="object-cover h-full w-full rounded-sm cursor-pointer"
      />
    </div>
  );
}

export default MyPost;
