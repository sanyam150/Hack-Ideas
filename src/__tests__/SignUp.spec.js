// SignupForm.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import SignupForm from "../Pages/SignUp";

// Mocking localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

// Mocking sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

Object.defineProperty(window, "sessionStorage", { value: sessionStorageMock });

// Mocking the navigate function
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// Clear localStorage and sessionStorage before each test
beforeEach(() => {
  mockLocalStorage.getItem.mockClear();
  mockLocalStorage.setItem.mockClear();
  sessionStorage.getItem.mockClear();
  sessionStorage.setItem.mockClear();
});

// Mocking window.alert
global.alert = jest.fn();

test("renders signup form correctly", () => {
  render(
    <Router>
      <SignupForm />
    </Router>
  );

  expect(screen.getByLabelText("New Employee ID")).toBeInTheDocument();
  expect(screen.getByTestId("SignUp-button")).toBeInTheDocument();
});

test("handles signup with new employee ID", () => {
  mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([]));

  render(
    <Router>
      <SignupForm />
    </Router>
  );

  fireEvent.change(screen.getByLabelText("New Employee ID"), {
    target: { value: "newId" },
  });
  fireEvent.click(screen.getByTestId("SignUp-button"));
  expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
    "employeeIds",
    JSON.stringify(["newId"])
  );
  expect(sessionStorage.setItem).toHaveBeenCalledWith("isLoggedIn", "newId");
});

test("handles signup with existing employee ID", () => {
  mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(["existingId"]));

  render(
    <Router>
      <SignupForm />
    </Router>
  );

  fireEvent.change(screen.getByLabelText("New Employee ID"), {
    target: { value: "existingId" },
  });

  fireEvent.click(screen.getByTestId("SignUp-button"));
  expect(global.alert).toHaveBeenCalledWith("User Already Exists");
  expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
});
