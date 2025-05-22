import React from "react";
import { Province, RelatedPost } from "../../Components";
import ListPost from "./ListPost";
import Page from "./Page";
import { formatVietnameseToString } from "../../Ultils/Common/formatVietnameseToString";
import ItemSidebar from "../../Components/itemSidebar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SearchDetail = () => {
  const { prices, areas } = useSelector((state) => state.app);
  const location = useLocation();
  return (
    <div className=" w-full flex flex-col gap-3 ">
      <div>
        <h1 className="text-[28px] font-bold">
          {location.state?.titleSearch || "Kết quả tìm kiếm"}
        </h1>
        <p className="text-base text-gray-700">{`${
          location.state?.titleSearch || ""
        } phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi
        `}</p>
      </div>

      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          {" "}
          <ListPost />
          <Page />
        </div>

        <div className="w-[30%]  flex flex-col gap-4 justify-start items-center">
          <ItemSidebar
            content={prices}
            isDouble={true}
            title={"Xem theo giá"}
            type={"priceCode"}
          />
          <ItemSidebar
            content={areas}
            isDouble={true}
            title={"Xem theo diện tích"}
            type={"areaCode"}
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default SearchDetail;
