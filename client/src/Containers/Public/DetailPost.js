import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../Store/Action";
import { Slider, Map, BoxInfor, RelatedPost } from "../../Components";
import icons from "../../Ultils/icon";
import { FiHash } from "react-icons/fi";
import { underMap } from "../../Ultils/constant";
import { useNavigate, createSearchParams } from "react-router-dom";
import { path } from "../../Ultils/constant";
const DetailPost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { posts } = useSelector((state) => state.post);
  const navigate = useNavigate();
  useEffect(() => {
    if (postId) {
      dispatch(getPostsLimit({ id: postId }));
    }
  }, [postId, dispatch]);

  const images = useMemo(() => {
    if (posts && posts.length > 0) {
      try {
        return JSON.parse(posts[0]?.images?.image);
      } catch (e) {
        console.error("Lỗi parse images JSON:", e);
        return [];
      }
    }
    return [];
  }, [posts]);

  const { MdLocationPin, FaMoneyBillWave, FaCropSimple, TiStopwatch } = icons;

  const renderDescription = () => {
    if (!posts || posts.length === 0 || !posts[0]?.description) return null;

    try {
      const desc = JSON.parse(posts[0].description);

      if (Array.isArray(desc)) {
        return desc.map((item, index) => (
          <p key={index} className="leading-relaxed">
            {item}
          </p>
        ));
      } else if (typeof desc === "string") {
        return <p className="leading-relaxed">{desc}</p>;
      } else if (desc && typeof desc === "object") {
        return <p className="leading-relaxed">{JSON.stringify(desc)}</p>;
      }
      return null;
    } catch (error) {
      return <p className="leading-relaxed">{posts[0].description}</p>;
    }
  };

  if (!posts || posts.length === 0) {
    return <div>Loading bài viết...</div>;
  }
  const handleFilterLabel = () => {
    const titleSearch = `Tìm kiếm tin đăng theo chuyên mục ${posts[0]?.labelData?.value}`;
    navigate(
      {
        pathname: `/s${path.SEARCH}`,
        search: createSearchParams({
          labelCode: posts[0]?.labelData?.code,
        }).toString(),
      },
      {
        state: { titleSearch },
      }
    );
  };
  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-[70%]">
        <Slider images={images} />
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-4 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-red-600">
              {posts[0]?.title}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Chuyên mục:</span>
              <span
                onClick={handleFilterLabel}
                className="text-blue-600 underline font-semibold hover:text-orange-500 cursor-pointer"
              >
                {posts[0]?.labelData?.value}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MdLocationPin className="text-blue-500" />
              <span>{posts[0]?.address}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-between text-gray-800 text-sm bg-gray-50 rounded-lg p-4">
            <span className="flex items-center gap-2 font-medium text-green-700 text-base">
              <FaMoneyBillWave /> {posts[0]?.attributes?.price}
            </span>
            <span className="flex items-center gap-2">
              <FaCropSimple /> {posts[0]?.attributes?.acreage}
            </span>
            <span className="flex items-center gap-2">
              <FiHash /> {posts[0]?.attributes?.hashtag}
            </span>
            <span className="flex items-center gap-2">
              <TiStopwatch /> {posts[0]?.attributes?.published}
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">
              Thông tin mô tả
            </h3>
            <div className="text-gray-700 space-y-2">{renderDescription()}</div>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">
              Đặc điểm tin đăng
            </h3>
            <table className="w-full text-sm text-left border rounded-lg overflow-hidden">
              <tbody>
                {[
                  ["Mã tin", posts[0]?.overview?.code],
                  ["Khu vực", posts[0]?.overview?.area],
                  ["Loại tin rao", posts[0]?.overview?.type],
                  ["Đối tượng", posts[0]?.overview?.target],
                  ["Gói tin", posts[0]?.overview?.bonus],
                  ["Ngày đăng", posts[0]?.overview?.created],
                  ["Ngày hết hạn", posts[0]?.overview?.expired],
                ].map(([label, value], index) => (
                  <tr
                    key={label}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="p-3 font-medium text-gray-700">{label}</td>
                    <td className="p-3 text-gray-800">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">
              Thông tin liên hệ
            </h3>
            <table className="w-full text-sm text-left border rounded-lg overflow-hidden">
              <tbody>
                {[
                  ["Liên hệ", posts[0]?.user?.name],
                  ["Điện thoại", posts[0]?.user?.phone],
                  ["Zalo", posts[0]?.user?.zalo],
                ].map(([label, value], index) => (
                  <tr
                    key={label}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="p-3 font-medium text-gray-700">{label}</td>
                    <td className="p-3 text-gray-800">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {posts && (
            <div>
              <h3 className="font-semibold text-xl text-gray-800 mb-2">
                Bản đồ
              </h3>
              {/* Map component sẽ tự xử lý lấy tọa độ coords từ address */}
              <Map address={posts[0]?.address} />

              <div className="text-gray-500 text-sm space-y-1 leading-relaxed">
                <p className="text-justify">{underMap[0]}</p>
                <p className="text-justify italic font-semibold">
                  {`${posts[0]?.title} - Mã tin: ${posts[0]?.attributes?.hashtag}`}
                </p>
                <p className="text-justify">{underMap[1]}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-[40%] mt-4 md:mt-0  flex flex-col gap-8">
        {/* <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-8"> */}
        <BoxInfor userData={posts[0]?.user} />

        <RelatedPost />
        <RelatedPost newPost />
        {/* </div> */}
      </div>
    </div>
  );
};

export default DetailPost;
