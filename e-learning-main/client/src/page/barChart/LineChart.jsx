import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

const LineChart = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupérer les données utilisateur depuis l'API
        const response = await axios.get("http://localhost:3000/api/users/all");
        const users = response.data;

        // Filtrer les utilisateurs ayant le rôle "STUDENT"
        const studentUsers = users.filter(user => user.role === "STUDENT");

        // Compter le nombre d'utilisateurs par mois
        const userCountByMonth = studentUsers.reduce((acc, user) => {
          const registrationDate = new Date(user.createdAt);
          const year = registrationDate.getFullYear();
          const month = registrationDate.getMonth();

          // Utiliser une chaîne de caractères pour représenter l'année et le mois
          const key = `${year}-${month}`;

          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        // Formatter les données pour le graphique
        const userDataFormatted = Object.entries(userCountByMonth).map(([key, count]) => ({
          x: key, // Utiliser la clé (année-mois) comme valeur x
          y: count
        }));

        // Mettre à jour le state avec les données formatées
        setUserData(userDataFormatted);
        console.log(userDataFormatted);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchUserData();
  }, []);

  // Fonction de formatage pour mapper les valeurs numériques des mois aux noms de mois
  const formatMonth = (value) => {
    const months = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    const [year, month] = value.split("-");
    return `${months[parseInt(month, 10)]} ${year}`;
  };

  return (
    <Box style={{ height: "400px" }}>
      <ResponsiveLine
        data={[{ id: "User Registration", data: userData }]}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        xScale={{ type: "point" }} // Utiliser "point" pour l'échelle x
        yScale={{ type: "linear", min: 0 }} // Minimum de 0 pour l'axe y
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Month",
          legendOffset: 36,
          legendPosition: "middle",
          format: formatMonth // Utiliser la fonction de formatage pour afficher les noms de mois
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of Users",
          legendOffset: -40,
          legendPosition: "middle"
        }}
        colors={{ scheme: "paired" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        enableGridX={true} // Ajout de lignes d'axe pour l'axe x
        enableGridY={true} // Ajout de lignes d'axe pour l'axe y
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default LineChart;
