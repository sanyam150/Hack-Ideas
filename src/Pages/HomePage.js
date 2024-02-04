// HomePage.js
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { userInformation } from "../Utils/userInformation";
import { challengesInformation } from "../Utils/challengesInformation";
import ChallengeTable from "../Components/ChallengeTable";

const HomePage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [isChallengeExisted, setIsChallengeExisted] = useState(false);

  const userId = userInformation.getUserId();

  const handleLogOut = () => {
    if (loggedInUser) {
      userInformation.userLogOut();
      setLoggedInUser(null);
    }
  };

  const onUpdateChallenge = (updatedChallenge) => {
    const updatedChallenges = challenges.map((challenge) =>
      challenge.id === updatedChallenge.id ? updatedChallenge : challenge
    );
    setChallenges(updatedChallenges);
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
  };

  useEffect(() => {
    if (userId) {
      setLoggedInUser(userId);
    }
    if (challengesInformation.getChallengeById(userId))
      setIsChallengeExisted(true);
    const challenges = challengesInformation.getAllChalleneges();
    if (challenges) setChallenges(challenges);
  }, [userId]);

  return (
    <div>
      {!loggedInUser ? (
        <div>
          <Button variant="contained" color="primary" fullWidth>
            <Link to="/LoginForm">Login</Link>
          </Button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {loggedInUser}!</h2>
          {!isChallengeExisted && (
            <Button variant="contained" color="primary" fullWidth>
              <Link to="/AddChallenge">AddChallenge</Link>
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            <Link onClick={handleLogOut} data-testid="logout-button">
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
  );
};

export default HomePage;
