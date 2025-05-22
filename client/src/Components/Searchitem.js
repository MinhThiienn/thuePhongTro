import { memo } from "react";
import React from "react";

const Searchitem = ({ iconBefore, iconAfter, text, font, defaultText }) => {
  return (
    <div className="bg-white py-2 px-4 w-full rounded-md text-gray-400 text-[13.3px] flex justify-between items-center">
      <div className="flex items-center gap-1 w-full ">
        {iconBefore}
        <span
          className={`${
            font && "font-medium text-black "
          }w-[100px] overflow-hidden text-ellipsis whitespace-nowrap ${
            text ? "font-medium text-black" : ""
          }`}
        >
          {" "}
          {text || defaultText}
        </span>
      </div>
      {iconAfter}
    </div>
  );
};

export default memo(Searchitem);
