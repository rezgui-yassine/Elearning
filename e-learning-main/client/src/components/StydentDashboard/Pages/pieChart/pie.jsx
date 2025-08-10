import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import { Box, useTheme } from "@mui/material";

const Pie = ({ isDashboard = false }) => {
  const [data, setData] = useState([]);
  const theme = useTheme();

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
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ height: isDashboard ? "200px" : "75vh" }}>
      {data.length > 0 && (
        <ResponsivePie
          data={data}
          theme={{
            // Your theme configuration here
          }}
          margin={
            isDashboard
              ? { top: 10, right: 0, bottom: 10, left: 0 }
              : { top: 40, right: 80, bottom: 80, left: 80 }
          }
          innerRadius={isDashboard ? 0.8 : 0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "nivo" }}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={theme.palette.text.primary}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          enableArcLabels={isDashboard ? false : true}
          enableArcLinkLabels={isDashboard ? false : true}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            // Your defs configuration here
          ]}
          fill={[
            // Your fill configuration here
          ]}
          legends={
            isDashboard
              ? []
              : [
                  // Your legends configuration here
                ]
          }
        />
      )}
    </Box>
  );
};

export default Pie;