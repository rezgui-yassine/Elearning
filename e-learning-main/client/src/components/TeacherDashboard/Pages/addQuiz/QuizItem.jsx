import React, { useContext } from "react";
import quizContext from "../../context/quizContext";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";

// Styled Avatar component
const StyledAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  marginRight: 8,
});

const QuizItem = (props) => {
  const context = useContext(quizContext);
  const { deleteQuiz } = context;
  const { quiz, updateQuiz } = props;

  return (
    <Grid item xs={12} md={6} sx={{ p: 1 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {quiz.question}
        </Typography>
        <Grid container spacing={2} alignItems="center">
          {[1, 2, 3, 4].map((optionNumber) => (
            <Grid item xs={12} key={optionNumber}>
              <Typography variant="body1">{`Option ${optionNumber}: ${
                quiz[`option${optionNumber}`]
              }`}</Typography>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant="body1">Réponse : {quiz.answer}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Est-ce une question à choix multiple : {quiz.mcq}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Titre : {quiz.title}</Typography>
          </Grid>
          <Divider />
          <Grid
            item
            xs={12}
            container
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton
              onClick={() => {
                deleteQuiz(quiz._id);
                props.showAlert("Supprimé avec succès", "success");
              }}
              aria-label="Supprimer"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                updateQuiz(quiz);
              }}
              aria-label="Modifier"
            >
              <EditIcon />
            </IconButton>
            <StyledAvatar alt="Utilisateur" src="/images/avatar.jpg" />
            <Typography variant="body2">Nom d'utilisateur</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default QuizItem;
