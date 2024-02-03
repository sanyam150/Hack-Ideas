// src/AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ErrorPage from "../Pages/ErrorPage";
import LoginPage from "../Pages/LoginPage";
import Signup from "../Pages/SignUp";
import AddChallenge from "../Pages/AddChallenge";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AddChallenge" element={<AddChallenge />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
