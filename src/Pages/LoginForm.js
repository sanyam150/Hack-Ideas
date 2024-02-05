// LoginForm.js
import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userInformation } from "../Utils/userInformation";

const LoginForm = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");

  const handleLogin = () => {
    if (employeeId.trim() === "") {
      alert("employee Id can't be empty");
      return;
    }
    // Perform verification logic, e.g., check if the entered ID exists in local storage
    const storedIds = JSON.parse(localStorage.getItem("employeeIds")) || [];
    if (storedIds.includes(employeeId)) {
      // Set the employeeId in sessionStorage to mark the user as logged in
      sessionStorage.setItem("isLoggedIn", employeeId);
      navigate("/");
    } else {
      alert("Invalid Employee ID");
    }
  };

  // If user is already logged in then redirect to home page
  useEffect(() => {
    if (userInformation.isUserLoggedIn()) {
      navigate("/");
    }
  });

  return (
    <>
      <Container
        maxWidth="xs"
        style={{
          backgroundColor: "antiquewhite",
          padding: "40px",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          LOGIN
        </Typography>
        <form>
          <TextField
            label="Employee ID"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ marginTop: "40px", marginBottom: "40px" }}
            data-testid="login-button"
          >
            Login
          </Button>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "10px" }}
          >
            Don't have an account? <Link to="/SignUp">Sign Up</Link>
          </Typography>
        </form>
      </Container>
    </>
  );
};

export default LoginForm;
