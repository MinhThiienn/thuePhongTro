import React from "react";
import { text } from "../Ultils/dataIntro";
import icons from "../Ultils/icon";
import Button from "./Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../Ultils/Common/formatVietnameseToString";

const Intro = () => {
  const { IoStar } = icons;
  const star = [1, 2, 3, 4, 5];
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="bg-white rounded-3xl shadow-md p-8 w-3/5  mx-auto flex flex-col items-center gap-6">
      <h3 className="font-bold text-2xl text-center text-gray-800">
        {text.title}
      </h3>

      <p className="text-gray-700 text-center text-base leading-relaxed">
        {text.description}
        <span className="text-link font-medium">
          {categories?.length > 0 &&
            categories.map((item) => (
              <Link
                to={`/${formatVietnameseToString(item.value)}`}
                key={item.code}
                className="text-blue-600 hover:text-orange-500 transition-colors"
              >
                {`${item.value.toLowerCase()}, `}
              </Link>
            ))}
        </span>
        {text.description2}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-4">
        {text.statistic.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <h4 className="font-bold text-xl text-blue-700">{item.value}</h4>
            <p className="text-gray-600 text-sm">{item.name}</p>
          </div>
        ))}
      </div>

      <h3 className="font-bold text-xl py-2 text-center text-secondary2">
        {text.price}
      </h3>

      <div className="flex items-center gap-1 justify-center">
        {star.map((item) => (
          <IoStar key={item} size={24} className="text-yellow-400" />
        ))}
      </div>

      <p className="text-gray-500 italic text-center max-w-xl">
        “{text.comment}”
      </p>
      <span className="text-gray-700 font-medium">{text.author}</span>

      <h3 className="font-bold text-lg pt-6 text-center">{text.question}</h3>
      <p className="text-center text-gray-700">{text.answer}</p>

      <Button
        text="📢 Đăng tin ngay"
        bgColor="bg-secondary2 hover:bg-secondary1"
        textColor="text-white"
        px="px-8"
      />

      <div className="h-16" />
    </div>
  );
};

export default Intro;
