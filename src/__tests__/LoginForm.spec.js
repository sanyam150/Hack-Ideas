import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../Pages/LoginForm";

// Mocking localStorage for the test
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders Login page", async () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  expect(screen.getByLabelText("Employee ID")).toBeInTheDocument();
  expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
});

test("handles login with valid employee ID", () => {
  mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(["123"]));

  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText("Employee ID"), {
    target: { value: "123" },
  });
  fireEvent.click(screen.getByTestId("login-button"));
});
