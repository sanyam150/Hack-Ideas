import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";

// Mock localStorage and sessionStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });
Object.defineProperty(window, "sessionStorage", { value: mockSessionStorage });

test("renders HomePage", () => {
  // Set up the mock data
  mockLocalStorage.getItem.mockReturnValueOnce(
    JSON.stringify([
      {
        id: "109",
        title: "Hackathon2024",
        description:
          "Join us for an exciting 24-hour coding marathon! Showcase your skills, collaborate with fellow developers, and build innovative projects.",
        tags: ["coding", "innovation", "collaboration"],
        votes: ["200", "109"],
        Date: 1707051502839,
      },
    ])
  );
  mockLocalStorage.getItem.mockReturnValueOnce(
    JSON.stringify(["109", "110", "111"])
  );
  mockSessionStorage.getItem.mockReturnValueOnce("109");
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  expect(screen.getByText("Welcome, 109!")).toBeInTheDocument();
  expect(screen.getByTestId("logout-button")).toBeInTheDocument();
});
