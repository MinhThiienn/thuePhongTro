import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  HomePage,
  DetailPost,
  Rental,
  SearchDetail,
} from "./Containers/Public";
import { path } from "./Ultils/constant";
import { System, CreatePost, ManagePost } from "./Containers/System";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "./Store/Action";
function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);
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
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route
            path={path.DETAL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
          <Route path="chi-tiet/*" element={<DetailPost />} />
          <Route path="*" element={<HomePage />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
