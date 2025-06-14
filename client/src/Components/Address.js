import React, { memo, useEffect, useState } from "react";
import { Select } from "../Containers/Public";
import { apiGetPublicProvince, apiGetPublicDistrict } from "../Services/app";
import InputReadOnly from "./InputReadOnly";
import { useSelector } from "react-redux";
const Address = ({ setpayload, invalidFields, setInvalidFields }) => {
  const { dataEdit } = useSelector((state) => state.post);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    if (!dataEdit?.address) return;
    let addressArr = dataEdit?.address?.split(",");
    const foundProvince =
      provinces?.length > 0 &&
      provinces?.find(
        (item) => item.name === addressArr[addressArr.length - 2]?.trim()
      );

    setProvince(foundProvince || null);
  }, [provinces, dataEdit]);
  useEffect(() => {
    if (!dataEdit?.address) return;

    const addressArr = dataEdit.address.split(",");

    const foundDistrict =
      districts?.length > 0 &&
      districts?.find(
        (item) => item.name === addressArr[addressArr.length - 1]?.trim()
      );

    setDistrict(foundDistrict || null);
  }, [districts, dataEdit]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await apiGetPublicProvince();
      if (response?.status === 200) {
        const formatted = (response.data || []).map((item) => ({
          code: item.code,
          name: item.name,
        }));
        setProvinces(formatted);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!province) {
        setDistricts([]);
        return;
      }

      const response = await apiGetPublicDistrict(province.code);
      if (response?.status === 200) {
        const formatted = (response.data?.districts || []).map((item) => ({
          code: item.code,
          name: item.name,
        }));
        setDistricts(formatted);
      }
    };

    fetchDistricts();
    setDistrict(null);
  }, [province]);

  useEffect(() => {
    setpayload((prev) => ({
      ...prev,
      address: district?.name
        ? ` ${province?.name || ""}, ${district.name}`
        : province?.name || "",
      province: province?.name || "",
    }));
  }, [province, district]);

  return (
    <div>
      <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Select
            invalidFields={invalidFields}
            label="Tỉnh/Thành Phố"
            options={provinces}
            value={province?.code || ""}
            setValue={setProvince}
            labelKey="name"
            valueKey="code"
            setInvalidFields={setInvalidFields}
          />

          <Select
            invalidFields={invalidFields}
            label="Quận/Huyện"
            options={districts}
            value={district?.code || ""}
            setValue={setDistrict}
            labelKey="name"
            valueKey="code"
            setInvalidFields={setInvalidFields}
          />
        </div>
        <InputReadOnly
          label={"Địa chỉ chính xác"}
          value={
            district?.name
              ? `  ${district.name},${province?.name || ""}`
              : province?.name || ""
          }
        />
      </div>
    </div>
  );
};

export default memo(Address);
