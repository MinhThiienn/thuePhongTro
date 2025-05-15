import React from "react";

import { text } from "../../Ultils/constant";
import { Province } from "../../Components";
import ListPost from "./ListPost";
import Page from "./Page";
import { useSearchParams } from "react-router-dom";
import ItemSidebar from "../../Components/itemSidebar";
import { useSelector } from "react-redux";

function HomePage() {
  const [params] = useSearchParams();
  const { categories } = useSelector((state) => state.app);
  console.log(categories);

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
          <ListPost page={params.get("page")} />
          <Page page={params.get("page")} />
          <div className="h-[500px]"></div>
        </div>

        <div className="w-[30%] border border-green-500 flex flex-col gap-4 justify-start items-center">
          <ItemSidebar content={categories} title={"Danh sách cho thuê"} />
          <ItemSidebar title={"Xem theo giá"} />
          <ItemSidebar title={"Xem theo diện tích"} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
