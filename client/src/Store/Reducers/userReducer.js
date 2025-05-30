import actionTypes from "../Action/actionTypes";
const initState = {
  currentUser: {},
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT:
      return {
        ...state,
        currentUser: action.currentUser || {},
        msg: action.msg || "",
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        currentUser: {},
      };
    default:
      return state;
  }
};

export default userReducer;
