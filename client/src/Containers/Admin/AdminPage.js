import React, { useEffect, useState, useMemo } from "react";
import * as actions from "../../Store/Action";
import { useDispatch, useSelector } from "react-redux";
import DashboardChart from "./DashboardChart";
import PageAdmin from "./PageAdmin";
import Swal from "sweetalert2";
import { apiDeletePost } from "../../Services/post";
import { apiResetPassWord } from "../../Services/user";
import EditUserModal from "./EditUSerModal";
import { apiAdminUpdateUser } from "../../Services/user";
import { useNavigate } from "react-router-dom";
import EditPostModal from "./EditPostModal";

const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state?.post?.posts) || [];
  const { currentUser } = useSelector((state) => state?.user);
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const users = useSelector((state) => state?.user?.allUsers) || [];

  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [currentPagePost, setCurrentPagePost] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleModalClose = (shouldReload) => {
    setIsEditPostOpen(false);
    setSelectedPost(null);
    if (shouldReload) {
      dispatch(actions.getPosts());
    }
  };
  const perPage = 10;

  const filteredUsers = searchTerm
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.phone && user.phone.indexOf(searchTerm) !== -1)
      )
    : users;

  const relatedPosts = useMemo(() => {
    if (filteredUsers.length === 1 && posts.length > 0) {
      return posts.filter(
        (post) => post?.user?.phone === filteredUsers[0].phone
      );
    }
    return [];
  }, [filteredUsers, posts]);

  const displayedUsers = filteredUsers.slice(
    (currentPageUser - 1) * perPage,
    currentPageUser * perPage
  );

  const displayedPosts =
    relatedPosts.length > 0
      ? relatedPosts.slice(
          (currentPagePost - 1) * perPage,
          currentPagePost * perPage
        )
      : posts.slice((currentPagePost - 1) * perPage, currentPagePost * perPage);

  useEffect(() => {
    dispatch(actions.getAllUsers()); // Lấy tài khoản từ backend
    dispatch(actions.getPosts()); // Lấy bài đăng từ backend
  }, [dispatch]);

  const totalUsers = users.length;
  const totalPosts = posts.length;
  const totalVIP = posts.filter((p) => parseInt(p?.star) > 0).length;

  const chartData = [
    { name: "Tài khoản", qty: totalUsers },
    { name: "Bài đăng", qty: totalPosts },
    { name: "Bài đăng VIP", qty: totalVIP },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffbb28"];

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };
  const handleSaveUser = async (newData) => {
    try {
      await apiAdminUpdateUser(newData.id, {
        name: newData.name,
        phone: newData.phone,
        isAdmin: newData.isAdmin,
        balance: newData.balance,
      });

      Swal.fire("Thành công!", "Tài khoản đã được cập nhật.", "success");

      setIsEditOpen(false);
      setSelectedUser(null);
      dispatch(actions.getAllUsers());
      if (currentUser?.id === newData.id) {
        dispatch(actions.getCurrentUser());
      }
    } catch (error) {
      Swal.fire("Lỗi!", "Không thể cập nhật tài khoản.", "error");
    }
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: `Xóa tài khoản ${user.name}?`,
      text: "Hành động này sẽ xóa tài khoản vĩnh viễn cùng tất cả bài đăng!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa luôn!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(actions.deleteUser(user.id))
          .then(() => {
            Swal.fire(
              "Đã xóa!",
              "Tài khoản và bài đăng của họ đã được xóa.",
              "success"
            );

            dispatch(actions.getAllUsers());
          })
          .catch((error) => {
            Swal.fire("Lỗi!", "Không thể xóa tài khoản.", "error");
          });
      }
    });
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setIsEditPostOpen(true);
  };

  const handleDeletePost = (post) => {
    Swal.fire({
      title: `Xóa bài đăng ${post.title}?`,
      text: "Hành động này sẽ xóa vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa luôn!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeletePost(post.id);
          Swal.fire("Đã xóa!", "Bài đăng đã được xóa.", "success");
          dispatch(actions.getPosts()); // Tải lại bài đăng
        } catch (error) {
          Swal.fire("Lỗi!", "Không thể xóa bài đăng.", "error");
        }
      }
    });
  };

  const handleResetPassWord = async (user) => {
    Swal.fire({
      title: `Reset password cho tài khoản ${user.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Reset",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiResetPassWord(user.id);
          Swal.fire("Mật khẩu mới", `Mật khẩu: ${res.data.newPass}`, "success");
        } catch (error) {
          Swal.fire("Lỗi!", "Không thể reset mật khẩu.", "error");
        }
      }
    });
  };
  console.log(posts);
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-4 py-2 mr-4 mb-6 bg-blue-500 text-gray-50 font-semibold rounded shadow-md hover:bg-blue-600 transition-all transform hover:-translate-y-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M10 2l7 7v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9l7-7zm0 2.83L5 9v8h10V9l-5-4.17z" />
        </svg>
        <span>Về Home</span>
      </button>

      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Trang quản trị
      </h1>

      <section className="mb-6 grid grid-cols-3 gap-6">
        <div className="p-6 bg-blue-500 text-gray-50 rounded-2xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-2">Tài khoản</h2>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        <div className="p-6 bg-green-500 text-gray-50 rounded-2xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-2">Bài đăng</h2>
          <p className="text-3xl font-bold">{totalPosts}</p>
        </div>

        <div className="p-6 bg-yellow-500 text-gray-50 rounded-2xl shadow-md transform transition-all hover:shadow-lg hover:-translate-y-1">
          <h2 className="text-xl font-semibold mb-2">Bài đăng VIP</h2>
          <p className="text-3xl font-bold">{totalVIP}</p>
        </div>
      </section>

      <DashboardChart chartData={chartData} COLORS={COLORS} />

      {/* Tìm kiếm tài khoản */}
      <div className="mb-6 relative max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        >
          <path
            fillRule="evenodd"
            d="M12.9 14.32a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9zm1.42 1.42l3.58 3.58a1 1 0 01-1.42 1.42l-3.58-3.58a1 1 0 111.42-1.42z"
            clipRule="evenodd"
          />
        </svg>

        <input
          type="text"
          placeholder="Tìm tài khoản theo tên hoặc số điện thoại"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Danh sách tài khoản */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Danh sách tài khoản
        </h2>
        <table className="min-w-full bg-gray-50 shadow-md rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-gray-500 font-semibold">ID</th>
              <th className="p-4 text-gray-500 font-semibold">Tên</th>
              <th className="p-4 text-gray-500 font-semibold">Số điện thoại</th>
              <th className="p-4 text-gray-500 font-semibold">Phân quyền</th>
              <th className="p-4 text-gray-500 font-semibold">Số dư</th>
              <th className="p-4 text-gray-500 font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-100 transition-all"
                >
                  <td className="p-4">
                    {user?.id
                      ? `${user.id.match(/\d/g)?.join("")?.slice(0, 5)}`
                      : "??"}
                  </td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.isAdmin ? "Admin" : "User"}</td>
                  <td className="p-4">{user?.balance?.toLocaleString()} VNĐ</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="px-2 py-1 bg-blue-500 text-gray-50 font-semibold rounded transition-all hover:bg-blue-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="px-2 py-1 bg-red-500 text-gray-50 font-semibold rounded transition-all hover:bg-red-600"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => handleResetPassWord(user)}
                      className="px-2 py-1 bg-green-500 text-gray-50 font-semibold rounded transition-all hover:bg-green-600"
                    >
                      Reset password
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  Đang tải...
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isEditOpen && selectedUser && (
          <EditUserModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            user={selectedUser}
            onSave={handleSaveUser}
          />
        )}

        <PageAdmin
          total={filteredUsers.length}
          perPage={perPage}
          currentPage={currentPageUser}
          setCurrentPage={setCurrentPageUser}
        />
      </section>

      {/* Danh sách bài đăng */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          {filteredUsers.length === 1
            ? `Danh sách bài đăng của ${filteredUsers[0].name}`
            : "Danh sách bài đăng"}
        </h2>
        {filteredUsers.length === 1 ? (
          relatedPosts.length > 0 ? (
            <table className="min-w-full bg-gray-100 shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-gray-500 font-semibold">ID</th>
                  <th className="p-4 text-gray-500 font-semibold">Tiêu đề</th>
                  <th className="p-4 text-gray-500 font-semibold">Giá</th>
                  <th className="p-4 text-gray-500 font-semibold">Diện tích</th>
                  <th className="p-4 text-gray-500 font-semibold">VIP</th>
                  <th className="p-4 text-gray-500 font-semibold">Username</th>
                  <th className="p-4 text-gray-500 font-semibold">Hành Động</th>
                </tr>
              </thead>

              <tbody>
                {relatedPosts
                  .slice(
                    (currentPagePost - 1) * perPage,
                    currentPagePost * perPage
                  )
                  .map((post) => (
                    <tr key={post.id} className="border-t">
                      <td className="p-4">{post?.attributes?.hashtag}</td>
                      <td className="p-4">{post.title}</td>
                      <td className="p-4">{post?.attributes?.price}</td>
                      <td className="p-4">{post?.attributes?.acreage}</td>
                      <td className="p-4">
                        {parseInt(post?.star) > 0 ? (
                          <span className="px-2 py-1 bg-yellow-500 text-gray-50 font-semibold rounded">
                            VIP
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-400 text-gray-50 font-semibold rounded">
                            Thường
                          </span>
                        )}
                      </td>
                      <td className="p-4">{post?.user?.name || "N.A."}</td>

                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="px-2 py-1 bg-blue-500 text-gray-50 font-semibold rounded"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeletePost(post)}
                          className="px-2 py-1 bg-red-500 text-gray-50 font-semibold rounded"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>Người dùng này chưa có bài đăng nào</p>
          )
        ) : (
          <table className="min-w-full bg-gray-100 shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-gray-500 font-semibold">ID</th>
                <th className="p-4 text-gray-500 font-semibold">Tiêu đề</th>
                <th className="p-4 text-gray-500 font-semibold">Giá</th>
                <th className="p-4 text-gray-500 font-semibold">Diện tích</th>
                <th className="p-4 text-gray-500 font-semibold">VIP</th>
                <th className="p-4 text-gray-500 font-semibold">Username</th>
                <th className="p-4 text-gray-500 font-semibold">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {posts
                .slice(
                  (currentPagePost - 1) * perPage,
                  currentPagePost * perPage
                )
                .map((post) => (
                  <tr key={post.id} className="border-t">
                    <td className="p-4">{post?.attributes?.hashtag}</td>
                    <td className="p-4">{post.title}</td>
                    <td className="p-4">{post?.attributes?.price}</td>
                    <td className="p-4">{post?.attributes?.acreage}</td>

                    <td className="p-4">
                      {parseInt(post?.star) > 0 ? (
                        <span className="px-2 py-1 bg-yellow-500 text-gray-50 font-semibold rounded">
                          VIP
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-400 text-gray-50 font-semibold rounded">
                          Thường
                        </span>
                      )}
                    </td>

                    <td className="p-4">{post?.user?.name || "N.A."}</td>

                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="px-2 py-1 bg-blue-500 text-gray-50 font-semibold rounded"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeletePost(post)}
                        className="px-2 py-1 bg-red-500 text-gray-50 font-semibold rounded"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}{" "}
        {isEditPostOpen && (
          <EditPostModal
            isOpen={isEditPostOpen}
            onClose={handleModalClose}
            post={selectedPost}
          />
        )}
        <PageAdmin
          total={
            filteredUsers.length === 1 ? relatedPosts.length : posts.length
          }
          perPage={perPage}
          currentPage={currentPagePost}
          setCurrentPage={setCurrentPagePost}
        />
      </section>
    </div>
  );
};

export default AdminPage;
