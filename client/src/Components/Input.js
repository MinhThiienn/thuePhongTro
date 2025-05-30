import React from "react";

const Input = ({
  label,
  setValue,
  unit,
  value,
  name,
  small,
  invalidFields = [],
  setInvalidFields,
  direction,
}) => {
  const isRow = direction === "flex-row";

  return (
    <div className={`flex ${direction ? direction : "flex-col"}`}>
      <div
        className={`w-full space-y-2 ${
          isRow ? "flex items-center space-x-16 space-y-0" : ""
        }`}
      >
        <label
          htmlFor="title"
          className={`block font-medium text-gray-700 ${
            isRow ? "whitespace-nowrap" : ""
          }`}
          style={isRow ? { minWidth: "100px" } : {}}
        >
          {label}
        </label>

        <div className="flex flex-col flex-1">
          <div className="flex flex-col rounded-md shadow-sm overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
            <div className="flex w-full items-center">
              <input
                type="text"
                id="title"
                className="flex-1 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0"
                value={value}
                onChange={(e) =>
                  setValue((prev) => ({ ...prev, [name]: e.target.value }))
                }
                onFocus={() => setInvalidFields && setInvalidFields([])}
              />
              {unit && (
                <span className="bg-gray-100 px-4 py-2 text-sm text-gray-700 font-medium flex items-center justify-center border-l border-gray-300">
                  {unit}
                </span>
              )}
            </div>
          </div>
          {invalidFields?.some((item) => item.name === name) && (
            <small className="text-red-500 block w-full">
              {invalidFields?.find((item) => item.name === name)?.message}
            </small>
          )}
        </div>
      </div>

      {small && !isRow && (
        <small className="opacity-60 whitespace-nowrap">{small}</small>
      )}
    </div>
  );
};

export default Input;
