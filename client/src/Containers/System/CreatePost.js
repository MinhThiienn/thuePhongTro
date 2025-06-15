import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Overview, Address, Loading, Button } from "../../Components";
import { FaCameraRetro } from "react-icons/fa6";
import { apiUpdatePost, apiUpLoadImages } from "../../Services/post";
import icons from "../../Ultils/icon";
import { getCodes, getCodesArea } from "../../Ultils/Common/getCodes";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiCreatePost } from "../../Services/post";
import validate from "../../Ultils/Common/validateField";
import { useDispatch } from "react-redux";
import * as actions from "../../Store/Action";
import { Map } from "../../Components";
import { attention } from "../../Ultils/constant";
const CreatePost = ({ isEdit }) => {
  const { MdDeleteForever } = icons;
  const { dataEdit } = useSelector((state) => state.post);
  const [payload, setpayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || "",
      title: dataEdit?.title || "",
      priceNumber: dataEdit?.priceNumber * Math.pow(10, 6) || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      images: dataEdit?.images?.image
        ? JSON.parse(dataEdit?.images?.image)
        : "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      areaCode: dataEdit?.areaCode || "",
      description: dataEdit?.description
        ? JSON.parse(dataEdit?.description)
        : "",
      target: dataEdit?.overview?.target || "",
      province: dataEdit?.province || "",
    };

    return initData;
  });
  const dispatch = useDispatch();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [invalidFields, setInvalidFields] = useState([]);
  const { prices, areas, categories } = useSelector((state) => state.app);
  useEffect(() => {
    if (dataEdit) {
      let images = JSON.parse(dataEdit?.images?.image);
      images && setImagesPreview(images);
    }
  }, [dataEdit]);

  const { currentUser } = useSelector((state) => state.user);

  const handleFiles = async (e) => {
    setisLoading(true);
    e.stopPropagation();
    let images = [];
    const files = e.target.files;
    const formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );
      const response = await apiUpLoadImages(formData);
      if (response.status === 200)
        images = [...images, response.data.secure_url];
    }
    setisLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
    setpayload((prev) => ({
      ...prev,
      images: [...prev.images, ...images],
    }));
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setpayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };

  const handleSubmit = async () => {
    let priceCodeArr = getCodes(
      +payload.priceNumber / Math.pow(10, 6),
      prices,
      1,
      15
    );
    let priceCode = priceCodeArr[0]?.code;
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 20, 90);
    let areaCode = areaCodeArr[0]?.code;
    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      userId: currentUser.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      target: payload.target || "Tất cả",
      label: `${
        categories?.find((item) => item.code === payload?.categoryCode)?.value
      } ${payload?.address?.split(",")[1]}`,
    };

    const result = validate(finalPayload, setInvalidFields);
    if (result === 0) {
      if (dataEdit && isEdit) {
        finalPayload.postId = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.imagesId = dataEdit?.imagesId;
        finalPayload.overviewId = dataEdit?.overviewId;
        const responce = await apiUpdatePost(finalPayload);
        if (responce?.data.err === 0) {
          Swal.fire({
            title: "Cập nhật tin thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
          resetPayLoad();
          dispatch(actions.resetDataEdit());
        } else {
          Swal.fire({
            title: "Oops! Có lỗi xảy ra",
            text: responce?.data.msg || "Vui lòng thử lại sau",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        const responce = await apiCreatePost(finalPayload);
        if (responce?.data.err === 0) {
          Swal.fire({
            title: "Tạo tin thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
          resetPayLoad();
        } else {
          Swal.fire({
            title: "Oops! Có lỗi xảy ra",
            text: responce?.data.msg || "Vui lòng thử lại sau",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    }
  };

  const resetPayLoad = () => {
    setImagesPreview([]);
    setpayload({
      categoryCode: "",
      title: "",
      priceNumber: 0,
      areaNumber: 0,
      images: "",
      address: "",
      priceCode: "",
      areaCode: "",
      description: "",
      target: "",
      province: "",
    });
    setInvalidFields([]);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-300">
          {isEdit ? "Chỉnh sửa tin đăng" : "Tạo tin đăng mới"}
        </h1>
        {/*  Hiển thị ảnh phóng to có hiệu ứng */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.img
                src={selectedImage}
                alt="Enlarged"
                className="max-w-[90%] max-h-[90%] rounded shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="flex flex-col gap-8 flex-1">
            <Address
              invalidFields={invalidFields}
              payload={payload}
              setpayload={setpayload}
              setInvalidFields={setInvalidFields}
            />
            <Overview
              invalidFields={invalidFields}
              payload={payload}
              setpayload={setpayload}
              setInvalidFields={setInvalidFields}
            />
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Hình ảnh</h2>
              <p className="text-sm text-gray-500 mb-4">
                Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
              </p>

              <label
                htmlFor="file"
                className="cursor-pointer border-2 border-dashed rounded-lg flex flex-col items-center justify-center h-52 bg-white hover:bg-blue-50 border-blue-300 transition"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <FaCameraRetro size={50} className="text-blue-500 mb-2" />
                    <span className="text-blue-700 font-medium">Thêm ảnh</span>
                  </div>
                )}
              </label>

              <input
                type="file"
                id="file"
                hidden
                multiple
                onChange={handleFiles}
              />
              <small className="text-red-500 block w-full">
                {invalidFields.some((item) => item.name === "images") &&
                  invalidFields?.find((item) => item.name === "images")
                    ?.message}
              </small>

              {imagesPreview.length > 0 && (
                <>
                  <h3 className="font-medium text-lg mt-6 mb-2">
                    Ảnh đã chọn (Click vào ảnh đã chọn để xem đầy đủ nhất)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imagesPreview.map((item) => (
                      <div
                        key={item}
                        className="relative w-full aspect-square rounded-lg overflow-hidden shadow-sm border"
                      >
                        <span
                          onClick={() => handleDeleteImage(item)}
                          title="Xóa"
                          className="absolute top-1 right-1 bg-white hover:bg-gray-200 p-1 rounded-full shadow cursor-pointer z-10"
                        >
                          <MdDeleteForever size={24} className="text-red-500" />
                        </span>
                        <img
                          src={item}
                          alt="preview"
                          onClick={() => setSelectedImage(item)}
                          className="w-full h-full object-cover cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <Button
              text={isEdit ? "Cập nhật tin đăng" : "Tạo tin đăng"}
              bgColor={"bg-green-600"}
              textColor={"text-white"}
              onClick={handleSubmit}
            />

            <div className="h-[300px]"></div>
          </div>

          <div className="lg:w-[30%] w-full h-full bg-white rounded-xl shadow-md p-4 flex flex-col text-gray-700">
            <div className="flex-grow">
              <Map address={payload?.address} />
            </div>
            <div className="mt-6 bg-orange-50 border border-orange-300 text-orange-800 rounded-lg p-4 shadow-inner">
              <h4 className="text-xl font-semibold mb-3">Lưu ý tin đăng</h4>
              <ul className="list-disc list-inside space-y-1">
                {attention.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
