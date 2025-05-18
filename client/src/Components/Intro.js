import React from "react";
import { text } from "../Ultils/dataIntro";
import icons from "../Ultils/icon";
import Button from "./Button";
import { useSelector } from "react-redux";
import item from "./item";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../Ultils/Common/formatVietnameseToString";
const Intro = () => {
  const { IoStar } = icons;
  const star = [1, 2, 3, 4, 5];
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="w-3/5 bg-white rounded-md shadow-md p-4 items-center flex flex-col justify-center gap-4 ">
      <h3 className="font-bold text-lg">{text.title}</h3>
      <p className="text-gray-800 text-center my-4">
        {text.description}
        <span className="text-link">
          {categories?.length > 0 &&
            categories.map((item) => {
              return (
                <Link
                  to={`/${formatVietnameseToString(item.value)}`}
                  key={item.code}
                  className="text-blue-500  font-medium hover:text-orange-600"
                >
                  {`${item.value.toLowerCase()}, `}
                </Link>
              );
            })}
        </span>
        {text.description2}
      </p>
      <div className="flex items-center justify-around w-full">
        {text.statistic.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <h4 className="font-bold text-lg">{item.value}</h4>
              <p className="text-gray-700">{item.name}</p>
            </div>
          );
        })}
      </div>
      <h3 className="font-bold text-lg py-2">{text.price}</h3>
      <div className="flex items-center gap-1 justify-center">
        {star.map((item) => {
          return (
            <span key={item}>
              <IoStar size={24} color={"yellow"} />
            </span>
          );
        })}
      </div>
      <p className="text-gray-600 italic text-center">{text.comment}</p>
      <span className="text-gray-700">{text.author}</span>
      <h3 className="font-bold text-lg py-2">{text.question}</h3>
      <p>{text.answer}</p>
      <Button
        text="Đăng tin ngay"
        bgColor="bg-secondary2"
        textColor="text-white"
        px={"px-6"}
      />
      <div className=" h-24"></div>
    </div>
  );
};

export default Intro;
