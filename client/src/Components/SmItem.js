import React from "react";
import moment from "moment";
import "moment/locale/vi";
const SmItem = ({ title, price, image, createdAt }) => {
  return (
    <div className="w-full flex items-center gap-2  border-b border-gray-300 py-2 ">
      <img
        src={image}
        alt="anh"
        className="w-[65px] object-cover rounded-md h-[65px] flex-none "
      />
      <div className="flex flex-col justify-between w-full flex-auto ">
        <h4 className="text-blue-600 text-[14px]">{`${title?.slice(
          0,
          45
        )}...`}</h4>
        <div className="flex items-center justify-between w-full gap-1">
          <span className="font-medium text-green-600 text-sm"> {price}</span>
          <span className="text-gray-300 text-sm">
            {moment(createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmItem;
