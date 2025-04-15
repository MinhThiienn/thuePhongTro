import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navagation from "./Navagation";
const Home = () => {
  return (
    <div className="w-full flex flex-col items-center h-full border border-red-500">
      <Header />
      <Navagation />
      <div className="w-1100 flex flex-col items-center justify-start">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
