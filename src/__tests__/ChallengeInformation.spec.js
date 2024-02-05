import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { challengesInformation } from "../Utils/challengesInformation";

describe("challengesInformation", () => {
  it("should return an empty array if localStorage has no challenges", () => {
    localStorage.setItem("challenges", JSON.stringify([]));

    const result = challengesInformation.getAllChalleneges();
    expect(result).toEqual([]);
  });

  it("should return challenges from localStorage", () => {
    const sampleChallenges = [
      {
        id: "200",
        title: "Hackathon Challenge",
        description: "Develop an innovative project during the hackathon.",
        tags: ["hackathon", "innovation", "technology"],
        votes: [],
        Date: 1707086044843,
      },
    ];
    localStorage.setItem("challenges", JSON.stringify(sampleChallenges));
    const result = challengesInformation.getAllChalleneges();
    expect(result).toEqual(sampleChallenges);
  });

  it("should return true if challenge with given id exists", () => {
    const sampleChallenges = [
      {
        id: "200",
        title: "Hackathon Challenge",
        description: "Develop an innovative project during the hackathon.",
        tags: ["hackathon", "innovation", "technology"],
        votes: [],
        Date: 1707086044843,
      },
    ];
    localStorage.setItem("challenges", JSON.stringify(sampleChallenges));

    const result = challengesInformation.getChallengeById("200");
    expect(result).toBe(true);
  });

  it("should return false if challenge with given id does not exist", () => {
    const sampleChallenges = [
      {
        id: "200",
        title: "Hackathon Challenge",
        description: "Develop an innovative project during the hackathon.",
        tags: ["hackathon", "innovation", "technology"],
        votes: [],
        Date: 1707086044843,
      },
    ];
    localStorage.setItem("challenges", JSON.stringify(sampleChallenges));

    const result = challengesInformation.getChallengeById("201");
    expect(result).toBe(false);
  });

  it("should format time in the correct standard format", () => {
    const sampleTime = 1707086044843;
    const result = challengesInformation.getStandardTime(sampleTime);
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/);
  });

  it("should sort challenges based on criteria and state", () => {
    const sampleChallenges = [
      {
        id: "200",
        votes: ["200", "201", "203"],
      },
      {
        id: "201",
        votes: ["200", "202"],
      },
      {
        id: "202",
        votes: ["200", "201", "203", "204"],
      },
    ];

    const ascendingResult = challengesInformation.sortingChallenge(
      sampleChallenges,
      "votes",
      true
    );

    const descendingResult = challengesInformation.sortingChallenge(
      sampleChallenges,
      "votes",
      false
    );

    expect(ascendingResult.map((c) => c.id)).toEqual(["201", "200", "202"]);
    expect(descendingResult.map((c) => c.id)).toEqual(["202", "200", "201"]);
  });
});
