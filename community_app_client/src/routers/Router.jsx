import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import App from "../App";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { useStateValue } from "../store/store";
import Profile from "../components/Profile";
import ChangePassword from "../pages/ChangePassword";

function Router() {
  const [initialState, dispatch] = useStateValue();

  return (
    <Routes>
      <Route
        path="/"
        element={
          window.localStorage.getItem("user_login") ? (
            <Layout />
          ) : (
            <Navigate to="login" replace={true} />
          )
        }
      >
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path="changepassword" element={<ChangePassword />} />
    </Routes>
  );
}

export default Router;
