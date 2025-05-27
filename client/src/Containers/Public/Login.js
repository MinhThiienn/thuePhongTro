import React, { useEffect, useState } from "react";
import { Button, InputForm } from "../../Components";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../Store/Action";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import validate from "../../Ultils/Common/validateField";
const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayLoad] = useState({
    phone: "",
    password: "",
    name: "",
  });
  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // Chỉ hiển thị thông báo nếu có lỗi và không phải là thông báo trống
    if (msg && msg.trim()) {
      Swal.fire("Oops!", msg, "error");
    }
  }, [msg, update]);

  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalids = validate(finalPayload, setInvalidFields);
    if (invalids === 0) {
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm m-[20px]">
        <h3 className="font-semibold text-2xl mb-3">
          {isRegister ? "Đăng kí tài khoản" : "Đăng nhập"}
        </h3>
        <div className="w-full flex flex-col gap-5">
          {isRegister && (
            <InputForm
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              label={"Họ Tên"}
              value={payload.name}
              setValue={setPayLoad}
              keyPayload={"name"}
            />
          )}
          <InputForm
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label={"Số Điện Thoại"}
            value={payload.phone}
            setValue={setPayLoad}
            keyPayload={"phone"}
          />
          <InputForm
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label={"Mật Khẩu"}
            value={payload.password}
            setValue={setPayLoad}
            keyPayload={"password"}
            type="password"
          />
          <Button
            text={isRegister ? "Đăng kí" : "Đăng nhập"}
            bgColor={"bg-secondary1"}
            textColor={"text-white"}
            fullWidth
            onClick={handleSubmit}
          />
        </div>
        <div className="mt-7 flex items-center justify-between">
          {isRegister ? (
            <small>
              Bạn đã có tài khoản ?{" "}
              <span
                className="text-blue-500 hover:underline  cursor-pointer"
                onClick={() => {
                  setIsRegister(false);
                  setPayLoad({ phone: "", password: "", name: "" });
                }}
              >
                Đăng nhập ngay
              </span>
            </small>
          ) : (
            <>
              {" "}
              <small className=" text-blue-600 hover:text-red-600 cursor-pointer">
                Bạn quên mật khẩu
              </small>
              <small
                className=" text-blue-600 hover:text-red-600 cursor-pointer"
                onClick={() => {
                  setIsRegister(true);
                  setPayLoad({ phone: "", password: "", name: "" });
                }}
              >
                Tạo tài khoản mới
              </small>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
