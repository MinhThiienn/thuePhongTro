import React, { memo } from "react";
import item from "../../Components/item";

const Select = ({
  label,
  options,
  value,
  setValue,
  name,
  invalidFields,
  setInvalidFields,
}) => {
  const handleErrorText = () => {
    let textError = "";
    let nameInvalid = invalidFields?.find((item) => item.name === name);
    let addressInvalid = invalidFields?.find((item) => item.name === "address");

    return (
      `${nameInvalid ? nameInvalid?.message : ""}` ||
      `${addressInvalid ? addressInvalid?.message : ""}`
    );
  };
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="font-medium" htmlFor="select-address">
        {label}
      </label>
      <select
        id="select-address"
        value={value || ""}
        onChange={(e) => {
          if (!name) {
            const selected = options.find(
              (item) => item.code.toString() === e.target.value
            );
            setValue(selected || null);
          } else {
            setValue((prev) => ({ ...prev, [name]: e.target.value }));
          }
        }}
        className="outline-none border border-gray-300 p-2 w-full rounded-md"
        onFocus={() => setInvalidFields([])}
      >
        <option value="">{`--Chọn ${label}--`}</option>
        {options?.map((item) => (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>
      <small className="text-red-500">{handleErrorText() || " "}</small>
    </div>
  );
};

export default memo(Select);
