import React from "react";
import icons from "../Ultils/icon";
const { GrFormPreviousLink } = icons;

const Modal = ({ setisShowModal, content, name }) => {
  return (
    <div
      onClick={(e) => {
        setisShowModal(false);
      }}
      className=" fixed top-0 bottom-0 left-0 right-0 bg-overlay-70 z-20 flex items-center justify-center"
    >
      {" "}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setisShowModal(true);
        }}
        className="w-1/3 bg-white rounded-md"
      >
        <div className="h-[45px] flex items-center px-2 border-b border-gray-300">
          <span
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setisShowModal(false);
            }}
          >
            <GrFormPreviousLink size={34} />
          </span>
        </div>
        <div className="p-4 flex flex-col ">
          {content?.map((item) => {
            return (
              <span
                key={item.code}
                className="py-2 flex gap-2 items-center border-b border-gray-300"
              >
                <input type="radio" name={name} value={item.value.code} />
                <label htmlFor={item.code}>{item.value}</label>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Modal;
