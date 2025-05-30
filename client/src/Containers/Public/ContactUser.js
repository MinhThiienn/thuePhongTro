import React, { useState } from "react";
import { InputForm, Button } from "../../Components";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import Swal from "sweetalert2";
const ContactUser = () => {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });
  const handleSubmit = () => {
    Swal.fire(
      `Cảm ơn ${payload.name ? payload.name : ""}`,
      "Phản hồi của bạn đã được chúng tôi ghi nhận",
      "success"
    ).then(() => {
      setPayload({
        name: "",
        phone: "",
        content: "",
      });
    });
  };
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Liên hệ với chúng tôi
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-5 bg-gradient-to-tr from-indigo-700 to-cyan-500 text-white p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-semibold">Thông tin liên hệ</h2>
          <p className="text-sm opacity-90 leading-relaxed">
            Cảm ơn bạn đã lựa chọn{" "}
            <span className="font-semibold">PhongTroVMT.com</span>. Chúng tôi
            rất trân trọng sự tin tưởng của bạn.
          </p>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FiPhone className="text-lg" /> Điện thoại: 0974 041 688
            </p>
            <p className="flex items-center gap-2">
              <FiMail className="text-lg" /> Email: vthien2k33@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <FiMessageSquare className="text-lg" /> Zalo / Viber: 0974041688
            </p>
            <p className="flex items-center gap-2">
              <FiMapPin className="text-lg" /> 282a Đặng Tiến Đông, Trung Liệt,
              Đống Đa, Hà Nội
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Gửi liên hệ trực tiếp
          </h2>

          <div className="flex flex-col gap-6">
            <InputForm
              label={
                <span className="flex items-center gap-2">
                  <FiUser /> HỌ VÀ TÊN CỦA BẠN
                </span>
              }
              value={payload.name}
              setValue={setPayload}
              keyPayload="name"
            />
            <InputForm
              label={
                <span className="flex items-center gap-2">
                  <FiPhone /> SỐ ĐIỆN THOẠI
                </span>
              }
              setValue={setPayload}
              keyPayload="phone"
              value={payload.phone}
            />

            <div className="flex flex-col gap-1">
              <label
                htmlFor="desc"
                className="text-sm font-medium text-gray-600"
              >
                <span className="flex items-center gap-2">
                  <FiMessageSquare /> NỘI DUNG MÔ TẢ
                </span>
              </label>
              <textarea
                id="desc"
                rows="4"
                className="bg-[#f1f5f9] p-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                placeholder="Nhập nội dung mô tả chi tiết..."
                value={payload.content}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, content: e.target.value }))
                }
                name="content"
              ></textarea>
            </div>

            <Button
              text="📨 Gửi liên hệ"
              bgColor="bg-indigo-600 hover:bg-indigo-700"
              textColor="text-white"
              fullWidth
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUser;
