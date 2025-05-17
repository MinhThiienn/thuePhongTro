import React from "react";

import { text } from "../../Ultils/constant";
import { Province } from "../../Components";
import ListPost from "./ListPost";
import Page from "./Page";

import ItemSidebar from "../../Components/itemSidebar";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../Store/Action";
import { useEffect } from "react";

function HomePage() {
  const { categories, prices, areas } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getArea());
  }, []);

  return (
    <div className=" w-full flex flex-col gap-3 border border-red-500">
      <div>
        <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          {" "}
          <ListPost />
          <Page />
          <div className="h-[500px]"></div>
        </div>

        <div className="w-[30%] border border-green-500 flex flex-col gap-4 justify-start items-center">
          <ItemSidebar content={categories} title={"Danh sách cho thuê"} />
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
        </div>
      </div>
    </div>
  );
}

export default HomePage;
