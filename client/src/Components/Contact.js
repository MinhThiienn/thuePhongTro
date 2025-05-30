import React from "react";
import { text } from "../Ultils/dataContact";
import Button from "./Button";

const Contact = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-8 w-3/5  mx-auto flex flex-col items-center gap-8">
      <img
        alt="contact"
        src={text.image}
        className="w-full h-56 object-contain rounded-xl"
      />

      <p className="text-center text-gray-700 text-base leading-relaxed">
        {text.content}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {text.contacts.map((item, index) => (
          <div
            className="flex flex-col items-center text-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            key={index}
          >
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-wider">
              {item.text}
            </span>
            <span className="text-blue-800 text-lg font-bold mt-2">
              {item.phone}
            </span>
            <span className="text-blue-800 text-lg font-bold">{item.zalo}</span>
          </div>
        ))}
      </div>

      <Button
        text="📨 Gửi liên hệ"
        bgColor="bg-blue-600 hover:bg-blue-700"
        textColor="text-white"
        px="px-8"
      />
    </div>
  );
};

export default Contact;
