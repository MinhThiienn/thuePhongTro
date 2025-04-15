import React from "react";
import { Button, InputForm } from "../../Components";

const Login = () => {
  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm m-[20px]">
      <h3 className="font-semibold text-2xl mb-3">Đăng Nhập</h3>
      <div className="w-full flex flex-col gap-5">
        <InputForm label={"Số Điện Thoại"} />
        <InputForm label={"Mật Khẩu"} />
        <Button
          text={"Đăng Nhập"}
          bgColor={"bg-secondary1"}
          textColor={"text-white"}
          fullWidth
        />
      </div>
      <div className="mt-7 flex items-center justify-between">
        <small className=" text-blue-600 hover:text-red-600 cursor-pointer">
          Bạn quên mật khẩu
        </small>
        <small className=" text-blue-600 hover:text-red-600 cursor-pointer">
          Tạo tài khoản mới
        </small>
      </div>
    </div>
  );
};

export default Login;
