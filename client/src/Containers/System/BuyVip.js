import React, { useState } from "react";
import { apiBuyVIP, apiCancelVIP } from "../../Services/user";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../Store/Action/user";
import Swal from "sweetalert2";
import qr from "../../assets/QRTech.jpg";

const BuyVIP = () => {
  const [packageId, setPackageId] = useState("1");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleBuy = async () => {
    try {
      const res = await apiBuyVIP(packageId);
      if (res?.data?.err === 0) {
        Swal.fire("Thành công!", res?.data?.msg, "success");
        dispatch(getCurrentUser()); // refresh thông tin tài khoản
      } else {
        Swal.fire("Lỗi!", res?.data?.msg || "Không mua được gói.", "error");
      }
    } catch (error) {
      Swal.fire("Lỗi!", "Có lỗi khi mua gói.", "error");
    }
  };

  const handleCancelVIP = async () => {
    Swal.fire({
      title: "Xác nhận hủy gói VIP?",
      text: "Nếu gói của bạn còn thời gian, bạn sẽ được hoàn 50% giá trị gói.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đồng ý hủy",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiCancelVIP();

          if (res?.data?.err === 0) {
            Swal.fire("Thành công!", res?.data?.msg, "success");
            dispatch(getCurrentUser()); // refresh thông tin tài khoản
          } else {
            Swal.fire("Lỗi!", res?.data?.msg || "Hủy VIP thất bại.", "error");
          }
        } catch (error) {
          Swal.fire("Lỗi!", "Có lỗi khi hủy VIP.", "error");
        }
      }
    });
  };

  const packages = [
    {
      id: "1",
      title: "VIP 1",
      price: "30,000đ",
      duration: "1 tuần",
      star: "3",
      desc: "Bài đăng có 3 sao, được ưu tiên hiển thị cao hơn bài thường.",
    },
    {
      id: "2",
      title: "VIP 2",
      price: "40,000đ",
      duration: "2 tuần",
      star: "4",
      desc: "Bài đăng có 4 sao, hiển thị nổi bật hơn VIP 3.",
    },
    {
      id: "3",
      title: "VIP 3",
      price: "50,000đ",
      duration: "1 tháng",
      star: "5",
      desc: "Bài đăng có 5 sao, hiển thị ở vị trí ưu tiên nhất.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        Bảng giá dịch vụ VIP
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => setPackageId(pkg.id)}
            className={`p-6 rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg ${
              packageId === pkg.id
                ? "border-4 border-blue-500"
                : "border-2 border-gray-200"
            }`}
          >
            <h3 className="font-semibold text-2xl mb-4 text-center">
              {pkg.title}
            </h3>
            <p className="text-center text-green-600 font-bold mb-2">
              {pkg.price}
            </p>
            <p className="text-center mb-2">Thời gian: {pkg.duration}</p>
            <p className="text-center mb-2">⭐ {pkg.star} sao</p>
            <p className="text-gray-500 text-center">{pkg.desc}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPackageId(pkg.id);
                }}
                className="px-4 py-2 bg-blue-500 text-gray-50 font-semibold rounded hover:bg-blue-600 transition"
              >
                {packageId === pkg.id ? "Đã Chọn" : "Chọn"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={handleBuy}
          className="bg-green-500 hover:bg-green-600 text-gray-50 px-6 py-2 rounded font-semibold shadow-md transition"
        >
          Xác nhận mua gói VIP
        </button>
        {currentUser?.vipLevel > 0 &&
          new Date(currentUser?.vipExpire) > new Date() && (
            <button
              onClick={handleCancelVIP}
              className="bg-red-500 hover:bg-red-600 text-gray-50 px-6 py-2 rounded font-semibold shadow-md transition"
            >
              Hủy gói VIP
            </button>
          )}
      </div>

      {currentUser?.vipLevel > 0 &&
        new Date(currentUser?.vipExpire) > new Date() && (
          <div className="bg-green-100 p-4 rounded-md border-2 border-green-500 text-center mb-6">
            <p>
              Bạn đang sử dụng <strong>VIP {currentUser?.vipLevel}</strong>.
            </p>
            <p>
              Hết hạn vào:{" "}
              <strong>
                {new Date(currentUser?.vipExpire).toLocaleDateString()}
              </strong>
            </p>
          </div>
        )}

      <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-md m-auto">
        <h3 className="text-2xl font-semibold mb-4">Hướng dẫn nạp tài khoản</h3>

        <div className="w-full flex justify-center mb-4">
          <img
            src={qr}
            alt="QR Techcombank"
            className="max-w-full max-h-[400px] object-contain p-2 border-4 border-gray-500 rounded-md shadow-md"
          />
        </div>

        <div className="text-center text-gray-500 mb-4">
          (Hãy quét mã QR để nạp tiện dụng hơn)
        </div>

        <div className="bg-gray-200 p-4 rounded-md w-full">
          <p>
            ✅ Tên tài khoản: <strong>VU MINH THIEN</strong>
          </p>
          <p>
            🏦 Số tài khoản: <strong>974041688</strong>
          </p>
          <p>🏪 Ngân hàng: Techcombank</p>
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold mb-2">
            ➥ Nội dung chuyển:{" "}
            <span className="text-red-500 font-bold">
              Mã thành viên_Tên tài khoản_số tiền
            </span>
          </p>
          <p className="text-red-500 font-semibold">
            ⚠ Nếu ghi sai nội dung chuyển, tài khoản của bạn sẽ <u>KHÔNG</u>{" "}
            được cộng tiền.
          </p>
          <p className="text-gray-500 mt-2">Hệ thống sẽ xử lý sau 5-10 phút</p>
        </div>
      </div>
    </div>
  );
};

export default BuyVIP;
