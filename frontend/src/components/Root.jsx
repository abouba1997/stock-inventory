/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const Root = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Root;
