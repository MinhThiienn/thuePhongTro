import actionTypes from "../Action/actionTypes";
const initState = {
  categories: [],
  msg: "",
};

const appRuducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};

export default appRuducer;
