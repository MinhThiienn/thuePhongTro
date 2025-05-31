import React, { useEffect, useState } from "react";
import SmItem from "./SmItem";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../Store/Action";
const RelatedPost = ({ newPost }) => {
  const dispatch = useDispatch();
  const { newPosts, outStandingPosts } = useSelector((state) => state.post);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    newPost
      ? dispatch(actions.getNewPosts())
      : dispatch(actions.getOutStandingPosts());
  }, []);

  useEffect(() => {
    newPost ? setPosts(newPosts) : setPosts(outStandingPosts);
  }, [outStandingPosts, newPosts]);

  return (
    <div className="w-full bg-white rounded-md shadow-md p-4 ">
      <h3 className="font-semibold text-lg mb-4">
        {newPost ? "Tin mới đăng" : "Tin nổi bật"}
      </h3>
      <div className="w-full flex flex-col gap-2 ">
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
              <SmItem
                key={item?.id}
                title={item?.title}
                price={item?.attributes?.price}
                createdAt={item?.createdAt}
                image={JSON.parse(item?.images?.image)[1]}
                star={+item?.star}
                id={item?.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RelatedPost;
