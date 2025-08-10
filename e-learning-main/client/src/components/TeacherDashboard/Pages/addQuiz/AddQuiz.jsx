import React, { useContext, useState } from "react";
import quizContext from "../../context/quizContext";
import {
  Button,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";

const AddQuiz = (props) => {
  const context = useContext(quizContext);
  const { addQuiz, editCode } = context;

  const [select, setSelect] = useState("oui");
  const [quiz, setQuiz] = useState({
    id: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    title: "",
    mcq: select,
    code: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addQuiz(
      quiz.question,
      quiz.option1,
      quiz.option2,
      quiz.option3,
      quiz.option4,
      quiz.answer,
      quiz.title,
      select,
      code
    );
    setQuiz({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      title: "",
      mcq: select,
    });
    props.showAlert("Ajouté avec succès", "success");
  };

  var code;
  const [gcode, setGcode] = useState("");

  const test = () => {
    const publish = () => {
      var len = 6;
      var arr = "1234567890qwertyuiopasdfghjklzxcvbnm";
      var ans = "";
      for (var i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
      }
      code = ans;
      setGcode(code);
    };
    publish();
    const editTESTCode = () => {
      editCode(code);
      props.showAlert("Quiz publié avec succès", "success");
    };
    editTESTCode();
  };

  const onChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  return (
    <Grid item xs={12} md={6} sx={{ p: 1 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" mb={3}>
          Ajoutez votre quiz
        </Typography>
        <Button
          onClick={test}
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
        >
          Publier
        </Button>
        <TextField
          fullWidth
          label="Code"
          variant="outlined"
          name="code"
          value={gcode}
          onChange={onChange}
          sx={{ mb: 3 }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Question"
              variant="outlined"
              name="question"
              value={quiz.question}
              onChange={onChange}
              required
              minLength={5}
              placeholder="Écrivez votre question ici"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Titre"
              variant="outlined"
              name="title"
              value={quiz.title}
              onChange={onChange}
              required
              minLength={5}
              placeholder="Entrez le titre"
              sx={{ mb: 2 }}
            />
          </Grid>
          {[1, 2, 3, 4].map((optionNumber) => (
            <Grid item xs={6} key={optionNumber}>
              <TextField
                fullWidth
                label={`Option ${optionNumber}`}
                variant="outlined"
                name={`option${optionNumber}`}
                value={quiz[`option${optionNumber}`]}
                onChange={onChange}
                required
                minLength={5}
                placeholder={`Entrez l'option ${optionNumber}`}
                sx={{ mb: 2 }}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Réponse à la question ci-dessus"
              variant="outlined"
              name="answer"
              value={quiz.answer}
              onChange={onChange}
              required
              minLength={5}
              placeholder="Entrez la réponse"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Cette question est-elle QCM :</InputLabel>
              <Select
                value={select}
                onChange={(e) => setSelect(e.target.value)}
              >
                <MenuItem value="oui">Oui</MenuItem>
                <MenuItem value="non">Non</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          disabled={
            quiz.question.length < 5 ||
            quiz.option1.length < 3 ||
            quiz.option2.length < 3 ||
            quiz.option3.length < 3 ||
            quiz.option4.length < 3 ||
            quiz.answer.length < 3
          }
          variant="contained"
          color="primary"
          onClick={handleClick}
          sx={{ width: "100%", mt: 3 }}
        >
          Ajouter un quiz
        </Button>
      </Paper>
    </Grid>
  );
};

export default AddQuiz;
