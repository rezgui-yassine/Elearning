import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { Button, Form, FormControl } from "react-bootstrap";

import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import animationData from "../Assets/animation.json";
import animation from "../Assets/Animation - 1714943473279.json"
import Lottie from 'react-lottie';
import "./Registre.css";

const Registre = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "STUDENT", 
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

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/signup", data)
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Inscription réussie",
          html: `Vous êtes inscrit avec succès! Veuillez vérifier votre email (${data.email}) pour l'activation.`,
          timer: 3000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Erreur lors de l'inscription",
          text: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
          timer: 3000,
          showConfirmButton: false,
        });
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
                  <Form.Group controlId="firstName" className="input-box">
                    <Form.Label>Nom</Form.Label>
                    <FormControl
                      type="text"
                      placeholder="Nom"
                      className="input"
                      {...register("firstName", { required: true })}
                      style={{
                        borderColor: errors.firstName ? "red" : "",
                      }}
                    />
                    {errors?.firstName && (
                      <span style={{ color: "red" }}>{errors.firstName?.message}</span>
                    )}
                  </Form.Group>

                  <Form.Group controlId="lastName" className="input-box">
                    <Form.Label>Prénom</Form.Label>
                    <FormControl
                      type="text"
                      placeholder="Prénom"
                      className="input"
                      {...register("lastName", { required: true })}
                      style={{
                        borderColor: errors.lastName ? "red" : "",
                      }}
                    />
                    {errors?.lastName && (
                      <span style={{ color: "red" }}>{errors.lastName?.message}</span>
                    )}
                  </Form.Group>

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

                  <Form.Group controlId="role" className="input-box">
                    <Form.Label>Rôle</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        type="radio"
                        label="Étudiant"
                        {...register("role", { required: true })}
                        value="STUDENT"
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="Formateur"
                        {...register("role", { required: true })}
                        value="FORMATEUR"
                      />
                    </div>
                    {errors?.role && (
                      <span style={{ color: "red" }}>Le rôle est requis</span>
                    )}
                  </Form.Group>
                  <Button type="submit" color="primary" block>
                    S'inscrire
                  </Button>
                </Form>
                <div className="mt-3 text-center">
                  Vous avez déjà un compte ?{" "}
                  <Link to={"/login"} style={{ color: "blue" }}>
                    Connexion
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

export default Registre;
