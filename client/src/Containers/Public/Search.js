import React from "react";
import { Searchitem } from "../../Components";
import icons from "../../Ultils/icon";

const {
  FaHouseChimney,
  GrFormNext,
  IoLocationOutline,
  FaMoneyBillWave,
  FaCropSimple,
  IoMdSearch,
} = icons;
const Search = () => {
  return (
    <div className=" p-[10px] bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2">
      <Searchitem
        text="Phòng trọ, nhà trọ"
        iconBefore={<FaHouseChimney />}
        iconAfter={<GrFormNext />}
        font
      />
      <Searchitem
        iconAfter={<GrFormNext />}
        text="Toàn Quốc"
        iconBefore={<IoLocationOutline />}
      />
      <Searchitem
        iconAfter={<GrFormNext />}
        text="Chọn Giá"
        iconBefore={<FaMoneyBillWave />}
      />
      <Searchitem
        iconAfter={<GrFormNext />}
        text="Chọn Diện Tích"
        iconBefore={<FaCropSimple />}
      />
      <button
        type="button"
        className=" outline-none px-4 py-2 w-full bg-secondary1 text-[12.3px] flex items-center justify-center gap-2 text-white font-medium"
      >
        <IoMdSearch />
        Tìm Kiếm
      </button>
    </div>
  );
};

export default Search;
