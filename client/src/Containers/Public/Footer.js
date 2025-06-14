import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { location, path } from "../../Ultils/constant";

import icons from "../../Ultils/icon";

const Footer = () => {
  const navigate = useNavigate();
  const { IoMailUnreadOutline, MdLocationPin, FaPhoneAlt } = icons;
  const handleClickProvince = (provinceCode, name) => {
    const titleSearch = `Cho thuê ${name}, phòng trọ giá rẻ`;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams({ provinceCode }).toString(),
      },
      { state: { titleSearch } }
    );
  };

  return (
    <footer className="w-full bg-orange-400 text-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h2
            className="text-2xl font-bold text-white mb-4 cursor-pointer hover:text-white/80 transition-colors"
            onClick={() => window.scrollTo(0, 0)}
          >
            PhongtroVMT.com
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            Trang web cho thuê phòng trọ uy tín, đa dạng lựa chọn, giá hợp lý.
            Giúp bạn tìm phòng trọ nhanh chóng, tiện lợi và an toàn. Cam kết
            thông tin chính xác, cập nhật liên tục.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Tỉnh thành nổi bật
          </h3>
          <ul className="space-y-2">
            {location.slice(0, 5).map(({ id, name, provinceCode }) => (
              <li key={id}>
                <button
                  onClick={() => handleClickProvince(provinceCode, name)}
                  className="text-sm hover:text-white hover:underline transition-all duration-200"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Hỗ trợ khách hàng
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/huong-dan-dang-tin"
                className="hover:underline hover:text-white"
              >
                Hướng dẫn đăng tin
              </a>
            </li>
            <li>
              <a
                href="/chinh-sach-bao-mat"
                className="hover:underline hover:text-white"
              >
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a
                href="/cau-hoi-thuong-gap"
                className="hover:underline hover:text-white"
              >
                Câu hỏi thường gặp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Liên hệ</h3>
          <div className="space-y-2 text-sm text-white/80">
            <p className="flex items-start gap-2">
              <MdLocationPin size={16} className="mt-0.5" />
              282a, Đặng Tiến Đông, Đống Đa, Hà Nội
            </p>
            <p className="flex items-center gap-2">
              <IoMailUnreadOutline size={16} />
              vthienk33@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt size={16} />
              0974041688
            </p>

            <p className="text-white/60 mt-4 text-xs">
              © 2025 PhongtroVMT. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
