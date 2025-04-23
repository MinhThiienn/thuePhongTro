import React, { useCallback } from "react";
import logo from "../../assets/logo-removebg-preview.png";
import { Button } from "../../Components";
import icons from "../../Ultils/icon";
import { useNavigate } from "react-router-dom";
import { path } from "../../Ultils/constant";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../Store/Action";
const { CiCirclePlus } = icons;
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  return (
    <div className="w-1100">
      {" "}
      <div className="w-full flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[240px] h-[70px] object-contain "
          ></img>
        </Link>

        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <div className="flex items-center gap-1">
              {" "}
              <small>Phòng trọ VMT xin chào !</small>
              <Button
                text={"Đăng Nhập"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(false)}
              ></Button>
              <Button
                text={"Đăng Kí"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              ></Button>
            </div>
          )}

          {isLoggedIn && (
            <div className="flex items-center gap-1">
              {" "}
              <small>Tên !</small>
              <Button
                text={"Đăng Xuất"}
                textColor="text-white"
                bgColor="bg-red-700"
                onClick={() => dispatch(action.logout())}
              ></Button>
            </div>
          )}

          <Button
            text={"Đăng Tin Mới"}
            textColor="text-white"
            bgColor="bg-secondary2"
            IcAfter={CiCirclePlus}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
