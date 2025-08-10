import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import axios from "axios";

const Row2 = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/all");
        setUsers(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      }
    };

    fetchUsers();
  }, []);

  return (
    <Stack direction={"row"} flexWrap={"wrap"} gap={1.2} mt={1.3}>
      <Paper sx={{ maxWidth: 900, flexGrow: 1, minWidth: "400px" }}>
        <Stack
          alignItems={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        ></Stack>
      </Paper>

      <Paper
        sx={{
          maxWidth: 900,
          flexGrow: 1,
          minWidth: "400px",
          overflowY: "scroll", // Ajoutez le défilement vertical
          maxHeight: "500px", // Définissez la hauteur maximale de la liste
        }}
      >
        <Stack
          // alignItems={"center"}
          direction={"column"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          marginRight={"20px"}
        >
          <Box>
            <Typography
              color={theme.palette.secondary.main}
              mb={1}
              mt={2}
              ml={4}
              variant="h6"
              fontWeight={"bold"}
            >
              Liste des Utilisateurs
            </Typography>
            {users.map((user) => (
              <Box
                key={user._id}
                ml={4}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px",
                  marginBottom: "8px",
                }}
              >
                <Typography variant="body2">
                  Prénom: {user.firstName}
                </Typography>
                <Typography variant="body2">Email: {user.email}</Typography>
                <Typography variant="body2">Rôle: {user.role}</Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Row2;
