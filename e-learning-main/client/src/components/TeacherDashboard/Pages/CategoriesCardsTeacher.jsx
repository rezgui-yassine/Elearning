import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { FaRegEye } from "react-icons/fa";

const CategoriesCardsTeacher = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track the selected category
  const navigate = useNavigate(); // Initialize useNavigate hook

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
      fetchCategories(); // Update categories after joining
    } catch (error) {
      console.error("Error joining category:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/coursAtachmentTeacher/${categoryId}`); // Navigate to CoursAtachment page with category ID
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Tous les categories
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <Card onClick={() => handleCategoryClick(category._id)}>
              {" "}
              {/* Handle click event to navigate to CoursAtachment page */}
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:3000/api/categories/getImage/${category._id}`}
                alt={category.name}
              />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tous les cours:{" "}
                  {category.courses ? category.courses.length : 0}
                </Typography>

                <FaRegEye
                  onClick={() => {
                    joinCategory(category._id);
                    setSelectedCategory(category._id);
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoriesCardsTeacher;
