import React from "react";
import item from "./item";

const Input = ({
  label,
  setValue,
  unit,
  value,
  name,
  small,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="w-full space-y-2">
      <label htmlFor="title" className="block font-medium text-gray-700">
        {label}
      </label>
      <div className="flex rounded-md shadow-sm overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          id="title"
          className="flex-1 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 "
          value={value}
          onChange={(e) => {
            setValue((prev) => ({ ...prev, [name]: e.target.value }));
          }}
          onFocus={() => setInvalidFields([])}
        />
        {unit && (
          <span className="bg-gray-100 px-4 py-2 text-sm text-gray-700 font-medium flex items-center justify-center border-l border-gray-300">
            {unit}
          </span>
        )}
      </div>
      <small className="opacity-60 whitespace-nowrap">{small || ""}</small>
      <small className="text-red-500 block w-full">
        {invalidFields.some((item) => item.name === name) &&
          invalidFields?.find((item) => item.name === name)?.message}
      </small>
    </div>
  );
};

export default Input;
