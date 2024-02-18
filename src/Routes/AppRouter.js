// src/AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ErrorPage from "../Pages/ErrorPage";
import LoginForm from "../Pages/LoginForm";
import Signup from "../Pages/SignUp";
import AddChallenge from "../Pages/AddChallenge";
import ProtectedRoutes from "../Utils/ProtectedRoutes";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/LoginForm"
          element={
            <ProtectedRoutes redirectPath="/" isChallengeForm={false}>
              <LoginForm />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/SignUp"
          element={
            <ProtectedRoutes redirectPath="/" isChallengeForm={false}>
              <Signup />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/AddChallenge"
          element={
            <ProtectedRoutes redirectPath="/" isChallengeForm={true}>
              <AddChallenge />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
