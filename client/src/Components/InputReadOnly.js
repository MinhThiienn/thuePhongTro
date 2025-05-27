import React from "react";

const InputReadOnly = ({ label, value }) => {
  return (
    <div>
      {" "}
      <div className="flex flex-col gap-2">
        <label htmlFor="exactly-address" className="font-medium">
          {label}
        </label>
        <input
          id="exactly-address"
          type="text"
          readOnly
          className="border border-gray-200 rounded-md bg-gray-100 p-2 w-full outline-none cursor-pointer"
          value={value || ""}
        />
      </div>
    </div>
  );
};

export default InputReadOnly;
