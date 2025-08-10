import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import Pie from "../pieChart/pie";
import React from "react";
// import Bar from "../barChart/bar";


const Row3 = () => {
  const theme = useTheme();
  return (
    <Stack gap={1.5} direction={"row"} flexWrap={"wrap"} mt={1.4}>
      <Paper sx={{ flexGrow: 1, minWidth: "400px", width: "28%" }}>
        <Typography
          color={theme.palette.secondary.main}
          sx={{ padding: "30px 30px 0 30px" }}
          variant="h6"
          fontWeight="600"
        >
          Numbre des catgoresies avec les cours
        </Typography>

        <Pie isDashbord={true} />

      </Paper>


    </Stack>
  );
};

export default Row3;