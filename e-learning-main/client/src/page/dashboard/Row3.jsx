import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";

import React from "react";
// import LineChart from "../barChart/LineChart";
import BarChart from "../barChart/BarChartPage ";
import PieChartComponent from "../pieChart/PieChartComponent";

const Row3 = () => {
  const theme = useTheme();
  return (
    <Stack gap={1.5} direction={"row"} flexWrap={"wrap"} mt={1.4}>
      <Paper sx={{ flexGrow: 1, minWidth: "400px", width: "28%" }}>
        <BarChart isDashbord={true} />
      </Paper>

      <Paper sx={{ flexGrow: 1, minWidth: "400px", width: "33%" }}>
        <PieChartComponent isDashbord={true} />
      </Paper>
    </Stack>
  );
};

export default Row3;
