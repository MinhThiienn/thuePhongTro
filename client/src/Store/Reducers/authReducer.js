import actionTypes from "../Action/actionTypes";

// khởi tạo từ localStorage nếu có
const initState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  isAdmin: localStorage.getItem("isAdmin") === "true",
  phone: localStorage.getItem("phone") || "",
  msg: "",
  update: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      // sau khi đăng nhập:
      console.log("LOGIN_SUCCESS action received!", action.data);

      // Lưu vào localStorage
      localStorage.setItem("token", action.data?.token);
      localStorage.setItem("isAdmin", action.data?.isAdmin);
      localStorage.setItem("phone", action.data?.phone || "");

      return {
        ...state,
        isLoggedIn: true,
        token: action.data?.token,
        isAdmin: !!action.data?.isAdmin,
        phone: action.data?.phone || "",
        msg: "",
      };
    case actionTypes.REGISTER_FAIL:
    case actionTypes.LOGIN_FAIL:
      // Xóa khỏi localStorage nếu đăng nhập失败
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("phone");

      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        phone: "",
        msg: action.data,
        token: null,
        update: !state.update,
      };
    case actionTypes.LOGOUT:
      // Xóa khỏi localStorage khi đăng xuất
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("phone");

      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        phone: "",
        token: null,
        msg: "",
      };
    default:
      return state;
  }
};

export default authReducer;
