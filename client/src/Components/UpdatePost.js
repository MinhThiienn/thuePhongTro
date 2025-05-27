import React from "react";
import { CreatePost } from "../Containers/System";
import { CgCloseO } from "react-icons/cg";

const UpdatePost = ({ setIsEdit }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={() => setIsEdit(false)}
    >
      <div
        className="relative bg-white max-w-[1100px] w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 ring-1 ring-gray-200 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className=" absolute top-4 right-4  text-gray-500 hover:text-red-600    transition-colors duration-200   p-2 rounded-full  focus:outline-none focus:ring-2 focus:ring-red-400focus:ring-offset-1 shadow-md  hover:shadow-lg  active:scale-95 "
          onClick={() => setIsEdit(false)}
          aria-label="Close"
          type="button"
        >
          <CgCloseO size={38} />
        </button>

        <CreatePost isEdit />
      </div>
    </div>
  );
};

export default UpdatePost;
