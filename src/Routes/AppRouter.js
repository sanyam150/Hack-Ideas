// src/AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ErrorPage from "../Pages/ErrorPage";
import LoginForm from "../Pages/LoginForm";
import Signup from "../Pages/SignUp";
import AddChallenge from "../Pages/AddChallenge";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AddChallenge" element={<AddChallenge />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
