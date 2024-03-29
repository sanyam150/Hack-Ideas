// ChallengeForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Chip } from "@mui/material";
import { userInformation } from "../Utils/userInformation";
import { Link } from "react-router-dom";

const AddChallenge = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    tags: [],
    votes: [],
    Date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    const { tag, tags } = formData;
    // Check for empty value
    if (tag.trim() !== "" && !tags.includes(tag.trim())) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tag.trim()],
        tag: "",
      }));
    }
  };

  const handleRemoveTag = (removedTag) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((t) => t !== removedTag),
    }));
  };

  const handleSubmit = () => {
    const existingChallenges =
      JSON.parse(localStorage.getItem("challenges")) || [];
    const newChallenge = {
      id: userInformation.getUserId(),
      title: formData.title,
      description: formData.description,
      tags: formData.tags,
      votes: formData.votes,
      Date: Date.now(),
      challengeId: existingChallenges.length + 1,
    };

    // push all the challenges with new challenge
    const updatedChallenges = [...existingChallenges, newChallenge];

    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));

    alert("Challenge Added successfully");
    // Reset the form fields
    setFormData({
      title: "",
      description: "",
      tag: "",
      tags: [],
      votes: [],
      Date: "",
      challengeId: "",
    });
    navigate("/");
  };

  return (
    <Container
      maxWidth="md"
      style={{
        backgroundColor: "antiquewhite",
        padding: "40px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Challenge Form
      </Typography>
      <form>
        <TextField
          label="Title"
          type="text"
          name="title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          name="description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={handleInputChange}
        />
        <TextField
          label="Tag"
          type="text"
          name="tag"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.tag}
          onChange={handleInputChange}
        />
        <Button variant="outlined" color="primary" onClick={handleAddTag}>
          Add Tag
        </Button>
        <div style={{ marginTop: "10px" }}>
          {formData.tags.map((t) => (
            <Chip
              key={t}
              label={t}
              onDelete={() => handleRemoveTag(t)}
              color="primary"
              style={{ margin: "4px" }}
            />
          ))}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: "20px" }}
        >
          Submit Challenge
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Home Page
          </Link>
        </Button>
      </form>
    </Container>
  );
};

export default AddChallenge;
