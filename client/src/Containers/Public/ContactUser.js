import React, { useState, useRef } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiUser,
} from "react-icons/fi";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactUser = () => {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const formRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!payload.name || !payload.phone || !payload.content) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng nhập đầy đủ thông tin!",
      });
      return;
    }

    setLoading(true);
    emailjs
      .send(
        "service_b1h6mv7",
        "template_wic2269",
        {
          name: payload.name,
          phone: payload.phone,
          message: payload.content,
          time: new Date().toLocaleString(),
        },
        "3NCIm0tLv5JzxRqOF"
      )
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Gửi liên hệ thành công!",
        });
        setPayload({ name: "", phone: "", content: "" });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Gửi liên hệ thất bại: " + error.text,
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

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Gửi liên hệ trực tiếp
          </h2>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <FiUser /> HỌ VÀ TÊN CỦA BẠN
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nhập họ và tên"
              value={payload.name}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, name: e.target.value }))
              }
              className="bg-[#f1f5f9] p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <FiPhone /> SỐ ĐIỆN THOẠI
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={payload.phone}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="bg-[#f1f5f9] p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="desc"
              className="flex items-center gap-2 text-sm font-medium text-gray-600"
            >
              <FiMessageSquare /> NỘI DUNG MÔ TẢ
            </label>
            <textarea
              id="desc"
              name="content"
              rows="4"
              placeholder="Nhập nội dung mô tả chi tiết..."
              value={payload.content}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, content: e.target.value }))
              }
              className="bg-[#f1f5f9] p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
              disabled={loading}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading ? "Đang gửi..." : "📨 Gửi liên hệ"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUser;
