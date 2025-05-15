import React, { memo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const notActive =
  "w-[46px] h-[48px] bg-white hover:bg-gray-300 hover:text-black rounded-md  flex justify-center items-center";
const Active =
  "w-[46px] h-[48px] bg-[#E13427] text-white hover:opacity:90 hover:text-black rounded-md  flex justify-center items-center";

const PageNumber = ({ text, currentPage, icon, setCurrentPage, type }) => {
  const navigate = useNavigate();
  const handleChangePage = () => {
    if (!(text === "....")) {
      setCurrentPage(+text);
      navigate({
        pathname: "/",
        search: createSearchParams({
          page: text,
        }).toString(),
      });
    }
  };
  return (
    <div
      className={
        +text === +currentPage
          ? `${Active} ${text === "...." ? "cursor-text" : "cursor-pointer"}`
          : `${notActive} ${
              text === "... ." ? "cursor-text" : "cursor-pointer"
            }`
      }
      onClick={handleChangePage}
    >
      {icon || text}
    </div>
  );
};

export default memo(PageNumber);
