import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RelatedPost, Item } from "../../Components";
import { memo } from "react";
import * as actions from "../../Store/Action";
import { useSearchParams } from "react-router-dom";
import PageFavorite from "./PageFavorite";
const Favorite = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorite);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = +process.env.REACT_APP_LIMIT || 6;

  useEffect(() => {
    dispatch(actions.getFavorites());
  }, [dispatch]);

  useEffect(() => {
    const pageParam = +searchParams.get("page");
    if (pageParam && pageParam !== currentPage) setCurrentPage(pageParam);
    if (!pageParam) setCurrentPage(1);
  }, [searchParams, currentPage]);

  const totalCount = favorites.length;
  const start = (currentPage - 1) * limit;
  const currentFavorites = favorites.slice(start, start + limit);

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">Danh sách yêu thích</h1>
        <p className="text-base text-gray-700">
          {`Bạn có ${totalCount} tin đã thêm vào danh sách yêu thích.`}
        </p>
      </div>

      <div className="w-full flex gap-4">
        <div className="w-[70%] flex flex-col gap-4">
          {currentFavorites.length > 0 ? (
            currentFavorites.map((item) => {
              const post = item?.post || item;
              return (
                <Item
                  key={post.id}
                  id={post.id}
                  address={post.address}
                  attributes={post.attributes}
                  description={
                    post.description ? JSON.parse(post.description).text : ""
                  }
                  images={
                    post.images?.image ? JSON.parse(post.images.image) : []
                  }
                  star={+post.star}
                  title={post.title}
                  user={post.user}
                />
              );
            })
          ) : (
            <p className="text-gray-500">
              Hiện tại bạn chưa có tin nào trong danh sách yêu thích.
            </p>
          )}

          <PageFavorite count={favorites?.length} />
        </div>

        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <RelatedPost />
          <RelatedPost newPost />
        </div>
      </div>
    </div>
  );
};

export default Favorite;
