import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../Ultils/constant";
import { Header, SideBar } from "./";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="w-full h-screen flex  flex-col items-center ">
      <Header />
      <div className="flex w-full flex-auto h-screen ">
        <SideBar />
        <div className="flex-auto bg-white shadow-md h-full p-4 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
