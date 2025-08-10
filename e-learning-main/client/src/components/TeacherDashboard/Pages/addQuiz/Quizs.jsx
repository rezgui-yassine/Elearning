import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import quizContext from "../../context/quizContext";
import AddQuiz from "./AddQuiz";
import QuizItem from "./QuizItem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

const Quizs = (props) => {
  const context = useContext(quizContext);
  const { quizs, getQuizs, editQuiz } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getQuizs();
    } else {
      navigate("/login");
    }
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [quiz, setQuiz] = useState({
    id: "",
    equestion: "",
    eoption1: "",
    eoption2: "",
    eoption3: "",
    eoption4: "",
    eanswer: "",
    user: "",
  });

  const showAlert = (message, type) => {
    Swal.fire({
      text: message,
      icon: type,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const updateQuiz = () => {
    editQuiz(
      quiz.id,
      quiz.equestion,
      quiz.eoption1,
      quiz.eoption2,
      quiz.eoption3,
      quiz.eoption4,
      quiz.eanswer
    );
    handleClose();
    showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddQuiz showAlert={showAlert} />
      <div className="my-3 row gy-2">
        <h2>votre quiz</h2>
        <div className="container">
          {quizs.length === 0 && "No notes to display"}
        </div>
        {quizs.map((quiz) => (
          <QuizItem
            key={quiz._id}
            quiz={quiz}
            showAlert={showAlert}
            updateQuiz={() => {
              setQuiz({
                id: quiz._id,
                equestion: quiz.question,
                eoption1: quiz.option1,
                eoption2: quiz.option2,
                eoption3: quiz.option3,
                eoption4: quiz.option4,
                eanswer: quiz.answer,
              });
              handleShow();
            }}
          />
        ))}
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="equestion">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question"
                name="equestion"
                value={quiz.equestion}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="eoption1">
              <Form.Label>Option 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter option 1"
                name="eoption1"
                value={quiz.eoption1}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="eoption2">
              <Form.Label>Option 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter option 2"
                name="eoption2"
                value={quiz.eoption2}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="eoption3">
              <Form.Label>Option 3</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter option 3"
                name="eoption3"
                value={quiz.eoption3}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="eoption4">
              <Form.Label>Option 4</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter option 4"
                name="eoption4"
                value={quiz.eoption4}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="eanswer">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter answer"
                name="eanswer"
                value={quiz.eanswer}
                onChange={onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateQuiz}>
            Update Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Quizs;
