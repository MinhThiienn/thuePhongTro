import icons from "./icon";
import { RiVipLine } from "react-icons/ri";
const { ImPencil2, MdOutlineLibraryBooks, BiUserPin } = icons;

const memuSidebar = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
    icon: <ImPencil2 />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: <MdOutlineLibraryBooks />,
  },
  {
    id: 4,
    text: "Sửa thông tin cá nhân",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <BiUserPin />,
  },
  {
    id: 5,
    text: "Liên hệ",
    path: "/lien-he",
    icon: <BiUserPin />,
  },
  {
    id: 6,
    text: "Mua gói VIP",
    path: "/he-thong/mua-vip",
    icon: <RiVipLine />,
  },
];

export default memuSidebar;
