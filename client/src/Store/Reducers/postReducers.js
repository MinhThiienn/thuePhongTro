import { data } from "react-router-dom";
import actionTypes from "../Action/actionTypes";
const initState = {
  posts: [],
  msg: "",
  count: 0,
  newPosts: [],
  postsOfUser: [],
  dataEdit: null,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
    case actionTypes.GET_POSTS_LIMIT:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.GET_NEW_POST:
      return {
        ...state,
        newPosts: action.newPosts || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_POSTS_ADMIN:
      return {
        ...state,
        postsOfUser: action.postsOfUser || [],
        msg: action.msg || "",
      };
    case actionTypes.EDIT_DATA:
      return {
        ...state,
        dataEdit: action.dataEdit || null,
      };
    case actionTypes.RESET_DATA_EDIT:
      return {
        ...state,
        dataEdit: null,
      };
    default:
      return state;
  }
};

export default postReducer;
