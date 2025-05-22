import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../assets/logo-removebg-preview.png";
import { Button, User } from "../../Components";
import icons from "../../Ultils/icon";
import { useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../Ultils/constant";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../Store/Action";
import menuManage from "../../Ultils/menuManage";
const { CiCirclePlus, AiOutlineLogout, IoIosArrowDown, IoIosArrowUp } = icons;
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isShowMenu, setisShowMenu] = useState(false);
  const headerRef = useRef();
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page")]);
  return (
    <div ref={headerRef} className="w-3/5">
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
            <div className="flex items-center gap-3 relative">
              {" "}
              <User />
              <Button
                text="Quản lí tài khoản"
                textColor="text-white"
                bgColor="bg-blue-700"
                px="px-4"
                IcAfter={isShowMenu ? IoIosArrowUp : IoIosArrowDown}
                onClick={() => setisShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div className="absolute min-w-200 top-full right-0 bg-white shadow-md rounded-md p-4 flex flex-col ">
                  {menuManage.map((item) => {
                    return (
                      <Link
                        className="hover:text-orange-500 text-blue-500  border-b border-gray-200 py-2 items-center gap-2 flex"
                        to={item?.path}
                        key={item.id}
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    );
                  })}

                  <span
                    className="cursor-pointer hover:text-orange-500 text-blue-500 border-gray-200 py-2 flex items-center gap-2"
                    onClick={() => {
                      dispatch(action.logout(), setisShowMenu(false));
                    }}
                  >
                    <AiOutlineLogout />
                    Đăng Xuất
                  </span>
                </div>
              )}
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
