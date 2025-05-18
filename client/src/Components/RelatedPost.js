import React, { useEffect, useState } from "react";
import SmItem from "./SmItem";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../Store/Action";
const RelatedPost = () => {
  const dispatch = useDispatch();
  const { newPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(actions.getNewPosts());
  }, []);

  return (
    <div className="w-full bg-white rounded-md shadow-md p-4 ">
      <h3 className="font-semibold text-lg mb-4">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-2 ">
        {newPosts?.length > 0 &&
          newPosts.map((item) => {
            return (
              <SmItem
                key={item?.id}
                title={item?.title}
                price={item?.attributes?.price}
                createdAt={item?.createdAt}
                image={JSON.parse(item?.images?.image)[1]}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RelatedPost;
