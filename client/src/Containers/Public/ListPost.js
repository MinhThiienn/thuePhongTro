import React, { useEffect } from "react";
import { Button, Item } from "../../Components";
import { getPostsLimit } from "../../Store/Action/post";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ListPost = ({}) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamObj = {};
    params?.map((i) => {
      searchParamObj = { ...searchParamObj, [i[0]]: i[1] };
    });
    console.log("searchParamObj", searchParamObj);
    dispatch(getPostsLimit(searchParamObj));
  }, [searchParams]);

  return (
    <div className="w-full border p-2 bg-white shadow-md rounded-md px-6">
      <div className=" flex items-center justify-between my-3">
        <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
        <span> Cập nhật: 12:05 25/08/2025 </span>
      </div>
      <div className="flex items-center gap-2 my-2">
        <span>Sắp xếp:</span>
        <Button text={"Mặc định"} bgColor={"bg-gray-200"} />
        <Button text={"Mới nhất"} bgColor={"bg-gray-200"} />
      </div>
      <div className="items">
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
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
            );
          })}
      </div>
    </div>
  );
};

export default ListPost;
