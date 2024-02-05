import React from "react";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const HackathonIntroduction = ({ data }) => {
  const {
    title,
    subtitle,
    description,
    whatIsHackathon,
    whyParticipate,
    whatToExpect,
  } = data;

  return (
    <div style={{ backgroundColor: "antiquewhite" }}>
      <Typography variant="h3" style={{ textAlign: "center" }}>
        {title}
      </Typography>
      <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
        <Typography variant="h4">{subtitle}</Typography>
        <Typography variant="body1">{description}</Typography>
      </Paper>

      <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
        <Typography variant="h4">{whatIsHackathon.title}</Typography>
        <Typography variant="body1">{whatIsHackathon.description}</Typography>
      </Paper>

      <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
        <Typography variant="h4">{whyParticipate.title}</Typography>
        <List>
          {whyParticipate.points.map((point, index) => (
            <ListItem key={index}>
              <ListItemText primary={point} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
        <Typography variant="h4">{whatToExpect.title}</Typography>
        <List>
          {whatToExpect.points.map((point, index) => (
            <ListItem key={index}>
              <ListItemText primary={point} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default HackathonIntroduction;
