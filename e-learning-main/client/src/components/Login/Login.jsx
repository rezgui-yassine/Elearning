import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import animationData from "../Assets/animation.json";
import animation from "../Assets/Animation - 1714943473279.json";
import Lottie from 'react-lottie';
import "../../css/login.css";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Button, Form, FormControl } from "react-bootstrap";

const Login = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const { errors } = formState;
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/login", data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Connexion réussie",
          text: "Vous êtes connecté avec succès!",
          timer: 1000,
          showConfirmButton: false,
        });

        localStorage.setItem("token", response.data.token);

        // Rediriger en fonction du rôle de l'utilisateur
        const role = response.data.user.role;
        switch (role) {
          case "STUDENT":
            navigate("/dashboard/student");
            break;
          case "FORMATEUR":
            navigate("/dashboard/teacher");
            break;
          case "ADMIN":
            navigate("/dashboard/admin");
            break;
          default:
            // Traiter d'autres rôles ou cas inattendus
            break;
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Erreur de Connexion",
            text: "Utilisateur non trouvé. Veuillez vérifier votre email.",
          });
        } else if (error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Erreur de Connexion",
            text: "Email ou mot de passe incorrect. Veuillez réessayer.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erreur de Connexion",
            text: "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
          });
        }
      });
  };

  return (
    <div className="registration-container">
      <Container className="content-center">
        <Row>
          <Col md={12} className="offset-md-1">
            <Card className="card">
              <CardBody className="card-body">
                <h5 className="mb-4 text-center">Lancer Votre carriere avec Nous 🚀</h5>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="email" className="input-box">
                    <Form.Label>Email</Form.Label>
                    <FormControl
                      type="email"
                      placeholder="Email"
                      className="input"
                      {...register("email", {
                        required: true,
                        pattern: {
                          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Invalid email address",
                        },
                      })}
                      style={{
                        borderColor: errors.email ? "red" : "",
                      }}
                    />
                    {errors?.email && (
                      <span style={{ color: "red" }}>{errors.email?.message}</span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="password" className="input-box">
                    <Form.Label>Mot de passe</Form.Label>
                    <FormControl
                      type="password"
                      placeholder="Mot de passe"
                      className="input"
                      {...register("password", { required: true })}
                      style={{
                        borderColor: errors.password ? "red" : "",
                      }}
                    />
                    {errors?.password && (
                      <span style={{ color: "red" }}>{errors.password?.message}</span>
                    )}
                  </Form.Group>

                  <Button type="submit" color="primary" block>
                    Connexion
                  </Button>
                </Form>
                <div className="mt-3 text-center">
                  Vous n'avez pas de compte ?{" "}
                  <Link to={"/signup"} style={{ color: "blue" }}>
                    Inscrivez-vous ici
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="background-animation-left">
        <Lottie
          options={defaultOptions}
          height={420}
          width={420}
        />
      </div>
      <div className="background-animation-right">
        <Lottie
          options={defaultOptions2}
          height={550}
          width={500}
        />
      </div>
    </div>
  );
};

export default Login;
