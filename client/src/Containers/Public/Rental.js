import React from "react";
import { text } from "../../Ultils/constant";
import { Province, RelatedPost } from "../../Components";
import ListPost from "./ListPost";
import Page from "./Page";
import { formatVietnameseToString } from "../../Ultils/Common/formatVietnameseToString";
import ItemSidebar from "../../Components/itemSidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as actions from "../../Store/Action";
const Rental = () => {
  const { categories, prices, areas } = useSelector((state) => state.app);
  const location = useLocation();

  const [categoryCurrent, setcategoryCurrent] = useState("");

  const [categoryCode, setCategoryCode] = useState("null");
  useEffect(() => {
    const category = categories?.find(
      (item) => `/${formatVietnameseToString(item.value)}` === location.pathname
    );
    setcategoryCurrent(category);
    if (category) {
      setCategoryCode(category.code);
    }
  }, [location]);

  return (
    <div className=" w-full flex flex-col gap-3 ">
      <div>
        <h1 className="text-[28px] font-bold">{categoryCurrent?.header}</h1>
        <p className="text-base text-gray-700">{categoryCurrent?.subheader}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          {" "}
          <ListPost categoryCode={categoryCode} />
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

export default Rental;
