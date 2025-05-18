import React from "react";
import { text } from "../Ultils/dataContact";
import Button from "./Button";

const Contact = () => {
  return (
    <div className=" bg-white rounded-md shadow-md p-4 w-3/5 flex flex-col justify-center items-center gap-6">
      <img
        alt="contact"
        src={text.image}
        className="w-full h-48 object-contain"
      />
      <p>{text.content}</p>
      <div className="flex items-center justify-around w-full">
        {text.contacts.map((item, index) => {
          return (
            <div
              className="flex flex-col  items-center justify-center"
              key={index}
            >
              <span className="text-orange-600 font-semibold">{item.text}</span>
              <span className="text-blue-800 text-[24px] font-semibold">
                {item.phone}
              </span>
              <span className="text-blue-800 text-[24px] font-semibold">
                {item.zalo}
              </span>
            </div>
          );
        })}
      </div>
      <Button
        text="Gửi liên hệ"
        bgColor={"bg-blue-600"}
        textColor={"text-white"}
        px={"px-6"}
      />
    </div>
  );
};

export default Contact;
