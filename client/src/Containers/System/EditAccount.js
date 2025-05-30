import React, { useState, useEffect } from "react";
import { Input, InputReadOnly, Button } from "../../Components";
import anonAvatar from "../../assets/anon.png";
import { useSelector, useDispatch } from "react-redux";
import { apiUpdateUser } from "../../Services/user";
import { blobToBase64, fileToBase64 } from "../../Ultils/toBase64";
import * as actions from "../../Store/Action";
import Swal from "sweetalert2";
const EditAccount = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    name: currentUser?.name || "",
    avatar: "",
    fbUrl: currentUser?.fbUrl || "",
    zalo: currentUser?.zalo || "",
  });
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

  const handleSubmit = async () => {
    const responce = await apiUpdateUser(payload);
    if (responce?.data.err === 0) {
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
      <div className="w-full  bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-300">
          Chỉnh sửa thông tin cá nhân
        </h1>

        <div className="w-full">
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
            {/* <Input
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              label="Email"
              direction="flex-row"
            /> */}
            <Input
              name={"zalo"}
              label="Zalo"
              direction="flex-row"
              value={payload?.zalo}
              setValue={setPayload}
            />
            <Input
              name={"fbUrl"}
              setValue={setPayload}
              label="Facebook"
              direction="flex-row"
              value={payload?.fbUrl}
            />
            <div className="flex items-center gap-4">
              <label
                htmlFor="password"
                className="w-40 text-gray-700 font-medium"
              >
                Mật khẩu
              </label>
              <span className="text-blue-600 cursor-pointer hover:underline">
                Đổi mật khẩu
              </span>
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
                  onChange={(e) => handleUploadAvatar(e)}
                ></input>
              </div>
            </div>
            <Button
              text="Cập nhật"
              bgColor="bg-blue-600 hover:bg-blue-700"
              textColor="text-white"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
