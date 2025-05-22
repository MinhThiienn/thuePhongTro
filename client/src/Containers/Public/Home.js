import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Search from "./Search";
import { Intro, Contact } from "../../Components";
import * as actions from "../../Store/Action";
import { useDispatch, useSelector } from "react-redux";
import { apiGetCurrentUser } from "../../Services/user";
const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrentUser());
    }, 200);
  }, [isLoggedIn]);
  console.log(currentUser);

  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getArea());
    dispatch(actions.getProvinces());
  }, []);
  return (
    <div className="w-full flex gap-6 flex-col items-center h-full">
      <Header />
      <Navigation />
      {isLoggedIn && <Search />}

      <div className="w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3">
        {" "}
        <Outlet />{" "}
      </div>
      <Intro />
      <Contact />
      <div className=" h-[500px]"></div>
    </div>
  );
};

export default Home;
