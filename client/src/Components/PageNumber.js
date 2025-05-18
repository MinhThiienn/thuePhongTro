import React, { memo } from "react";

import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const notActive =
  "w-[46px] h-[48px] bg-white hover:bg-gray-300 hover:text-black rounded-md  flex justify-center items-center";
const Active =
  "w-[46px] h-[48px] bg-[#E13427] text-white hover:opacity:90 hover:text-black rounded-md  flex justify-center items-center";

const PageNumber = ({ text, currentPage, icon, setCurrentPage, type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paramSearch] = useSearchParams();
  let entries = paramSearch.entries();

  const append = (entries) => {
    let param = [];
    paramSearch.append("page", +text);
    for (let entry of entries) {
      param.push(entry);
    }

    let a = {};
    param?.map((i) => {
      a = { ...a, [i[0]]: i[1] };
    });
    return a;
  };

  const handleChangePage = () => {
    if (!(text === "....")) {
      setCurrentPage(+text);

      navigate({
        pathname: location.pathname,
        search: createSearchParams(append(entries)).toString(),
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
