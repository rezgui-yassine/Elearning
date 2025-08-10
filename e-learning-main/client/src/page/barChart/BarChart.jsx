import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";

const BarChart = ({ dataset }) => {
  // Extract unique categories from the dataset
  const categories = Array.from(
    new Set(
      dataset.flatMap((data) =>
        Object.keys(data).filter((key) => key !== "month")
      )
    )
  );

  // Define colors for each category
  const categoryColors = categories.reduce((acc, category, index) => {
    acc[category] = `hsl(${(index * 360) / categories.length}, 70%, 50%)`;
    return acc;
  }, {});

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh", // Adjust the height as needed
        width: "100%", // Make the bar chart fill the entire width of its container
      }}
    >
      <ResponsiveBar
        data={dataset}
        keys={categories} // Use categories as keys
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={(bar) => categoryColors[bar.id]} // Use bar.id to get the category color
        enableLabel={false}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </Box>
  );
};

export default BarChart;
