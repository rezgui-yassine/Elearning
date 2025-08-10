import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const PieChartComponent = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the API
        const response = await axios.get("http://localhost:3000/api/users/all");
        const users = response.data;

        // Get the number of registrations for each user
        const userRegistrations = users.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});

        // Format data for the pie chart
        const userDataFormatted = Object.entries(userRegistrations).map(
          ([role, count]) => ({
            x: role,
            y: count,
          })
        );

        // Update the state with the formatted data
        setUserData(userDataFormatted);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box style={{ height: "400px", width: "100%" }}>
      <ReactApexChart
        options={{
          chart: {
            type: "pie",
            width: "100%",
          },
          labels: userData.map((entry) => entry.x),
        }}
        series={userData.map((entry) => entry.y)}
        type="pie"
      />
    </Box>
  );
};

export default PieChartComponent;
