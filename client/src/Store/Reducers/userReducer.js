import actionTypes from "../Action/actionTypes";

const initState = {
  currentUser: {},
  allUsers: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT:
      return {
        ...state,
        currentUser: action.currentUser || {},
        msg: action.msg || "",
      };
    case actionTypes.GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers || [],
        msg: action.msg || "",
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user.id !== action.payload),
        msg: action.msg || "",
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        currentUser: {},
        allUsers: [],
      };
    default:
      return state;
  }
};

export default userReducer;
