import { useState, useEffect, createContext } from "react";
import quizContext from "./quizContext";

const QuizState = (props) => {
  const host = "http://localhost:3000";
  const quizsInitial = [];
  const [quizs, setQuizs] = useState(quizsInitial);
  const [user, setUser] = useState(null); // State to store user information

  // Function to fetch user information and obtain token
  const fetchUserAndToken = async () => {
    try {
      const response = await fetch(`${host}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      setUser(userData.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  };


  
  // Fetch user information and token on component mount
  useEffect(() => {
     fetchUserAndToken();
    
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Get quiz
  const getQuizs = async () => {
    try {
      // Fetch user information and token if not already fetched
      if (!user) {
        await fetchUserAndToken();
      }
  
      // API Call to fetch quizzes
      const response = await fetch(`${host}/api/quiz/fetchallquiz`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
  
      const json = await response.json();
      setQuizs(json);
      console.log(json);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setQuizs([]); // Réinitialiser les quizs à une liste vide en cas d'erreur
    }
  };
  

  // Add a quiz
  const addQuiz = async (
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    title,
    mcq
  ) => {
    try {
      const response = await fetch(`${host}/api/quiz/addquiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          question,
          option1,
          option2,
          option3,
          option4,
          answer,
          title,
          mcq,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add quiz");
      }

      const quiz = await response.json();
      setQuizs([...quizs, quiz]);
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };

  // Delete a quiz
  const deleteQuiz = async (id) => {
    try {
      const response = await fetch(`${host}/api/quiz/deletequiz/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete quiz");
      }

      await response.json();
      const newQuizs = quizs.filter((quiz) => quiz._id !== id);
      setQuizs(newQuizs);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  // Edit a quiz
  const editQuiz = async (
    id,
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    title,
    mcq,
    code
  ) => {
    try {
      const response = await fetch(`${host}/api/quiz/updatequiz/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          question,
          option1,
          option2,
          option3,
          option4,
          answer,
          title,
          mcq,
          code,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit quiz");
      }

      await response.json();

      const updatedQuizs = quizs.map((quiz) =>
        quiz._id === id
          ? {
              ...quiz,
              question,
              option1,
              option2,
              option3,
              option4,
              answer,
              title,
              mcq,
              code,
            }
          : quiz
      );
      setQuizs(updatedQuizs);
    } catch (error) {
      console.error("Error editing quiz:", error);
    }
  };

  // Edit a Quiz Code
  const editCode = async (code) => {
    try {
      const response = await fetch(`${host}/api/quiz/updatecode/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit code");
      }

      await response.json();

      const updatedQuizs = quizs.map((quiz) =>
        quiz.user === user._id ? { ...quiz, code } : quiz
      );
      setQuizs(updatedQuizs);
    } catch (error) {
      console.error("Error editing code:", error);
    }
  };

  return (
    <quizContext.Provider
      value={{ quizs, addQuiz, deleteQuiz, editQuiz, getQuizs, editCode, user }}
    >
      {props.children}
    </quizContext.Provider>
  );
};

export default QuizState;