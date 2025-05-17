import React, { memo } from "react";
import icons from "../Ultils/icon";
import { formatVietnameseToString } from "../Ultils/Common/formatVietnameseToString";
import { Link } from "react-router-dom";
import * as actions from "../Store/Action";
import { useDispatch } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { location } from "../Ultils/constant";
const ItemSidebar = ({ content, title, isDouble, type }) => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const { GrFormNext } = icons;
  const formartContent = () => {
    const oddEl = content?.filter((item, index) => index % 2 !== 0);
    const evenEl = content?.filter((item, index) => index % 2 === 0);
    const formartContent = oddEl?.map((item, index) => {
      return {
        right: item,
        left: evenEl.find((item2, index2) => index === index2),
      };
    });
    return formartContent;
  };
  const handleFillterPost = (code) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
  };

  return (
    <div className="p-4 rounded-md bg-white w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {!isDouble && (
        <div className=" flex flex-col gap-2">
          {content?.length > 0 &&
            content.map((item) => {
              return (
                <Link
                  to={`${formatVietnameseToString(item.value)}`}
                  key={item.code}
                  className="flex items-center gap-2 hover:bg-gray-100 hover:text-orange-600 rounded-md cursor-pointer border-b border-dashed border-gray-200 pb-1 "
                >
                  <GrFormNext size={12} color="gray" />
                  <p>{item.value}</p>
                </Link>
              );
            })}
        </div>
      )}
      {isDouble && (
        <div className=" flex flex-col gap-2">
          {content?.length > 0 &&
            formartContent(content).map((item, index) => {
              return (
                <div key={index} className="">
                  <div className="flex items-center justify-around">
                    {" "}
                    <div
                      onClick={() => handleFillterPost(item.left.code)}
                      className="flex flex-1 items-center gap-2 hover:bg-gray-100 hover:text-orange-600 rounded-md cursor-pointer border-b border-dashed border-gray-200 pb-1  "
                    >
                      <GrFormNext size={12} color="gray" />
                      <p>{item.left.value}</p>
                    </div>
                    <div
                      onClick={() => handleFillterPost(item.right.code)}
                      className="flex flex-1 items-center gap-2 hover:bg-gray-100 hover:text-orange-600 rounded-md cursor-pointer border-b border-dashed border-gray-200 pb-1  "
                    >
                      {" "}
                      <GrFormNext size={12} color="gray" />
                      <p>{item.right.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default memo(ItemSidebar);
