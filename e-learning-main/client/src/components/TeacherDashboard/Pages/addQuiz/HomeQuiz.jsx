import React from "react";
// import AddQuiz from "./AddQuiz";
import Quizs from "./Quizs";

const HomeQuiz = (props) => {
  const { showAlert } = props;
  return (
    <div>
      <Quizs showAlert={showAlert} />
    </div>
  );
};



export default HomeQuiz;
