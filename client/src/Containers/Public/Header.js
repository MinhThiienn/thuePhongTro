import React, { useCallback } from "react";
import logo from "../../assets/logo-removebg-preview.png";
import { Button } from "../../Components";
import icons from "../../Ultils/icon";
import { useNavigate } from "react-router-dom";
import { path } from "../../Ultils/constant";
const { CiCirclePlus } = icons;
const Header = () => {
  const navigate = useNavigate();
  const goLogin = useCallback(() => {
    navigate(path.LOGIN);
  }, []);
  return (
    <div className="w-1100">
      {" "}
      <div className="w-full flex items-center justify-between">
        <img
          src={logo}
          alt="logo"
          className="w-[240px] h-[70px] object-contain "
        ></img>

        <div className="flex items-center gap-1">
          <small>Phòng trọ VMT xin chào !</small>
          <Button
            text={"Đăng Nhập"}
            textColor="text-white"
            bgColor="bg-[#3961fb]"
            onClick={goLogin}
          ></Button>

          <Button
            text={"Đăng Kí"}
            textColor="text-white"
            bgColor="bg-[#3961fb]"
            onClick={goLogin}
          ></Button>

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
