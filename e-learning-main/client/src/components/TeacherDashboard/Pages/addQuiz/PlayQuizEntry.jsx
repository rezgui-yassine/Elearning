import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import Game from "./Game";

const PlayQuizEntry = () => {
  const [quizs, setQuizs] = useState([]);
  const [seq, setSeq] = useState("");
  const [val, setVal] = useState("");

  const fetchAllQuiz = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/quiz/fetchallquiznoauthentication",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      console.log(json, "FETCH");
      setSeq("1");
      setQuizs(json);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des questionnaires :",
        error
      );
    }
  };

  const myFunction = () => {
    console.log(sessionStorage.getItem("val"));
    setVal(sessionStorage.getItem("val"));
  };

  useEffect(() => {
    fetchAllQuiz();
  }, []);

  const handleReset = () => {
    window.location.reload();
  };


  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Jouer au Quiz
        </Typography>

        <Box mt={3}>
          {quizs.map((quiz) => (
            <Game quiz={quiz} key={quiz._id} />
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          className={seq === "1" ? "" : "d-none"}
          onClick={myFunction}
          style={{ marginTop: "2rem" }}
        >
          Générer le Score
        </Button>

        <Typography
          variant="body1"
          className={seq === "1" ? "d-flex" : "d-none"}
          style={{ marginTop: "1rem" }}
        >
          Votre score est : {val}
        </Typography>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleReset}
          >
            Réinitialiser
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default PlayQuizEntry;