import React, { useState } from "react";
import { Select } from "../Containers/Public";
import { useSelector } from "react-redux";
import InputReadOnly from "./InputReadOnly";
import Input from "./Input";

const Overview = ({ payload, setpayload, invalidFields, setInvalidFields }) => {
  const { categories } = useSelector((state) => state.app);
  const { currentUser } = useSelector((state) => state.user);
  const { dataEdit } = useSelector((state) => state.post);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");

  const targets = [
    { code: "Nam", name: "Nam" },
    { code: "Nữ", name: "Nữ" },
    { code: "Tất cả", name: "Tất cả" },
  ];

  const formattedCategories = categories.map((item) => ({
    code: item.code,
    name: item.value,
  }));

  return (
    <div className="px-4 py-6">
      <h2 className="font-semibold text-xl mb-6">Thông tin mô tả</h2>

      <div className="w-full flex flex-col gap-5">
        <div className="w-full sm:w-1/2">
          <Select
            label="Loại chuyên mục"
            options={formattedCategories}
            value={payload.categoryCode}
            setValue={setpayload}
            name="categoryCode"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>

        <Input
          label="Tiêu đề"
          value={payload.title}
          setValue={setpayload}
          name={"title"}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium text-gray-700">
            Nội dung mô tả
          </label>
          <textarea
            id="description"
            rows="6"
            className="w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="Mô tả chi tiết ..."
            value={payload.description}
            onChange={(e) =>
              setpayload((prev) => ({ ...prev, description: e.target.value }))
            }
            onFocus={() => setInvalidFields([])}
          ></textarea>
          <small className="text-red-500 block w-full">
            {invalidFields.some((item) => item.name === "description") &&
              invalidFields?.find((item) => item.name === "description")
                ?.message}
          </small>
        </div>
        <div className="w-full sm:w-1/2">
          <InputReadOnly
            label="Thông tin liên hệ"
            value={
              currentUser?.name || currentUser?.username || "Chưa xác định"
            }
          />
          <InputReadOnly
            label="Điện thoại"
            value={currentUser?.phone || "Chưa cập nhật"}
          />

          <Input
            label="Giá cho thuê"
            unit="Đồng"
            small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 10000000"
            name={"priceNumber"}
            value={payload.priceNumber}
            setValue={setpayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Input
            label="Diện tích"
            unit="m²"
            value={payload.areaNumber}
            setValue={setpayload}
            name={"areaNumber"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />

          <Select
            label="Đối tượng cho thuê"
            options={targets}
            value={payload.target}
            setValue={setpayload}
            name={"target"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
