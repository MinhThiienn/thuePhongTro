import { React, use, useState } from "react";
import { memo } from "react";
import icons from "../Ultils/icon";
import { useNavigate, Link } from "react-router-dom";
import { formatVietnameseToString } from "../Ultils/Common/formatVietnameseToString";
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
        <IoStar key={i} className="star-item" size={18} color="yellow" />
      );
    }
    return stars;
  };
  const navigate = useNavigate();
  // console.log("star", handleStar(5));
  return (
    <div className="w-full flex border-t border-orange-600 py-4 ">
      <Link
        to={`chi-tiet/${formatVietnameseToString(title)}/${id}`}
        className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer"
      >
        {images.length > 0 &&
          images
            .filter((i, index) => indexs.some((i) => i === index))
            ?.map((i, index) => {
              return (
                <img
                  key={index}
                  src={i}
                  alt="preview"
                  className="w-[47%] h-[120px] object-cover"
                />
              );
            })}
        <span className=" bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4">
          {`${images.length} ảnh`}
        </span>
        <span
          className=" absolute right-5 bottom-1 text-white"
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseOut={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? (
            <GoHeartFill size={26} color="red" />
          ) : (
            <GoHeart size={26} />
          )}
        </span>
      </Link>
      <div className="w-3/5">
        <div className="flex justify-between gap-4 w-full">
          <div className=" text-red-600 font-medium ">
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((star, number) => {
                return <span key={number}>{star}</span>;
              })}
            {title}
          </div>
          <div className="w-[10%] flex justify-end ">
            {" "}
            <BsBookmarkStarFill size={24} color="orange" />
          </div>
        </div>
        <div className="my-2 flex items-center justify-between gap-2">
          <span className="font-bold  text-green-600 flex-3 whitespace-nowrap overflow-hidden text-ellipsis">
            {attributes?.price}
          </span>
          <span className="flex-1">{attributes?.acreage}</span>
          <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis">
            {address.split(",").slice(-2).join(", ")}
          </span>
        </div>
        <p className="text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden">
          {" "}
          {description}
        </p>
        <div className="flex items-center my-5 *: justify-between">
          <div className="flex items-center">
            {" "}
            <img
              src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
              alt="avatar"
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <p>{user?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="bg-blue-700 text-white p-1 rounded-md"
            >
              {`Gọi ${user?.phone}`}
            </button>
            <button
              type="button"
              className="text-blue-700 px-1 rounded-md border border-blue-700"
            >
              Nhắn zalo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
