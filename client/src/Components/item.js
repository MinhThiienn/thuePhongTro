import React, { useState, useEffect, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import icons from "../Ultils/icon";
import { formatVietnameseToString } from "../Ultils/Common/formatVietnameseToString";
import { path } from "../Ultils/constant";
import * as actions from "../Store/Action/favorite";
import anon from "../assets/anon.png";
import { blobToBase64 } from "../Ultils/toBase64";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const { IoStar, GoHeart, GoHeartFill, BsBookmarkStarFill } = icons;
const indexs = [0, 1, 2, 3];

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
  const [avatarBase64, setAvatarBase64] = useState(null);
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorite);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.postId === id));
  }, [favorites, id]);

  useEffect(() => {
    const convertAvatar = async () => {
      if (user?.avatar) {
        try {
          const base64 = await blobToBase64(user.avatar);
          setAvatarBase64(base64);
        } catch (error) {
          console.error("Lỗi khi chuyển avatar sang base64:", error);
          setAvatarBase64(null);
        }
      }
    };
    convertAvatar();
  }, [user]);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      Swal.fire({
        title: "Bạn chưa đăng nhập!",
        text: "Đăng nhập để tiếp tục?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Đăng nhập",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (isFavorite) {
      dispatch(actions.removeFavorite(id)); // <- truyền id thay vì favoriteId
    } else {
      dispatch(actions.addFavorite(id));
    }
  };

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
      <div className="w-2/5 flex flex-wrap gap-[3px] relative group">
        <Link
          to={`${path.DETAIL}${formatVietnameseToString(
            title?.replaceAll("/", "")
          )}/${id}`}
          className="w-full flex flex-wrap gap-[3px]"
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
        </Link>

        <span
          className="absolute right-2 bottom-2 cursor-pointer"
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
          onClick={handleToggleFavorite}
        >
          {isFavorite || isHoverHeart ? (
            <GoHeartFill size={26} color="red" />
          ) : (
            <GoHeart size={26} className="text-white" />
          )}
        </span>
      </div>

      <div className="w-3/5 flex flex-col justify-between">
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

        <div className="flex items-center justify-between mt-2 text-sm font-medium text-gray-600">
          <span className="text-green-600 whitespace-nowrap overflow-hidden text-ellipsis">
            {attributes?.price}
          </span>
          <span>{attributes?.acreage}</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {address?.split(",").slice(-2).join(", ")}
          </span>
        </div>

        <p className="text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden">
          {description}
        </p>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2">
            <img
              src={avatarBase64 || anon}
              alt="avatar"
              className="w-[32px] h-[32px] object-cover rounded-full shadow"
            />
            <p className="text-sm font-medium">{user?.name}</p>
          </div>
          <div className="flex gap-2">
            <a
              href={`tel:${user?.phone}`}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md transition"
            >
              Gọi {user?.phone}
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://zalo.me/${user?.zalo}`}
              className="border border-blue-600 text-blue-600 hover:bg-blue-100 text-sm px-3 py-1 rounded-md transition"
            >
              Nhắn Zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
