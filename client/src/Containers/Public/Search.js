import React, { useState } from "react";
import { Modal, Searchitem } from "../../Components";
import icons from "../../Ultils/icon";
import { useSelector } from "react-redux";

const {
  FaHouseChimney,
  GrFormNext,
  IoLocationOutline,
  FaMoneyBillWave,
  FaCropSimple,
  IoMdSearch,
} = icons;
const Search = () => {
  const [isShowModal, setisShowModal] = useState(false);
  const { prices, areas, provinces, categories } = useSelector(
    (state) => state.app
  );
  const [content, setcontent] = useState([]);
  const [name, setName] = useState();
  const handleShowModal = (content, name) => {
    setisShowModal(true);
    setcontent(content);
    setName(name);
  };
  return (
    <>
      {" "}
      <div className=" p-[10px] w-3/5  bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2">
        <span
          className=" flex-1 cursor-pointer"
          onClick={() => handleShowModal(categories, "category")}
        >
          {" "}
          <Searchitem
            text="Phòng trọ, nhà trọ"
            iconBefore={<FaHouseChimney />}
            iconAfter={<GrFormNext />}
          />
        </span>
        <span
          className=" flex-1 cursor-pointer"
          onClick={() => handleShowModal(provinces, "province")}
        >
          <Searchitem
            iconAfter={<GrFormNext />}
            text="Toàn Quốc"
            iconBefore={<IoLocationOutline />}
          />
        </span>
        <span
          className=" flex- cursor-pointer"
          onClick={() => handleShowModal(prices, "price")}
        >
          {" "}
          <Searchitem
            iconAfter={<GrFormNext />}
            text="Chọn Giá"
            iconBefore={<FaMoneyBillWave />}
          />
        </span>
        <span
          className=" flex-1 cursor-pointer"
          onClick={() => handleShowModal(areas, "area")}
        >
          <Searchitem
            iconAfter={<GrFormNext />}
            text="Chọn Diện Tích"
            iconBefore={<FaCropSimple />}
          />
        </span>

        <button
          type="button"
          className=" outline-none px-4 py-2 flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium"
        >
          <IoMdSearch />
          Tìm Kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal setisShowModal={setisShowModal} content={content} name={name} />
      )}
    </>
  );
};

export default Search;
