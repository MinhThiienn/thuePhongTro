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
    let param = new URLSearchParams();

    // Lặp lại toàn bộ entries cũ
    for (let [key, value] of entries) {
      param.append(key, value);
    }

    // Thêm page mới
    param.set("page", +text);

    // Convert URLSearchParams về object đúng dạng (gộp các key giống nhau vào array)
    const searchParamObj = {};

    for (let [key, value] of param.entries()) {
      if (searchParamObj.hasOwnProperty(key)) {
        // Nếu đã có, thì push thêm
        if (Array.isArray(searchParamObj[key])) {
          searchParamObj[key].push(value);
        } else {
          searchParamObj[key] = [searchParamObj[key], value];
        }
      } else {
        searchParamObj[key] = value;
      }
    }

    return searchParamObj;
  };

  const handleChangePage = () => {
    if (!(text === "....")) {
      setCurrentPage(+text);

      navigate({
        pathname: location?.pathname,
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
