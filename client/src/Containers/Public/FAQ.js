import React from "react";
import faq1 from "../../assets/FAQ1.png";
import faq2 from "../../assets/FAQ2.png";
const FAQ = () => {
  return (
    <div className="max-w-5xl mx-auto p-10 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-xl font-sans text-gray-800 leading-relaxed">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-900 tracking-tight drop-shadow-sm">
        Câu hỏi thường gặp
      </h1>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          1. Đăng tin quảng cáo trên Phongtro123.com có hiệu quả không?
        </h2>
        <p className="mb-4 text-lg text-gray-700">
          Hiện tại Phongtro123.com đang đứng đầu các từ khóa về: phòng trọ, nhà
          nguyên căn, cho thuê căn hộ, mặt bằng, ở ghép với 300.000 lượt truy
          cập/tháng và hơn 2.000.000 lượt xem/tháng.
        </p>
        <p className="mb-6 text-lg text-gray-700">
          Với lượt truy cập mỗi ngày tăng thêm, Phongtro123.com là kênh đăng tin
          quảng cáo về cho thuê rất hiệu quả.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          2. Làm thế nào để đăng tin lên website Phongtro123.com?
        </h2>
        <p className="mb-4 text-lg text-gray-700">
          Để có thể đăng tin lên Phongtro123.com trước hết bạn cần đăng ký tài
          khoản tại website, truy cập vào website Phongtro123.com và kích vào
          chữ "đăng ký" sau đó điền các thông tin như: Họ tên, số điện thoại,
          mật khẩu (Lưu ý: bạn cần nhập chính xác số điện thoại bạn cần khách
          hàng gọi đến, mật khẩu thì nên tạo dễ nhớ và ghi lại, để sau này bạn
          có thể đăng nhập để đăng tin, chỉnh sửa nội dung vv...)
        </p>
        <p className="mb-4 text-lg text-gray-700">
          Khi bạn truy cập trên máy tính (laptop) thì nút "đăng ký" nằm ở góc
          trên, bên phải màn hình:
        </p>
        <div className="flex justify-center mb-6">
          <img
            src={`${faq1}`}
            alt="Đăng ký trên máy tính"
            className="max-w-full h-auto rounded-lg shadow-md object-contain"
            style={{ maxHeight: "200px" }}
          />
        </div>
        {/* <p className="mb-4 text-lg text-gray-700">
          Còn nếu bạn truy cập trên điện thoại, nút "đăng ký" nằm ở phía dưới
          cùng màn hình:
        </p>
        <div className="flex justify-center">
          <img
            src="#" // Thay bằng link ảnh bạn muốn
            alt="Đăng ký trên điện thoại"
            className="max-w-full h-auto rounded-lg shadow-md object-contain"
            style={{ maxHeight: "200px" }}
          />
        </div> */}
      </section>

      {/* Question 3 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          3. Vào đâu để xem lại tin đã đăng, chỉnh sửa hoặc ẩn tin đã đăng?
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          Sau khi đã đăng nhập và đăng tin thành công, bạn có thể vào phần "Quản
          lý tài khoản" tìm mục "Quản lý tin đăng", bạn sẽ thấy tất cả các tin
          đã đăng tại đây.
        </p>
        <p className="mb-4 text-lg text-gray-700">
          Và bạn nhìn bên phải của các tin đã đăng, bạn sẽ thấy nút "Sửa" và "Ẩn
          tin đăng", bấm vào để thực hiện các thao tác mong muốn.
        </p>
        <div className="flex justify-center">
          <img
            src={`${faq2}`}
            alt="Quản lý tin đăng"
            className="max-w-full h-auto rounded-lg shadow-md object-contain"
            style={{ maxHeight: "250px" }}
          />
        </div>
      </section>
    </div>
  );
};

export default FAQ;
