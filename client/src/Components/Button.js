import React, { memo } from "react";

const Button = ({ text, textColor, bgColor, IcAfter, onClick, fullWidth }) => {
  return (
    <button
      type="button"
      className={` ${textColor} ${bgColor} ${
        fullWidth && "w-full"
      } outline-none rounded-md hover:underline flex items-center justify-center gap-1 p-2`}
      onClick={onClick}
    >
      <span> {text}</span>
      <span>{IcAfter && <IcAfter />}</span>
    </button>
  );
};

export default memo(Button);
