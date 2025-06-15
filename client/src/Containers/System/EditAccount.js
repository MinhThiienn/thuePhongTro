import React, { useState, useEffect } from "react";
import { Input, InputReadOnly, Button } from "../../Components";
import anonAvatar from "../../assets/anon.png";
import { useSelector, useDispatch } from "react-redux";
import { apiUpdateUser, apiVerifyPassword } from "../../Services/user";
import { blobToBase64, fileToBase64 } from "../../Ultils/toBase64";
import * as actions from "../../Store/Action";
import Swal from "sweetalert2";
import validate from "../../Ultils/Common/validateField";
const EditAccount = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    name: currentUser?.name || "",
    avatar: "",
    fbUrl: currentUser?.fbUrl || "",
    zalo: currentUser?.zalo || "",
  });

  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordVerified, setOldPasswordVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isVerifyingOldPass, setIsVerifyingOldPass] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    const convertAvatar = async () => {
      if (currentUser?.avatar) {
        const base64 = await blobToBase64(currentUser.avatar);
        setPayload((prev) => ({
          ...prev,
          avatar: base64,
        }));
      }
    };
    convertAvatar();
  }, [currentUser?.avatar]);

  // Cập nhật thông tin cá nhân (không liên quan mật khẩu)
  const handleSubmit = async () => {
    try {
      const response = await apiUpdateUser(payload);
      if (response?.data.err === 0) {
        Swal.fire(
          "Done",
          "Chỉnh sửa thông tin cá nhân thành công",
          "success"
        ).then(() => {
          dispatch(actions.getCurrentUser());
        });
      } else {
        Swal.fire(
          "Oop!",
          "Chỉnh sửa thông tin cá nhân không thành công",
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Error", "Đã xảy ra lỗi: " + error.message, "error");
    }
  };

  // Xác thực mật khẩu cũ
  const handleVerifyOldPassword = async () => {
    if (!oldPassword) {
      Swal.fire("Warning", "Vui lòng nhập mật khẩu cũ", "warning");
      return;
    }
    setIsVerifyingOldPass(true);
    try {
      const res = await apiVerifyPassword(oldPassword);
      if (res?.data.err === 0 && res.data.valid) {
        setOldPasswordVerified(true);
        Swal.fire(
          "Success",
          "Mật khẩu cũ hợp lệ, vui lòng nhập mật khẩu mới",
          "success"
        );
      } else {
        Swal.fire("Error", "Mật khẩu cũ không đúng", "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Lỗi khi xác thực mật khẩu cũ: " + error.message,
        "error"
      );
    } finally {
      setIsVerifyingOldPass(false);
    }
  };

  const handleChangePassword = async () => {
    setInvalidFields([]);

    const invalidCount = validate({ password: newPassword }, setInvalidFields);

    if (invalidCount > 0) {
      const errorMessages = invalidFields.map((err) => err.message).join("\n");
      Swal.fire("Warning", errorMessages, "warning");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const response = await apiUpdateUser({
        password: newPassword,
      });
      if (response?.data.err === 0) {
        Swal.fire("Done", "Đổi mật khẩu thành công", "success").then(() => {
          dispatch(actions.logout());
        });
      } else {
        Swal.fire("Oop!", "Đổi mật khẩu không thành công", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Lỗi khi đổi mật khẩu: " + error.message, "error");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleUploadAvatar = async (e) => {
    const imageBase64 = await fileToBase64(e.target.files[0]);
    setPayload((prev) => ({
      ...prev,
      avatar: imageBase64,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full bg-white p-10 rounded-2xl shadow-lg max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-300">
          {isChangingPassword ? "Đổi mật khẩu" : "Chỉnh sửa thông tin cá nhân"}
        </h1>

        {!isChangingPassword && (
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
            <InputReadOnly
              value={
                currentUser?.id
                  ? `#${currentUser.id.match(/\d/g)?.join("")?.slice(0, 5)}`
                  : ""
              }
              label="Mã thành viên"
              direction="flex-row"
            />
            <InputReadOnly
              value={currentUser?.phone}
              editPhone
              label="Số điện thoại"
              direction="flex-row"
            />
            <Input
              name={"name"}
              value={payload?.name}
              label="Tên hiển thị"
              direction="flex-row"
              setValue={setPayload}
            />
            <Input
              name={"zalo"}
              label="Zalo"
              direction="flex-row"
              value={payload?.zalo}
              setValue={setPayload}
            />

            <div className="flex items-center gap-4">
              <label className="w-40 text-gray-700 font-medium">Mật khẩu</label>

              <small
                onClick={() => setIsChangingPassword(true)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Đổi mật khẩu
              </small>
            </div>

            <div className="flex items-center gap-6 mt-2">
              <label
                htmlFor="avatar"
                className="w-40 text-gray-700 font-medium"
              >
                Ảnh đại diện
              </label>
              <div>
                <img
                  src={payload?.avatar || anonAvatar}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover shadow"
                />
                <input
                  type="file"
                  className="appearance-none my-4"
                  id="avatar"
                  onChange={handleUploadAvatar}
                />
              </div>
            </div>

            <Button
              text="Cập nhật thông tin cá nhân"
              bgColor="bg-blue-600 hover:bg-blue-700"
              textColor="text-white"
              onClick={handleSubmit}
            />
          </div>
        )}

        {isChangingPassword && (
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-8">
            {!oldPasswordVerified ? (
              <>
                <input
                  id="oldPassword"
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                  placeholder="Mật khẩu cũ"
                  autoFocus
                />
                <div className="flex gap-5 justify-center">
                  <Button
                    text={
                      isVerifyingOldPass
                        ? "Đang xác thực..."
                        : "Xác thực mật khẩu cũ"
                    }
                    bgColor="bg-blue-600 hover:bg-blue-700"
                    textColor="text-white"
                    onClick={handleVerifyOldPassword}
                    disabled={isVerifyingOldPass}
                    className="flex-shrink-0 px-6 py-3 rounded-md font-semibold shadow-md transition-shadow
              hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <Button
                    text="Hủy"
                    bgColor="bg-gray-300 hover:bg-gray-400"
                    textColor="text-gray-800"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setOldPassword("");
                    }}
                    className="flex-shrink-0 px-6 py-3 rounded-md font-semibold shadow-md transition-shadow
              hover:shadow-lg"
                  />
                </div>
              </>
            ) : (
              <>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border border-gray-300 rounded-md p-3 w-full text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-4 focus:ring-green-400 transition"
                  placeholder="Mật khẩu mới"
                  autoFocus
                />
                <div className="flex gap-5 justify-center">
                  <Button
                    text={
                      isUpdatingPassword ? "Đang cập nhật..." : "Đổi mật khẩu"
                    }
                    bgColor="bg-green-600 hover:bg-green-700"
                    textColor="text-white"
                    onClick={handleChangePassword}
                    disabled={isUpdatingPassword}
                    className="flex-shrink-0 px-6 py-3 rounded-md font-semibold shadow-md transition-shadow
              hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <Button
                    text="Hủy"
                    bgColor="bg-gray-300 hover:bg-gray-400"
                    textColor="text-gray-800"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setOldPassword("");
                      setOldPasswordVerified(false);
                      setNewPassword("");
                    }}
                    className="flex-shrink-0 px-6 py-3 rounded-md font-semibold shadow-md transition-shadow
              hover:shadow-lg"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAccount;
