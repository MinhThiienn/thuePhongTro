import React, { useState } from "react";
import { apiUpdatePostByAdmin } from "../../Services/post";
import Swal from "sweetalert2";

const EditPostModal = ({ isOpen, onClose, post }) => {
  function parsePrice(priceStr) {
    if (!priceStr) return 0;
    if (priceStr.indexOf("triệu") !== -1) {
      const number = parseFloat(priceStr);
      return Math.round(number * 1000000);
    }
    return parseInt(priceStr);
  }

  function parseAcreage(acreageStr) {
    if (!acreageStr) return 0;
    return parseInt(acreageStr);
  }

  const [formData, setFormData] = useState({
    title: post?.title || "",
    priceNumber: parsePrice(post?.attributes?.price),
    areaNumber: parseAcreage(post?.attributes?.acreage),
    star: post?.star || 0,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        postId: post?.id,
        title: formData.title,
        priceNumber: Number(formData.priceNumber),
        areaNumber: Number(formData.areaNumber),
        star: Number(formData.star),
      };
      const res = await apiUpdatePostByAdmin(payload);
      if (res?.data?.err === 0) {
        Swal.fire("Thành công!", "Bài đăng đã được cập nhật.", "success");
        onClose(true);
      } else {
        Swal.fire("Lỗi!", res?.data?.msg || "Không thể cập nhật.", "error");
      }
    } catch (error) {
      Swal.fire("Lỗi!", "Không thể cập nhật bài đăng.", "error");
    }
  };

  return (
    <div
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-gray-100 p-6 rounded shadow-md w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Chỉnh sửa bài đăng</h2>

        <label className="block mb-2">
          Tiêu đề:
          <input
            name="title"
            onChange={handleChange}
            value={formData.title}
            className="p-2 mt-1 w-full border rounded"
          />
        </label>

        <label className="block mb-2">
          Giá:
          <input
            name="priceNumber"
            onChange={handleChange}
            value={formData.priceNumber}
            type="number"
            min="1000"
            className="p-2 mt-1 w-full border rounded"
          />
        </label>

        <label className="block mb-2">
          Diện tích:
          <input
            name="areaNumber"
            onChange={handleChange}
            value={formData.areaNumber}
            type="number"
            min="0"
            className="p-2 mt-1 w-full border rounded"
          />
        </label>

        <label className="block mb-2">
          VIP (0 = Thường, 3 = VIP1, 4 = VIP2, 5 = VIP3):
          <input
            name="star"
            onChange={handleChange}
            value={formData.star}
            type="number"
            min="0"
            max="5"
            className="p-2 mt-1 w-full border rounded"
          />
        </label>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-gray-50 font-semibold rounded"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-gray-50 font-semibold rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
