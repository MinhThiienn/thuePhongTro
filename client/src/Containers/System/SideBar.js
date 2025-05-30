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
    <div className="w-[256px] flex-none p-4 flex flex-col gap-6 ">
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
          </div>
        </div>
        <span>
          Mã thành viên:{" "}
          <small className="font-medium">
            {" "}
            {currentUser?.id?.match(/\d/g)?.join("")?.slice(0, 5)}
          </small>
        </span>
      </div>
      <div>
        {" "}
        {memuSidebar.map((item) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
              to={item?.path}
              key={item.id}
            >
              {item?.icon}
              {item.text}
            </NavLink>
          );
        })}
        <span
          onClick={() => {
            dispatch(action.logout());
          }}
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
