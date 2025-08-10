import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import Pie from "./pie";
import axios from "axios";

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories/all"
        );
        const formattedData = response.data.map((category) => ({
          id: category.name,
          label: category.name,
          value: category.courses.length,
        }));
        setData(formattedData);
        console.log("formattedData", formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ marginTop: "20px" }}>
      {" "}
      {/* Add marginTop style here */}
      <Header title="Pie Chart" subTitle="Numéro de Cours dans Catégorie" />
      <Pie data={data} />
    </Box>
  );
};

export default PieChart;
