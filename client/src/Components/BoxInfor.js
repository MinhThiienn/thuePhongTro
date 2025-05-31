import React, { memo } from "react";
import anonAvatar from "../assets/anon.png";
import { LuDot } from "react-icons/lu";
import { SiZalo } from "react-icons/si";
import icons from "../Ultils/icon";
const { FaPhoneAlt } = icons;
const BoxInfor = ({ userData }) => {
  return (
    <div className="w-full bg-orange-400 rounded-md flex flex-col items-center p-4 gap-4">
      <img
        src={anonAvatar}
        alt="avatar"
        className="w-16 h-16 object-contain rounded-full"
      />
      <h3 className="font-medium text-xl">{userData?.name}</h3>
      <span className="flex items-center ">
        <LuDot color="green" size={30} />
        <span>Đang hoạt động</span>
      </span>
      <a
        href={`tel:${userData?.phone}`}
        className="bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-white text-lg"
      >
        <FaPhoneAlt />
        {userData?.phone}
      </a>
      <a
        href={`https://zalo.me/${userData?.zalo}`}
        className="bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-black text-lg"
      >
        <SiZalo size={35} color="blue" />
      </a>
    </div>
  );
};

export default memo(BoxInfor);
