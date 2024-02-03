// SignupForm.js
import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userInformation } from "../Utils/userInformation";

const SignupForm = () => {
  const navigate = useNavigate();
  const [newEmployeeId, setNewEmployeeId] = useState("");

  const handleSignup = () => {
    if (newEmployeeId.trim() === "") {
      alert("employee Id can't be empty");
      return;
    }
    // Perform signup logic, e.g., add the new ID to local storage
    const storedIds = JSON.parse(localStorage.getItem("employeeIds")) || [];

    if (storedIds.includes(newEmployeeId)) {
      alert("User Already Exists");
    } else {
      storedIds.push(newEmployeeId);
      localStorage.setItem("employeeIds", JSON.stringify(storedIds));
    }

    // Set the employeeId in sessionStorage to mark the user as logged in
    sessionStorage.setItem("isLoggedIn", newEmployeeId);
    navigate("/");
  };

  // If user is already logged in then redirect to home page
  useEffect(() => {
    if (userInformation.isUserLoggedIn()) {
      navigate("/");
    }
  });

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form>
        <TextField
          label="New Employee ID"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newEmployeeId}
          onChange={(e) => setNewEmployeeId(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
        >
          Signup
        </Button>
      </form>
    </Container>
  );
};

export default SignupForm;
