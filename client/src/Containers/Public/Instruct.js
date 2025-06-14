import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { path } from "../../Ultils/constant";
const Instruct = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleClick = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      Swal.fire({
        icon: "info",
        title: "Bạn đã đăng nhập rồi",
        text: "Không cần đăng ký nữa nhé!",
      });
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-6 text-gray-800 leading-relaxed">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          📝 Hướng dẫn đăng tin
        </h2>
        <p className="mb-3">
          Chào bạn, sau đây là hướng dẫn sử dụng cho thành viên website{" "}
          <span className="font-semibold text-blue-500">phongtro123.com</span>.
        </p>
        <p className="mb-2">
          👉 Nếu bạn chưa có tài khoản, hãy{" "}
          <Link
            to="/login"
            state={{ flag: true }}
            className="text-blue-600 underline cursor-pointer"
            onClick={handleClick}
          >
            đăng ký tại đây
          </Link>
          trước khi bắt đầu đăng tin mới.
        </p>
        <p className="mb-2">
          👉 Nếu đã có tài khoản, sau khi đăng nhập vào website, bạn bấm vào nút{" "}
          <Link
            to={`/he-thong/${path.CREATE_POST}`}
            className="font-semibold text-green-600"
          >
            ĐĂNG TIN
          </Link>{" "}
          để bắt đầu.
        </p>
        <p>
          ✅ Khi đăng tin, hãy đọc kỹ mô tả từng bước, nhập đầy đủ và chính xác
          nội dung, đặc biệt là mục <strong>Giá</strong> và{" "}
          <strong>Diện tích</strong>. Những tin có hình ảnh rõ ràng, đầy đủ sẽ
          có{" "}
          <span className="text-red-500 font-medium">
            tỉ lệ xem cao hơn 50%
          </span>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          ⚠️ Lưu ý khi đăng tin
        </h2>
        <ul className="list-disc pl-5 space-y-3 text-gray-700">
          <li>
            Điền đầy đủ các{" "}
            <span className="font-medium">thông tin bắt buộc</span> vào các ô
            trong phần đăng tin.
          </li>
          <li>
            <span className="font-medium">Giá cho thuê</span>: Vui lòng nhập{" "}
            <span className="italic">chính xác một giá duy nhất</span> (Không
            nhập dạng "từ... đến...") và chọn đúng đơn vị: triệu/tháng hoặc
            nghìn/tháng.
            <br />
            <span className="block mt-1">
              🔹 Ví dụ: Nếu cho thuê <strong>3 triệu/tháng</strong>, hãy nhập{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                3000000
              </code>
            </span>
          </li>
          <li>
            <span className="font-medium">Diện tích</span>: Nhập đúng một con số
            duy nhất (Không nhập khoảng từ... đến...).
          </li>
          <li>
            Sau khi điền đầy đủ, bấm nút{" "}
            <Link
              to={`/he-thong/${path.CREATE_POST}`}
              className="text-green-600 font-semibold"
            >
              ĐĂNG TIN NGAY
            </Link>{" "}
            và chờ vài giây để hệ thống xử lý.
            <ul className="list-disc pl-5 mt-2 space-y-2 text-sm text-gray-600">
              <li>
                ✅ Nếu thành công, hệ thống sẽ báo{" "}
                <span className="text-green-600 font-medium">
                  "Đăng tin thành công"
                </span>
                .
              </li>
              <li>
                ❌ Nếu có cảnh báo màu đỏ, tức là có thông tin chưa đúng. Vui
                lòng kiểm tra lại và bấm <strong>ĐĂNG TIN NGAY</strong> lần nữa.
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Instruct;
