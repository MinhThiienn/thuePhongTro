import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  HomePage,
  DetailPost,
  Rental,
  SearchDetail,
  ContactUser,
  Instruct,
  PrivacyPolicy,
  FAQ,
  ForgotPassword,
  Farvorite,
} from "./Containers/Public";
import { path } from "./Ultils/constant";
import {
  System,
  CreatePost,
  ManagePost,
  EditAccount,
} from "./Containers/System";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "./Store/Action";
import { ScrollToTop } from "./Components";
function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  // const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(actions.getFavorites());
  }, [dispatch]);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrentUser());
    }, 200);
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getArea());
    dispatch(actions.getProvinces());
  }, []);
  return (
    <div className=" bg-primary overflow-hidden">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.CONTACT} element={<ContactUser />} />
          <Route path={path.INSTRUCT} element={<Instruct />} />
          <Route path={path.PRIVACY} element={<PrivacyPolicy />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.FAVORITE} element={<Farvorite />} />
          {/* <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} /> */}

          <Route
            path={path.DETAL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
          {/* <Route path={path.DETAIL_ALL} element={<DetailPost />} /> */}
          <Route path="*" element={<HomePage />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
