import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';

const PieChartDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories/all"
        );
        const formattedData = response.data.map((category) => ({
          title: category.name,
          value: category.courses.length,
          color: getRandomColor(), // You can define a function to generate random colors
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getRandomColor = () => {
    // Generate a random color code
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  return (
    <div>
      <h2>Pie Chart Dashboard</h2>
      <PieChart
        data={data}
        label={({ dataEntry }) => ${dataEntry.title}: ${dataEntry.value}}
        labelStyle={{
          fontSize: '5px',
          fontFamily: 'sans-serif',
          fill: '#fff'
        }}
      />
    </div>
  );
};

export default PieChartDashboard;