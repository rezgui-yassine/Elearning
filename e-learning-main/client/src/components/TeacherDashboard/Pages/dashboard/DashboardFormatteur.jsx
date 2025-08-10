import React from "react";
import StudentsInTeacher from "../StudentsInTeacher/StudentsInTeacher";
import ScrollableCategories from "../../../../page/ScrollableCategories/ScrollableCategories";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import Header from "../../navigations/Header";

const DashboardFormatteur = () => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {" "}
        <Header
          isDashboard={true}
          title={"LinkHub"}
          subTitle={"Bienvenue dans votre tableau de bord"}
        />
      </Stack>
      <Box sx={{ mb: theme.spacing(3) }}>
        <Typography variant="h6"> Étudiants</Typography>
        <StudentsInTeacher />
      </Box>
      <Box>
        <Typography variant="h6"> Catégories</Typography>
        <ScrollableCategories />
      </Box>
    </div>
  );
};

export default DashboardFormatteur;
