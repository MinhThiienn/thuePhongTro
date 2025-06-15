import React from "react";

const InputReadOnly = ({ label, value, direction, editPhone }) => {
  const isRow = !!direction;

  return (
    <div
      className={`flex ${direction || "flex-col"} ${
        isRow ? "space-x-11 items-start" : "space-y-2 "
      }`}
    >
      <label
        htmlFor="exactly-address"
        className={`font-medium text-gray-700 ${
          isRow ? "pt-2 whitespace-nowrap" : ""
        }`}
        style={isRow ? { minWidth: "120px" } : {}}
      >
        {label}
      </label>

      <div className="flex flex-col flex-1 space-y-1">
        <input
          id="exactly-address"
          type="text"
          readOnly
          className="border border-gray-300 rounded-md bg-gray-100 p-2 outline-none cursor-default w-full text-gray-800"
          value={value || ""}
        />
        {/* {editPhone && (
          <small className="text-blue-600 hover:underline cursor-pointer">
            Đổi số điện thoại
          </small>
        )} */}
      </div>
    </div>
  );
};

export default InputReadOnly;
