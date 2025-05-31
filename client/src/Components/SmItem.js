import React from "react";
import moment from "moment";
import "moment/locale/vi";
import icons from "../Ultils/icon";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { path } from "../Ultils/constant";
import { formatVietnameseToString } from "../Ultils/Common/formatVietnameseToString";
const SmItem = ({ title, price, image, createdAt, star, id }) => {
  const { IoStar } = icons;
  const navigate = useNavigate();
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++) {
      stars.push(
        <IoStar key={i} className="star-item" size={18} color="gold" />
      );
    }
    return stars;
  };

  return (
    <div className="w-full flex items-center gap-2  border-b border-gray-300 py-2 ">
      <img
        src={image}
        alt="anh"
        className="w-[65px] object-cover rounded-md h-[65px] flex-none "
      />
      <div className="flex flex-col justify-between w-full flex-auto ">
        <Link
          to={`${path.DETAIL}${formatVietnameseToString(
            title?.replaceAll("/", "")
          )}/${id}`}
        >
          <h4 className="text-blue-600 text-[14px]">
            {" "}
            {handleStar(+star)}
            {`${title?.slice(0, 45)}...`}
          </h4>
        </Link>

        <div className="flex items-center justify-between w-full gap-1">
          <span className="font-medium text-green-600 text-sm"> {price}</span>
          <span className="text-gray-300 text-sm">
            {moment(createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmItem;
