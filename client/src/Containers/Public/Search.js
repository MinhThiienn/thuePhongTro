import React, { useCallback, useState, useEffect } from "react";
import { Modal, Searchitem } from "../../Components";
import icons from "../../Ultils/icon";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../Store/Action";
import {
  Navigate,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import { path } from "../../Ultils/constant";
import { location } from "../../Ultils/constant";
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
  const location = useLocation();
  const [content, setcontent] = useState([]);
  const [name, setName] = useState();
  const [queries, setQueries] = useState({});
  const [arrMinMax, setarrMinMax] = useState([]);
  const [defaultText, setdefaultText] = useState("");
  const navigate = useNavigate();
  const handleShowModal = (content, name, defaultText) => {
    setisShowModal(true);
    setcontent(content);
    setName(name);
    setdefaultText(defaultText);
  };
  useEffect(() => {
    if (!location?.pathname.includes(path.SEARCH)) {
      setarrMinMax({});
      setQueries({});
    }
  }, [location.pathname]);

  const handleSubmit = useCallback(
    (query, e, arrMinMax) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      setisShowModal(false);
      arrMinMax && setarrMinMax((prev) => ({ ...prev, ...arrMinMax }));
    },
    [isShowModal, queries]
  );

  const handleSearch = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Number") || item[0].includes("Code"))
      .filter((item) => item[1]);
    let queryCodesObj = {};
    queryCodes.forEach((item) => {
      queryCodesObj[item[0]] = item[1];
    });
    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") && !item[0].includes("Number")
    );

    let queryTextObj = {};
    queryText.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });

    let titleSearch = `${
      queryTextObj.category ? queryTextObj.category : "Cho thuê Phòng trọ"
    } ${
      queryTextObj.province
        ? queryTextObj.province === defaultText
          ? queryTextObj.province
          : `Tỉnh ${queryTextObj.province}`
        : ""
    } ${queryTextObj.price ? `giá ${queryTextObj.price}` : ""} ${
      queryTextObj.area ? `Diện tích ${queryTextObj.area}` : ""
    }`;

    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams(queryCodesObj).toString(),
      },
      { state: { titleSearch } }
    );
  };

  return (
    <>
      {" "}
      <div className=" p-[10px] w-3/5  bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2">
        <span
          className=" flex-1 cursor-pointer"
          onClick={() => handleShowModal(categories, "category", "Tìm Tất Cả")}
        >
          {" "}
          <Searchitem
            text={queries.category}
            defaultText={"Phòng trọ, nhà trọ"}
            iconBefore={<FaHouseChimney />}
            iconAfter={<GrFormNext />}
          />
        </span>
        <span
          className=" flex-1 cursor-pointer"
          onClick={() => handleShowModal(provinces, "province", "Toàn Quốc")}
        >
          <Searchitem
            iconAfter={<GrFormNext />}
            text={queries.province}
            defaultText={"Toàn Quốc"}
            iconBefore={<IoLocationOutline />}
          />
        </span>
        <span
          className=" flex-1 cursor-pointer"
          onClick={() => handleShowModal(prices, "price", "Chọn Giá")}
        >
          {" "}
          <Searchitem
            iconAfter={<GrFormNext />}
            text={queries.price}
            defaultText="Chọn Giá"
            iconBefore={<FaMoneyBillWave />}
          />
        </span>
        <span
          className=" flex-1 cursor-pointer"
          onClick={() => handleShowModal(areas, "area", "Chọn Diện Tích")}
        >
          <Searchitem
            iconAfter={<GrFormNext />}
            text={queries.area}
            defaultText="Chọn Diện Tích"
            iconBefore={<FaCropSimple />}
          />
        </span>

        <button
          type="button"
          onClick={() => {
            handleSearch();
          }}
          className=" outline-none px-4 py-2 flex-1 bg-secondary1 text-[13.3px] flex items-center justify-center gap-2 text-white font-medium"
        >
          <IoMdSearch />
          Tìm Kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
          setisShowModal={setisShowModal}
          content={content}
          name={name}
          handleSubmit={handleSubmit}
          queries={queries}
          arrMinMax={arrMinMax}
          defaultText={defaultText}
        />
      )}
    </>
  );
};

export default Search;
