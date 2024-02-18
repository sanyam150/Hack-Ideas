// ChallengeTable.js
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import { challengesInformation } from "../Utils/challengesInformation";

const VotesButton = ({ challenge, onLike, loggedInUser, challengeId }) => {
  const handleLike = () => {
    onLike(challengeId);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleLike}
      disabled={challenge.votes.includes(loggedInUser)}
    >
      Like
    </Button>
  );
};

const EditableRow = ({ challenge, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedChallenge, setEditedChallenge] = useState(challenge);
  const [modalChallenge, setModalChallenge] = useState({ ...challenge });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalChallenge((prevChallenge) => ({
      ...prevChallenge,
      [name]: value,
    }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    onUpdate(modalChallenge);
    setEditedChallenge(modalChallenge);
    handleCloseModal();
  };

  return (
    <>
      <TableRow>
        <TableCell>{editedChallenge.id}</TableCell>
        <TableCell>{editedChallenge.title}</TableCell>
        <TableCell>{editedChallenge.description}</TableCell>
        <TableCell>{editedChallenge.tags.join(", ")}</TableCell>
        <TableCell>
          {challengesInformation.getStandardTime(editedChallenge.Date)}
        </TableCell>
        <TableCell>{editedChallenge.votes.length}</TableCell>
        <TableCell>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Edit
          </Button>
        </TableCell>
      </TableRow>

      {/* Modal for editing challenge */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Edit Challenge</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={modalChallenge.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={modalChallenge.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ChallengeTable = ({ challenges, loggedInUser, onUpdateChallenge }) => {
  const [updatedChallenge, setUpdateChallenge] = useState(challenges);
  const [dateAscendingOrder, setDateAscendingOrder] = useState(true);
  const [isVotesMax, setIsVotesMax] = useState(true);

  useEffect(() => {
    setUpdateChallenge(challenges);
  }, [challenges]);

  const handleSortByDate = () => {
    const sortedChallenges = challengesInformation.sortingChallenge(
      challenges,
      "Date",
      dateAscendingOrder
    );
    setUpdateChallenge(sortedChallenges);
    setDateAscendingOrder(!dateAscendingOrder);
  };

  const handleSortByLikes = () => {
    const sortedChallenges = challengesInformation.sortingChallenge(
      challenges,
      "votes",
      isVotesMax
    );
    setUpdateChallenge(sortedChallenges);
    setIsVotesMax(!isVotesMax);
  };

  const handleLike = (challengeId) => {
    const updatedChallenges = updatedChallenge.map((challenge) => {
      if (challenge.challengeId === challengeId) {
        // Check if the user hasn't already liked the challenge
        if (!challenge.votes.includes(loggedInUser)) {
          challenge.votes.push(loggedInUser);
        }
      }
      return challenge;
    });
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
    setUpdateChallenge(updatedChallenges);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{ backgroundColor: "antiquewhite" }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>
              <div style={{ display: "flex", alignItems: "center" }}>
                Date
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleSortByDate}
                >
                  {dateAscendingOrder ? (
                    <span>&#9650;</span>
                  ) : (
                    <span>&#9660;</span>
                  )}
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Votes
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleSortByLikes}
                >
                  {isVotesMax ? <span>&#9650;</span> : <span>&#9660;</span>}
                </Button>
              </div>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {updatedChallenge.map((challenge, index) => (
            <React.Fragment key={index}>
              {challenge.id === loggedInUser ? (
                <EditableRow
                  challenge={challenge}
                  onUpdate={onUpdateChallenge}
                />
              ) : (
                <TableRow>
                  <TableCell>{challenge.id}</TableCell>
                  <TableCell>{challenge.title}</TableCell>
                  <TableCell>{challenge.description}</TableCell>
                  <TableCell>{challenge.tags.join(", ")}</TableCell>
                  <TableCell>
                    {challengesInformation.getStandardTime(challenge.Date)}
                  </TableCell>
                  <TableCell>{challenge.votes.length}</TableCell>
                  <TableCell>Read Only</TableCell>
                </TableRow>
              )}
              {loggedInUser && (
                <TableRow>
                  <TableCell style={{ border: "none" }}>
                    <VotesButton
                      challenge={challenge}
                      onLike={handleLike}
                      loggedInUser={loggedInUser}
                      challengeId={challenge.challengeId}
                    />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChallengeTable;
