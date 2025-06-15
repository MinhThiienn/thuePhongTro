import React, { useEffect, useState } from "react";
import * as actions from "../../Store/Action";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Button, UpdatePost } from "../../Components";
import { apiDeletePost } from "../../Services/post";
import Swal from "sweetalert2";

const ManagePost = () => {
  const { postsOfUser, dataEdit } = useSelector((state) => state.post);
  const [updateData, setUpdateData] = useState(false);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [post, setPost] = useState([]);
  const [status, setStatus] = useState("");

  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );

  const daysSinceExpired = (expiredDateStr) => {
    const expiredDate = moment(
      expiredDateStr,
      process.env.REACT_APP_FORMAT_DATE
    );
    const today = moment();
    return today.diff(expiredDate, "days");
  };

  useEffect(() => {
    if (!dataEdit) {
      dispatch(actions.getPostsLimitAdmin());
    }
  }, [dataEdit, updateData]);

  useEffect(() => {
    if (status === 1) {
      const activePost = postsOfUser.filter((item) =>
        checkStatus(item?.overview?.expired?.split(" ")[3])
      );
      setPost(activePost);
    } else if (status === 2) {
      const notActivePost = postsOfUser.filter(
        (item) => !checkStatus(item?.overview?.expired?.split(" ")[3])
      );
      setPost(notActivePost);
    } else {
      setPost(postsOfUser);
    }
  }, [status, postsOfUser]);

  useEffect(() => {
    setPost(postsOfUser);

    const expiredToDelete = postsOfUser.filter(
      (item) =>
        !checkStatus(item?.overview?.expired?.split(" ")[3]) &&
        daysSinceExpired(item?.overview?.expired?.split(" ")[3]) >= 2
    );

    if (expiredToDelete.length > 0) {
      const deletePosts = async () => {
        try {
          await Promise.all(
            expiredToDelete.map((item) => apiDeletePost(item.id))
          );
          setUpdateData((prev) => !prev);
          console.log(
            `${expiredToDelete.length} bài đã bị xóa do hết hạn > 2 ngày.`
          );
        } catch (error) {
          console.error("Xóa tin hết hạn lỗi:", error);
        }
      };
      deletePosts();
    }
  }, [postsOfUser]);

  useEffect(() => {
    if (!dataEdit) setIsEdit(false);
  }, [dataEdit]);

  const handleDeletePost = async (postId) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Tin đăng sẽ bị xóa và không thể khôi phục!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Vâng, xóa ngay",
      cancelButtonText: "Hủy bỏ",
      reverseButtons: true,
      customClass: {
        confirmButton: "swal2-confirm btn btn-danger",
        cancelButton: "swal2-cancel btn btn-secondary",
      },
    });

    if (result.isConfirmed) {
      try {
        const responce = await apiDeletePost(postId);
        if (responce?.data.err === 0) {
          Swal.fire({
            title: "Đã xóa!",
            text: "Tin đăng đã được xóa thành công.",
            icon: "success",
            timer: 2000,
            showConfirmButton: true,
          });
          setUpdateData((prev) => !prev);
        } else {
          Swal.fire({
            title: "Thất bại!",
            text: "Xóa tin đăng không thành công.",
            icon: "error",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Lỗi máy chủ!",
          text: "Có lỗi xảy ra, vui lòng thử lại sau.",
          icon: "error",
        });
      }
    }
  };

  const expiringPosts = postsOfUser.filter(
    (item) =>
      !checkStatus(item?.overview?.expired?.split(" ")[3]) &&
      daysSinceExpired(item?.overview?.expired?.split(" ")[3]) < 2
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-300">
          Quản lí tin đăng
        </h1>

        {expiringPosts.length > 0 && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
            <strong>⚠️ Cảnh báo:</strong> Có {expiringPosts.length} tin đã hết
            hạn và sẽ bị xóa sau 2 ngày.
          </div>
        )}

        <div className="mb-6">
          <select
            onChange={(e) => setStatus(+e.target.value)}
            value={status}
            className="outline-none border px-4 py-2 border-gray-300 rounded-md shadow-sm hover:border-blue-400 w-full md:w-[250px]"
          >
            <option value="0">Lọc theo trạng thái</option>
            <option value="1">Đang hoạt động</option>
            <option value="2">Đã hết hạn</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 shadow-md text-sm md:text-base">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="p-3 border">Mã tin</th>
                <th className="p-3 border">Ảnh</th>
                <th className="p-3 border">Tiêu đề</th>
                <th className="p-3 border">Giá</th>
                <th className="p-3 border">Bắt đầu</th>
                <th className="p-3 border">Hết hạn</th>
                <th className="p-3 border">Trạng thái</th>
                <th className="p-3 border">Tùy chọn</th>
              </tr>
            </thead>
            <tbody>
              {!post?.map ? (
                <tr>
                  <td colSpan={8} className="text-center p-4 text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                post.map((item) => {
                  const expiredDay = item?.overview?.expired?.split(" ")[3];
                  const isActive = checkStatus(expiredDay);
                  const daysPassed = daysSinceExpired(expiredDay);

                  return (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="text-center p-2">
                        {item?.overview?.code}
                      </td>
                      <td className="p-2 flex justify-center">
                        <img
                          src={JSON.parse(item?.images?.image)[0] || ""}
                          alt="avatar"
                          className="w-14 h-14 object-cover rounded-md"
                        />
                      </td>
                      <td
                        className="p-2 max-w-[200px] truncate text-center"
                        title={item?.title}
                      >
                        {item?.title}
                      </td>
                      <td className="text-center p-2">
                        {item?.attributes?.price}
                      </td>
                      <td className="text-center p-2">
                        {item?.overview?.created}
                      </td>
                      <td className="text-center p-2">
                        {item?.overview?.expired}
                      </td>
                      <td
                        className={`text-center p-2 font-semibold ${
                          isActive
                            ? "text-green-600"
                            : daysPassed < 2
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {isActive
                          ? "Đang hoạt động"
                          : daysPassed < 2
                          ? `Sắp xóa (còn ${2 - daysPassed} ngày)`
                          : "Hết hạn"}
                      </td>
                      <td className="text-center p-2">
                        <div className="flex justify-center gap-2 flex-wrap">
                          <Button
                            text={"Sửa"}
                            bgColor={"bg-green-600"}
                            textColor="text-white"
                            className="px-3 py-1 rounded hover:bg-green-700"
                            onClick={() => {
                              dispatch(actions.editPost(item));
                              setIsEdit(true);
                            }}
                          />
                          <Button
                            text={"Xóa"}
                            bgColor={"bg-red-600"}
                            textColor="text-white"
                            className="px-3 py-1 rounded hover:bg-red-700"
                            onClick={() => handleDeletePost(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Popup sửa tin */}
        {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
      </div>
    </div>
  );
};

export default ManagePost;
