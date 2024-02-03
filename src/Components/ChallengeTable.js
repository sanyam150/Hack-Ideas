// ChallengeTable.js
import React, { useState } from "react";
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

const EditableRow = ({ challenge, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedChallenge, setEditedChallenge] = useState(challenge);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedChallenge((prevChallenge) => ({
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
    onUpdate(editedChallenge);
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
            value={editedChallenge.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={editedChallenge.description}
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
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Tags</TableCell>

            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {challenges.map((challenge) => (
            <React.Fragment key={challenge.id}>
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
                  <TableCell>Read Only</TableCell>
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
