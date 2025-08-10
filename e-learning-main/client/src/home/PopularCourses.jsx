import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { FaClock, FaUser } from "react-icons/fa";

function PopularCourses() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/categories/all"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const joinCategory = async (categoryId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/categories/join/${categoryId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCategories(); // Optionally, update the list of categories after joining
    } catch (error) {
      console.error("Error joining category:", error);
    }
  };

  const calculatePeriod = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} Days`;
  };

  return (
    <Container fluid className="py-5" id="cours">
      <Container>
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
         
          <h1 className="mb-5">Cours Populaires</h1>
        </div>
        <Grid container spacing={4} justifyContent="center">
          {categories.map((category) => (
            <Grid item lg={4} md={6} key={category._id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Card
                  className="wow fadeInUp"
                  data-wow-delay="0.1s"
                  style={{ flexGrow: 1 }}
                >
                  <img
                    className="img-fluid"
                    src={`http://localhost:3000/api/categories/getImage/${category._id}`}
                    alt=""
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {category.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {category.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      href="\signup"
                      variant="contained"
                      color="primary"
                      onClick={() => joinCategory(category._id)}
                    >
                      Inscrivez-vous
                    </Button>
                    <Button href="#" variant="contained" color="primary">
                      Lire plus
                    </Button>
                  </CardActions>
                  <div className="d-flex border-top">
                    <Typography className="flex-fill text-center border-end py-2">
                      <FaClock className="text-primary me-2" />
                      {calculatePeriod(category.dateDebut, category.dateFin)}
                    </Typography>
                    <Typography className="flex-fill text-center py-2">
                      <FaUser className="text-primary me-2" />
                      {category.users.length} Students
                    </Typography>
                  </div>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default PopularCourses;
