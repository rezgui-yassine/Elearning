import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "./BarChart"; // Import the BarChart component
import axios from "axios";

const BarChartPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories/all"
        );
        const formattedData = response.data.reduce((acc, category) => {
          const month = category.name; // Use category name as the month
          const value = category.courses.length; // Use the number of courses as the value
          if (!acc[month]) {
            acc[month] = { month };
          }
          acc[month][category.name] = value;
          return acc;
        }, {});
        setData(Object.values(formattedData));
        console.log("formattedData", formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Header title="Bar Chart" subTitle="Numéro de Cours dans Catégorie" />
      <BarChart dataset={data} /> {/* Pass the dataset to the BarChart */}
    </Box>
  );
};

export default BarChartPage;
