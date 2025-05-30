import { React, useState } from "react";
import { memo } from "react";
import icons from "../Ultils/icon";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../Ultils/Common/formatVietnameseToString";
import { path } from "../Ultils/constant";

const indexs = [0, 1, 2, 3];
const { IoStar, GoHeart, GoHeartFill, BsBookmarkStarFill } = icons;

const Item = ({
  images,
  user,
  title,
  description,
  attributes,
  address,
  star,
  id,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);

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
    <div className="w-full flex gap-4 border-t py-6 border-gray-200">
      {/* Hình ảnh */}
      <Link
        to={`${path.DETAIL}${formatVietnameseToString(
          title?.replaceAll("/", "")
        )}/${id}`}
        className="w-2/5 flex flex-wrap gap-[3px] relative group"
      >
        {images.length > 0 &&
          images
            .filter((_, index) => indexs.includes(index))
            .map((i, index) => (
              <img
                key={index}
                src={i}
                alt="preview"
                className="w-[48%] h-[120px] object-cover rounded-md shadow-md"
              />
            ))}
        <span className="absolute left-2 bottom-4 bg-black bg-opacity-60 text-white px-2 py-[1px] text-xs rounded">
          {`${images.length} ảnh`}
        </span>
        <span
          className="absolute right-2 bottom-2 cursor-pointer"
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? (
            <GoHeartFill size={26} color="red" />
          ) : (
            <GoHeart size={26} className="text-white" />
          )}
        </span>
      </Link>

      {/* Nội dung */}
      <div className="w-3/5 flex flex-col justify-between">
        {/* Tiêu đề và bookmark */}
        <Link
          to={`${path.DETAIL}${formatVietnameseToString(
            title?.replaceAll("/", "")
          )}/${id}`}
          className="flex justify-between items-start"
        >
          <h2 className="text-lg font-semibold text-red-600 flex gap-1 flex-wrap">
            {handleStar(+star)}
            <span>{title}</span>
          </h2>
          <BsBookmarkStarFill size={22} className="text-orange-500" />
        </Link>

        {/* Thông tin giá, diện tích, địa chỉ */}
        <div className="flex items-center justify-between mt-2 text-sm font-medium text-gray-600">
          <span className="text-green-600 whitespace-nowrap overflow-hidden text-ellipsis">
            {attributes?.price}
          </span>
          <span>{attributes?.acreage}</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {address?.split(",").slice(-2).join(", ")}
          </span>
        </div>

        {/* Mô tả */}
        <p className="text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden">
          {" "}
          {description}
        </p>
        {/* Thông tin người dùng và nút */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2">
            <img
              src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
              alt="avatar"
              className="w-[32px] h-[32px] object-cover rounded-full shadow"
            />
            <p className="text-sm font-medium">{user?.name}</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md transition">
              Gọi {user?.phone}
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-100 text-sm px-3 py-1 rounded-md transition">
              Nhắn Zalo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
