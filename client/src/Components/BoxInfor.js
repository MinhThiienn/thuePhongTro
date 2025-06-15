import React, { memo, useState, useEffect } from "react";
import anonAvatar from "../assets/anon.png";
import { LuDot } from "react-icons/lu";
import { SiZalo } from "react-icons/si";
import icons from "../Ultils/icon";
import { blobToBase64 } from "../Ultils/toBase64";
const { FaPhoneAlt } = icons;
const BoxInfor = ({ userData }) => {
  const [avatarBase64, setAvatarBase64] = useState(null);
  useEffect(() => {
    const convertAvatar = async () => {
      if (userData?.avatar) {
        try {
          const base64 = await blobToBase64(userData.avatar);
          setAvatarBase64(base64);
        } catch (error) {
          console.error("Lỗi khi chuyển avatar sang base64:", error);
          setAvatarBase64(null);
        }
      }
    };
    convertAvatar();
  }, [userData]);
  return (
    <div className="w-full bg-orange-400 rounded-md flex flex-col items-center p-4 gap-4">
      <img
        src={avatarBase64 || anonAvatar}
        alt="avatar"
        className="w-16 h-16 object-cover rounded-full"
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
        className="bg-blue-600 py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-black text-lg"
      >
        <SiZalo size={35} color="white" />
      </a>
    </div>
  );
};

export default memo(BoxInfor);
