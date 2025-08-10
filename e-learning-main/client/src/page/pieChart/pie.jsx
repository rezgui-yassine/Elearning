import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, useTheme } from "@mui/material";

const Pie = ({ data, isDashbord = false }) => {
  // Ajoutez "data" comme prop
  const theme = useTheme();
  return (
    <Box sx={{ height: isDashbord ? "200px" : "75vh" }}>
      <ResponsivePie
        data={data} // Utilisez les données passées en props
        theme={
          {
            // Vos options de thème
          }
        }
        // Autres propriétés du composant ResponsivePie
      />
    </Box>
  );
};

export default Pie;
