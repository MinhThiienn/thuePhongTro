import React, { useState, useEffect } from "react";

const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  console.log("EditUserModal - User lúc mở modal", user);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const [balance, setBalance] = useState(user?.balance || 0);
  useEffect(() => {
    setName(user?.name || "");
    setPhone(user?.phone || "");
    setIsAdmin(user?.isAdmin || false);
    setBalance(user?.balance || 0);
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-50 p-6 rounded-2xl shadow-2xl w-1/3 transform transition-all">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Chỉnh sửa tài khoản
        </h2>

        <input
          className="p-3 w-full mb-4 border-2 border-gray-200 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tên tài khoản"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="p-3 w-full mb-4 border-2 border-gray-200 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="number"
          step="100"
          className="p-3 w-full mb-4 border-2 border-gray-200 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Số dư tài khoản"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
        />

        <label className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="mr-2 transform scale-125"
          />
          Là tài khoản quản trị
        </label>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-500 text-gray-50 font-semibold rounded-lg shadow-md transition-all hover:bg-gray-600"
          >
            Hủy
          </button>
          <button
            onClick={() =>
              onSave({
                id: user?.id,
                name,
                phone,
                isAdmin,
                balance: Number(balance),
              })
            }
            className="px-4 py-2 bg-blue-500 text-gray-50 font-semibold rounded-lg shadow-md transition-all hover:bg-blue-600"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
