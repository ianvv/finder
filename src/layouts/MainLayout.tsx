import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import "../assets/styles/App.css";

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="app">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
