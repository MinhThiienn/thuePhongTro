import React, { useEffect, useState } from "react";
import * as actions from "../../Store/Action";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Button, UpdatePost } from "../../Components";
import { data } from "react-router-dom";

const ManagePost = () => {
  const { postsOfUser, dataEdit } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, [dispatch]);

  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );

  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md ">
      <div className="flex items-center justify-between py-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý tin đăng</h1>
        <select className="outline-none border px-3 py-2 border-gray-300 rounded-md shadow-sm hover:border-blue-400">
          <option value="">Lọc theo trạng thái</option>
        </select>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full table-auto border border-gray-200 shadow-sm">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-4 border">Mã tin</th>
              <th className="p-4 border">Ảnh đại diện</th>
              <th className="p-4 border">Tiêu đề</th>
              <th className="p-4 border">Giá</th>
              <th className="p-4 border">Ngày bắt đầu</th>
              <th className="p-4 border">Ngày hết hạn</th>
              <th className="p-4 border">Trạng thái</th>
              <th className="p-4 border">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {!postsOfUser?.map ? (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              postsOfUser.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="text-center p-2">{item?.overview?.code}</td>
                  <td className="flex justify-center items-center p-2">
                    <img
                      src={JSON.parse(item?.images?.image)[0] || ""}
                      alt="avatar"
                      className="w-14 h-14 object-cover rounded-md shadow-sm"
                    />
                  </td>
                  <td
                    className="p-2 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap text-center"
                    title={item?.title}
                  >
                    {item?.title}
                  </td>

                  <td className="text-center p-2">{item?.attributes?.price}</td>
                  <td className="text-center p-2">{item?.overview?.created}</td>
                  <td className="text-center p-2">{item?.overview?.expired}</td>
                  <td
                    className={`text-center p-2 font-semibold ${
                      checkStatus(item?.overview?.expired?.split(" ")[3])
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {checkStatus(item?.overview?.expired?.split(" ")[3])
                      ? "Đang hoạt động"
                      : "Hết hạn"}
                  </td>
                  <td className="text-center p-2">
                    <div className="flex justify-center items-center gap-2 h-full">
                      <Button
                        text={"Sửa"}
                        bgColor={"bg-green-600"}
                        textColor="text-white"
                        className="px-4 py-2 rounded-md hover:bg-green-700 transition-all duration-300"
                        onClick={() => {
                          dispatch(actions.editPost(item));
                          setIsEdit(true);
                        }}
                      />
                      <Button
                        text={"Xóa"}
                        bgColor={"bg-red-600"}
                        textColor="text-white"
                        className="px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-300"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePost;
