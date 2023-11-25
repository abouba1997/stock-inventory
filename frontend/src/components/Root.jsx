/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const Root = () => {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Root;
