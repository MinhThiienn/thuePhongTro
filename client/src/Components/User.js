import React from "react";
import anon from "../assets/anon.png";
import { useSelector } from "react-redux";

const User = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex items-center gap-2">
      <img
        src={currentUser?.avatar || anon}
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
