import React, { useEffect, useState } from "react";
import { useStateValue } from "../store/store";
import Axios from "axios";
import { baseImg, baseUrl } from "../constants/constant";
import { FaUserCircle, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MyPost from "./MyPost";
import ModalMenuProfile from "./ModalMenuProfile";
import PreviewModal from "./PreviewModal";
import ModalEdit from "./ModalEdit";
import PreviewModalEdit from "../components/PreviewModalEdit";
import ModalEditProfile from "./ModalEditProfile";

function Profile() {
  const [initialState, dispatch] = useStateValue();
  const [profile, setProfile] = useState();
  const [posts, setPosts] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const [amount, setAmount] = useState();
  const [amountFollowing, setAmountFollowing] = useState();
  const navigate = useNavigate();

  document.title = "Profile Page";

  useEffect(() => {
    if (initialState.profile.user_id == "") {
      navigate("/");
    }

    Axios.post(baseUrl + "/api_getProfile.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "getProfile",
        user_id: initialState.profile.user_id,
        follower_id: window.localStorage.getItem("user_id"),
      },
    }).then((res) => {
      setIsFollowing(res.data.isFollow);
      setProfile(res.data.profile[0]);
      setPosts(res.data.posts);
      setAmount(res.data.profile[0].user_follow);
      setAmountFollowing(res.data.profile[0].user_following);
    });
  }, [initialState.profile.user_id]);

  const unFollow = () => {
    Axios.post(baseUrl + "/api_UnFollow.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "unFollow",
        user_id: window.localStorage.getItem("user_id"),
        follower_id: initialState.profile.user_id,
      },
    }).then((res) => {
      let { status } = res.data;
      if (status) {
        setIsFollowing(false);

        Axios.post(baseUrl + "/api_getProfile.php", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            action: "getProfile",
            user_id: initialState.profile.user_id,
            follower_id: window.localStorage.getItem("user_id"),
          },
        }).then((res) => {
          setIsFollowing(res.data.isFollow);
          setProfile(res.data.profile[0]);
          setPosts(res.data.posts);
          setAmount(res.data.profile[0].user_follow);
          setAmountFollowing(res.data.profile[0].user_following);
        });
      }
    });
  };

  const onFollow = () => {
    Axios.post(baseUrl + "/api_follow.php", {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        action: "follow",
        user_id: window.localStorage.getItem("user_id"),
        follower_id: initialState.profile.user_id,
      },
    }).then((res) => {
      let { status } = res.data;
      if (status) {
        setIsFollowing(true);

        Axios.post(baseUrl + "/api_getProfile.php", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            action: "getProfile",
            user_id: initialState.profile.user_id,
            follower_id: window.localStorage.getItem("user_id"),
          },
        }).then((res) => {
          setIsFollowing(res.data.isFollow);
          setProfile(res.data.profile[0]);
          setPosts(res.data.posts);
          setAmount(res.data.profile[0].user_follow);
          setAmountFollowing(res.data.profile[0].user_following);
        });
      }
    });
  };

  return (
    <div>
      <ModalEditProfile />
      <ModalMenuProfile />
      <PreviewModal />
      <PreviewModalEdit />
      <ModalEdit />
      <div className="flex justify-center flex-col  items-center">
        <div className="flex mt-5">
          <div>
            {profile?.user_img == "" ? (
              <FaUserCircle
                onClick={() => {
                  if (
                    initialState.profile.user_id ==
                    window.localStorage.getItem("user_id")
                  ) {
                    dispatch({
                      type: "setMenuProfileStatus",
                      payload: true,
                    });
                  }
                }}
                className="text-9xl cursor-pointer"
              />
            ) : (
              <img
                onClick={() => {
                  if (
                    initialState.profile.user_id ==
                    window.localStorage.getItem("user_id")
                  ) {
                    dispatch({
                      type: "setMenuProfileStatus",
                      payload: true,
                    });
                  }
                }}
                src={
                  baseImg + profile?.user_id + "/profile/" + profile?.user_img
                }
                className=" rounded-full w-[10rem] h-[10rem] object-cover cursor-pointer"
              />
            )}
          </div>
          <div className="ml-20">
            <div className="flex  space-x-4 items-center">
              <div>
                <h5 className="text-xl">
                  {profile?.user_fname + " " + profile?.user_lname}
                </h5>
              </div>
              <div>
                {initialState.profile.user_id ==
                window.localStorage.getItem("user_id") ? (
                  <button
                    onClick={() => {
                      dispatch({
                        type: "setProfileData",
                        payload: {
                          Profile_bio: profile.user_description,
                          Profile_fname: profile.user_fname,
                          Profile_lname: profile.user_lname,
                        },
                      });
                      dispatch({
                        type: "setProfileEditStatus",
                        payload: true,
                      });
                    }}
                    className="p-2 bg-gray-50 border-2 shadow-sm  hover:bg-white outline-none text-black rounded"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div>
                    {isFollowing ? (
                      <button
                        onClick={unFollow}
                        className="p-2 border-gray-100   w-20 flex justify-center items-center bg-gray-50  shadow-sm border-[1px]  hover:bg-white outline-none text-black rounded"
                      >
                        <FaUserCheck className="text-lg" />
                      </button>
                    ) : (
                      <button
                        onClick={onFollow}
                        className="p-2 bg-blue-500  shadow-sm  hover:bg-blue-600 outline-none text-white rounded"
                      >
                        Follow
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between  space-x-5 mt-5">
              <div>
                <p>{posts?.length} posts</p>
              </div>
              <div>
                <p>{amount} followers</p>
              </div>
              <div>
                <p>{amountFollowing} following</p>
              </div>
            </div>
            <div className="mt-5 w-96   h-28 overflow-y-scroll scrollbar-hide  ">
              <p className=" break-all  ">{profile?.user_description}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between  flex-wrap  w-[60rem] ">
          {posts?.map((post) => {
            return <MyPost key={post.post_id} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
