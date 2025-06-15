import React, { useEffect, useState } from "react";
import { Button, Item } from "../../Components";
import { getPostsLimit } from "../../Store/Action/post";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ListPost = ({ categoryCode }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { posts } = useSelector((state) => state.post);
  const [sort, setSort] = useState(0);

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamObj = {};

    params.forEach(([key, value]) => {
      if (searchParamObj.hasOwnProperty(key)) {
        if (Array.isArray(searchParamObj[key])) {
          searchParamObj[key].push(value);
        } else {
          searchParamObj[key] = [searchParamObj[key], value];
        }
      } else {
        searchParamObj[key] = value;
      }
    });

    if (categoryCode) searchParamObj.categoryCode = categoryCode;
    if (sort === 1) searchParamObj.order = ["createdAt", "DESC"];
    if (sort === 0) searchParamObj.order = ["star", "DESC"];
    dispatch(getPostsLimit(searchParamObj));
  }, [searchParams, categoryCode, sort]);

  return (
    <div className="w-full border p-4 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4  pb-2">
        <h4 className="text-2xl font-bold text-gray-800">Danh sách tin đăng</h4>
        {/* <span className="text-sm text-gray-500 italic">
          Cập nhật: 12:05 25/08/2025
        </span> */}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-gray-700 font-medium">Sắp xếp:</span>
        <button
          onClick={() => setSort(0)}
          className={`px-4 py-1 rounded-md border transition-all duration-200 
            ${
              sort === 0
                ? "bg-red-100 text-red-600 border-red-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Mặc định
        </button>
        <button
          onClick={() => setSort(1)}
          className={`px-4 py-1 rounded-md border transition-all duration-200 
            ${
              sort === 1
                ? "bg-red-100 text-red-600 border-red-300"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Mới nhất
        </button>
      </div>

      <div className="grid gap-4">
        {posts?.length > 0 ? (
          posts.map((item) => (
            <Item
              key={item?.id}
              address={item?.address}
              attributes={item?.attributes}
              description={JSON.parse(item?.description)}
              images={JSON.parse(item?.images?.image)}
              star={+item?.star}
              title={item?.title}
              user={item?.user}
              id={item?.id}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            Không có tin nào được tìm thấy.
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPost;
