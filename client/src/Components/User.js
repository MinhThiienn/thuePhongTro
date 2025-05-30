import React, { useEffect, useState } from "react";
import anon from "../assets/anon.png";
import { useSelector } from "react-redux";
import { blobToBase64 } from "../Ultils/toBase64";

const User = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [avatarBase64, setAvatarBase64] = useState(null);

  useEffect(() => {
    const convertAvatar = async () => {
      if (currentUser?.avatar) {
        try {
          const base64 = await blobToBase64(currentUser.avatar);
          setAvatarBase64(base64);
        } catch (error) {
          console.error("Lỗi khi chuyển avatar sang base64:", error);
          setAvatarBase64(null);
        }
      }
    };
    convertAvatar();
  }, [currentUser]);

  return (
    <div className="flex items-center gap-2">
      <img
        src={avatarBase64 || anon}
        alt="Avatar"
        className="w-10 object-cover rounded-full h-10 shadow-md"
      />
      <div className="flex flex-col">
        <span>
          Xin chào,{" "}
          <span className="font-semibold">
            {currentUser?.name || "Người dùng"}
          </span>
        </span>
        <span>
          Mã tài khoản:{" "}
          <span className="font-medium">
            {currentUser?.id ? `${currentUser.id.slice(0, 10)}...` : "??"}
          </span>
        </span>
      </div>
    </div>
  );
};

export default User;
