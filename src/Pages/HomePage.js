// HomePage.js
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { userInformation } from "../Utils/userInformation";
import { challengesInformation } from "../Utils/challengesInformation";
import ChallengeTable from "../Components/ChallengeTable";
import HackathonIntroduction from "../Components/HackathonIntroduction";
import HackathonMockData from "../mockData/hackathonMockData.json";
import { Typography, Paper } from "@mui/material";

const HomePage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [challenges, setChallenges] = useState([]);

  const userId = userInformation.getUserId();

  const handleLogOut = () => {
    if (loggedInUser) {
      userInformation.userLogOut();
      setLoggedInUser(null);
    }
  };

  const onUpdateChallenge = (updatedChallenge) => {
    const updatedChallenges = challenges.map((challenge) =>
      challenge.challengeId === updatedChallenge.challengeId
        ? updatedChallenge
        : challenge
    );
    setChallenges(updatedChallenges);
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
  };

  useEffect(() => {
    if (userId) {
      setLoggedInUser(userId);
    }
    const challenges = challengesInformation.getAllChalleneges();
    if (challenges) setChallenges(challenges);
  }, [userId]);

  return (
    <>
      <HackathonIntroduction data={HackathonMockData.hackathonIntroduction} />
      <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Current Challenges
        </Typography>
      </Paper>
      <div style={{ marginBottom: "10px" }}>
        {!loggedInUser ? (
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginBottom: "10px" }}
            >
              <Link
                to="/LoginForm"
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
            </Button>
          </div>
        ) : (
          <div>
            <h2>Welcome, {loggedInUser}!</h2>
            <Button
              variant="contained"
              color="primary"
              style={{
                textAlign: "center",
                marginBottom: "10px",
                marginRight: "5px",
              }}
            >
              <Link
                to="/AddChallenge"
                style={{ textDecoration: "none", color: "white" }}
              >
                Add Challenge
              </Link>
            </Button>

            <Button
              variant="contained"
              color="primary"
              style={{
                marginLeft: "5px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              <Link
                onClick={handleLogOut}
                data-testid="logout-button"
                style={{ textDecoration: "none", color: "white" }}
              >
                LogOut
              </Link>
            </Button>
          </div>
        )}
        <ChallengeTable
          challenges={challenges}
          loggedInUser={loggedInUser}
          onUpdateChallenge={onUpdateChallenge}
        />
      </div>
    </>
  );
};

export default HomePage;
