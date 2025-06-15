import React, { useState, useEffect } from "react";
import anonAvatar from "../../assets/anon.png";
import { useSelector, useDispatch } from "react-redux";
import memuSidebar from "../../Ultils/menuSidebar";
import { NavLink } from "react-router-dom";
import * as action from "../../Store/Action";
import icons from "../../Ultils/icon";
import { blobToBase64 } from "../../Ultils/toBase64";

const SideBar = () => {
  const { AiOutlineLogout } = icons;
  const [avatarBase64, setAvatarBase64] = useState("");

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const activeStyle =
    "hover:bg-gray-200 py-2 items-center flex font-bold bg-gary-300 gap-2 rounded-md ";
  const notActiveStyle =
    "hover:bg-gray-200 py-2 items-center flex gap-2 rounded-md cursor-pointer";

  useEffect(() => {
    const convertAvatar = async () => {
      if (currentUser?.avatar) {
        const base64 = await blobToBase64(currentUser.avatar);
        setAvatarBase64(base64);
      }
    };
    convertAvatar();
  }, [currentUser?.avatar]);

  return (
    <div className="w-[256px] flex-none p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={avatarBase64 || anonAvatar}
            alt="avatar"
            className="w-[60px] h-[60px] object-cover rounded-full border-2"
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{currentUser?.name}</span>
            <small>{currentUser?.phone}</small>

            <div
              className="flex items-center gap-1 mt-1 p-1 bg-yellow-100 border border-yellow-500 rounded-md transition-all hover:bg-yellow-200"
              title="Số dư tài khoản"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#facc15"
                className="w-4 h-4"
              >
                <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-9h2v6h-2V7zm0-2h2v1h-2V5z" />
              </svg>
              <span className="text-xs font-medium">
                {currentUser?.balance?.toLocaleString()} VNĐ
              </span>
            </div>

            {currentUser?.vipLevel > 0 &&
              new Date(currentUser?.vipExpire) > new Date() && (
                <div
                  className="flex items-center gap-1 mt-1 p-1 bg-green-100 border border-green-500 rounded-md transition-all hover:bg-green-200"
                  title="Gói VIP"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#34D399"
                    className="w-4 h-4"
                  >
                    <path d="M10 2l2 5h6l-4 4 2 5-6-3-6 3 2-5-4-4h6l2-5z" />
                  </svg>
                  <span className="text-xs font-medium">
                    VIP {currentUser?.vipLevel} - Hết hạn:{" "}
                    {new Date(currentUser.vipExpire).toLocaleDateString()}
                  </span>
                </div>
              )}
          </div>
        </div>

        <span>
          Mã thành viên:{" "}
          <small className="font-medium">
            {currentUser?.id?.match(/\d/g)?.join("")?.slice(0, 5)}
          </small>
        </span>
      </div>

      <div>
        {memuSidebar.map((item) => (
          <NavLink
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
            to={item.path}
            key={item.id}
          >
            {item.icon}
            {item.text}
          </NavLink>
        ))}
        <span
          onClick={() => dispatch(action.logout())}
          className={notActiveStyle}
        >
          <AiOutlineLogout />
          Thoát
        </span>
      </div>
    </div>
  );
};

export default SideBar;
