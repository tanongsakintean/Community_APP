export const initialState = {
  username: "",
  Profile_fname: "",
  Profile_lname: "",
  Profile_bio: "",
  ProfileEditStatus: false,
  MenuProfileStatus: false,
  profile: {
    user_id: "",
  },
  status: false,
  showModal: false,
  showModalEdit: false,
  modalEditStatus: false,
  modalEditPostId: "",
  modalEditUserId: "",
  modalEditImg: "",
  modalEditCaption: "",
  previewModal: {
    like_count: "",
    like_status: false,
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
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setUserName":
      return {
        ...state,
        username: action.payload,
      };
      break;
    case "setProfileData":
      return {
        ...state,
        Profile_fname: action.payload.Profile_fname,
        Profile_lname: action.payload.Profile_lname,
        Profile_bio: action.payload.Profile_bio,
      };
      break;
    case "setProfileEditStatus":
      return {
        ...state,
        ProfileEditStatus: action.payload,
      };
      break;
    case "setMenuProfileStatus":
      return {
        ...state,
        MenuProfileStatus: action.payload,
      };
      break;
    case "setProfile":
      return {
        ...state,
        profile: {
          user_id: action.payload,
        },
      };
      break;
    case "serPreviewModalStatus":
      return {
        ...state,
        previewModal: {
          ...state.previewModal,
          status: action.payload,
        },
      };
      break;
    case "setModalEdit":
      return {
        ...state,
        modalEditStatus: action.payload,
      };
      break;
    case "setDataModalEdit":
      return {
        ...state,
        modalEditPostId: action.payload.post_id,
        modalEditImg: action.payload.Img,
        modalEditCaption: action.payload.caption,
        modalEditUserId: action.payload.user_id,
      };
      break;
    case "setPreModalEdit":
      return {
        ...state,
        preModalEdit: {
          ...state.preModalEdit,
          status: action.payload,
        },
      };
      break;
    case "setShowModalEdit":
      return {
        ...state,
        showModalEdit: action.payload,
      };
      break;
    case "update_like_status":
      return {
        ...state,
        previewModal: {
          ...state.previewModal,
          like_status: action.payload.like_status,
          like_count: action.payload.like_count,
        },
      };
      break;
    case "setPreviewModal":
      return {
        ...state,
        previewModal: action.previewModal,
      };
      break;
    case "setShowModal":
      return {
        ...state,
        showModal: action.showModal,
      };
      break;
    case "login":
      return {
        ...state,
        status: action.status,
      };
  }
};
export default reducer;
