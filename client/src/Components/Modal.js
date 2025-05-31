import React, { useState, useEffect } from "react";
import icons from "../Ultils/icon";
import { getNumbersArea, getNumbersPrice } from "../Ultils/Common/getNumber";
import { getCodes, getCodesArea } from "../Ultils/Common/getCodes";

const { GrFormPreviousLink } = icons;

const Modal = ({
  setisShowModal,
  content,
  name,
  handleSubmit,
  queries,
  arrMinMax,
  defaultText,
}) => {
  const [percent1, setpercent1] = useState(() => {
    if (name === "price") return arrMinMax?.priceArr?.[0] ?? 0;
    if (name === "area") return arrMinMax?.areaArr?.[0] ?? 0;
    return 0;
  });

  const [percent2, setpercent2] = useState(() => {
    if (name === "price") return arrMinMax?.priceArr?.[1] ?? 100;
    if (name === "area") return arrMinMax?.areaArr?.[1] ?? 100;
    return 100;
  });

  const [activedEL, setactivedEL] = useState("");

  useEffect(() => {
    const activeTrack = document.getElementById("track_active");
    if (!activeTrack) return;

    if (percent2 <= percent1) {
      activeTrack.style.left = `${percent2}%`;
      activeTrack.style.right = `${100 - percent1}%`;
    } else {
      activeTrack.style.left = `${percent1}%`;
      activeTrack.style.right = `${100 - percent2}%`;
    }
  }, [percent1, percent2]);

  const handleClickStrack = (e, isNode) => {
    const strackEL = document.getElementById("track");
    const rect = strackEL.getBoundingClientRect();
    let percent =
      typeof isNode === "number"
        ? isNode
        : Math.round(((e.clientX - rect.left) * 100) / rect.width);
    if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
      setpercent1(percent);
    } else {
      setpercent2(percent);
    }
  };

  const convert100toTarget = (percent) => {
    return name === "price"
      ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
      : name === "area"
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
      : 0;
  };

  const convertto100 = (percent) => {
    let target = name === "price" ? 15 : name === "area" ? 90 : 1;
    return Math.floor((percent / target) * 100);
  };

  const handleActive = (code, value) => {
    setactivedEL(code);
    let arrMinMax =
      name === "price" ? getNumbersPrice(value) : getNumbersArea(value);
    if (arrMinMax.length === 1) {
      if (arrMinMax[0] === 1) {
        setpercent1(0);
        setpercent2(convertto100(1));
      }
      if (arrMinMax[0] === 20) {
        setpercent1(0);
        setpercent2(convertto100(20));
      }
      if (arrMinMax[0] === 15 || arrMinMax[0] === 90) {
        setpercent1(100);
        setpercent2(100);
      }
    }
    if (arrMinMax.length === 2) {
      setpercent1(convertto100(arrMinMax[0]));
      setpercent2(convertto100(arrMinMax[1]));
    }
  };

  const handleBFSubmit = (e) => {
    let min = percent1 <= percent2 ? percent1 : percent2;
    let max = percent1 <= percent2 ? percent2 : percent1;
    let arrMinMax =
      percent1 === percent2 && percent1 === 100
        ? [convert100toTarget(min), 999999999]
        : [(convert100toTarget(min), convert100toTarget(max))];
    handleSubmit(
      {
        [`${name}Number`]: arrMinMax,
        [name]: `Từ ${convert100toTarget(min)} ${
          percent1 === percent2 && percent1 === 100
            ? ""
            : `-${convert100toTarget(max)}`
        } ${name === "price" ? "triệu" : "m²"} ${
          percent1 === percent2 && percent1 === 100 ? "trở lên" : ""
        }`,
      },
      e,
      {
        [`${name}Arr`]: [min, max],
      }
    );
  };

  return (
    <div
      onClick={() => setisShowModal(false)}
      className="fixed inset-0 bg-overlay-70 z-20 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setisShowModal(true);
        }}
        className="w-[600px] bg-white rounded-xl shadow-xl h-[550px] relative animate-fade-in"
      >
        <div className="h-[60px] flex items-center px-5 border-b border-gray-200 gap-1 bg-gradient-to-r from-white via-gray-50 to-white shadow-sm rounded-t-xl">
          <button
            className="text-gray-700 hover:text-blue-600 transition duration-200"
            onClick={(e) => {
              e.stopPropagation();
              setisShowModal(false);
            }}
          >
            <GrFormPreviousLink size={32} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
            {name === "category" && "Danh mục cho thuê"}
            {name === "province" && "Chọn tỉnh thành"}
            {name === "price" && "Chọn mức giá"}
            {name === "area" && "Chọn diện tích"}
          </h2>
        </div>

        {(name === "category" || name === "province") && (
          <div className="p-6 flex flex-col space-y-4 overflow-y-auto max-h-[480px]">
            <label
              htmlFor="default"
              className="flex items-center gap-3 cursor-pointer py-2 border-b border-gray-200 hover:bg-gray-100 px-2 rounded-md transition"
            >
              <input
                type="radio"
                name={name}
                id="default"
                checked={!queries[`${name}Code`]}
                value={defaultText}
                onChange={(e) =>
                  handleSubmit(
                    { [name]: defaultText, [`${name}Code`]: null },
                    e
                  )
                }
              />
              <span className="text-gray-700 font-medium">{defaultText}</span>
            </label>

            {content?.map((item) => (
              <label
                key={item.code}
                htmlFor={item.code}
                className="flex items-center gap-3 cursor-pointer py-2 border-b border-gray-200 hover:bg-gray-100 px-2 rounded-md transition"
              >
                <input
                  type="radio"
                  name={name}
                  id={item.code}
                  value={item.value.code}
                  checked={item.code === queries[`${name}Code`]}
                  onChange={(e) =>
                    handleSubmit(
                      { [name]: item.value, [`${name}Code`]: item.code },
                      e
                    )
                  }
                />
                <span className="text-gray-700 font-medium">{item.value}</span>
              </label>
            ))}
          </div>
        )}

        {(name === "price" || name === "area") && (
          <div className="p-12 py-20">
            <div className="flex items-center justify-center flex-col relative">
              <div className="z-30 absolute top-[-65px] font-bold text-xl text-orange-600 border-2 border-orange-500 rounded-xl px-4 py-2 bg-white shadow-md">
                {percent1 === 100 && percent2 === 100
                  ? `Trên ${convert100toTarget(percent1)} ${
                      name === "price" ? "triệu" : "m²"
                    } +`
                  : `Từ ${
                      percent1 <= percent2
                        ? convert100toTarget(percent1)
                        : convert100toTarget(percent2)
                    } - ${
                      percent2 >= percent1
                        ? convert100toTarget(percent2)
                        : convert100toTarget(percent1)
                    } ${name === "price" ? "triệu" : "m²"}`}
              </div>

              <div
                onClick={handleClickStrack}
                id="track"
                className="slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full"
              ></div>
              <div
                onClick={handleClickStrack}
                id="track_active"
                className="slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-600 rounded-full"
              ></div>
              <input
                type="range"
                max={"100"}
                min={"0"}
                step={"1"}
                value={percent1}
                onChange={(e) => {
                  setpercent1(+e.target.value);
                  activedEL && setactivedEL("");
                }}
                className="w-full appearance-none pointer-events-none absolute top-0.5 bottom-0"
              />
              <input
                type="range"
                max={"100"}
                min={"0"}
                step={"1"}
                className="w-full appearance-none pointer-events-none absolute top-0.5 bottom-0"
                onChange={(e) => {
                  setpercent2(+e.target.value);
                  activedEL && setactivedEL("");
                }}
                value={percent2}
              />
              <div className="absolute z-30 top-6 left-0 right-0 flex items-center justify-between ">
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickStrack(e, 0);
                  }}
                >
                  0
                </span>
                <span
                  className="m-[-12px] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickStrack(e, 100);
                  }}
                >
                  {name === "price"
                    ? "Trên 15 triệu"
                    : name === "area"
                    ? "Trên 90m²"
                    : ""}
                </span>
              </div>
            </div>

            <div className="mt-24">
              <div className="grid grid-cols-3 gap-4">
                {content?.map((el) => (
                  <button
                    key={el.code}
                    onClick={() => handleActive(el.code, el.value)}
                    className={`p-2 text-sm border rounded-md ${
                      activedEL === el.code
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {el.value}
                  </button>
                ))}
              </div>
              <button
                onClick={handleBFSubmit}
                className="mt-6 w-full py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
              >
                Áp dụng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
