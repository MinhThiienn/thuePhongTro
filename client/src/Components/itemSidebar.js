import React, { memo } from "react";
import icons from "../Ultils/icon";

const itemSidebar = ({ content, title }) => {
  const { GrFormNext } = icons;

  return (
    <div className="p-4 rounded-md bg-white w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className=" flex flex-col gap-2">
        {content?.length > 0 &&
          content.map((item) => {
            return (
              <div className="flex items-center gap-2 hover:bg-gray-100 hover:text-orange-600 rounded-md cursor-pointer border-b border-dashed border-gray-200 pb-1 ">
                <GrFormNext size={12} color="gray" />
                <p>{item.value}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(itemSidebar);
