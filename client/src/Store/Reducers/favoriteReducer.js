import actionTypes from "../Action/actionTypes";

const initState = {
  favorites: [],
  msg: "",
  count: 0,
};

const favoriteReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_FAVORITES:
    case actionTypes.GET_FAVORITES_LIMIT:
      return {
        ...state,
        favorites: action.favorites || [],
        msg: action.msg || "",
        count: action.count || action.favorites?.length || 0,
      };

    case actionTypes.ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
        count: state.count + 1,
        msg: action.msg || "",
      };

    case actionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (fav) => fav.postId !== action.postId
        ),
        count: state.favorites.length - 1,
        msg: action.msg || "",
      };

    default:
      return state;
  }
};

export default favoriteReducer;
