// ProfilStudent.js

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Snackbar, Stack } from "@mui/material";
import Header from "../../navigation/Header";
import Swal from "sweetalert2";

function ProfilStudent() {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.user;
      setFormData({ ...userData, id: userData._id });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { id, firstName, lastName, email, password } = formData;
      const updatedData = { id, firstName, lastName, email };

      // Include new password in the data if provided
      if (password) {
        updatedData.password = password;
      }

      await axios.put(
        `http://localhost:3000/api/users/updateUsers/${id}`,
        updatedData
      );

      Swal.fire("Succès !", "Profil mis à jour avec succès.", "success");

      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      fetchUserData();
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de l'utilisateur :",
        error
      );
      Swal.fire(
        "Erreur !",
        "Échec de l'enregistrement de l'utilisateur.",
        "error"
      );
    }
  };

  return (
    <Box>
      <Header
        title="Modifier mon profil"
        subTitle="Modifiez vos informations ci-dessous"
      />

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <Stack direction={"row"} gap={2}>
          <TextField
            onChange={handleChange}
            name="firstName"
            value={formData.firstName}
            label="Prénom"
            variant="filled"
          />

          <TextField
            onChange={handleChange}
            name="lastName"
            value={formData.lastName}
            label="Nom de famille"
            variant="filled"
          />
        </Stack>

        <TextField
          onChange={handleChange}
          name="email"
          value={formData.email}
          label="E-mail"
          variant="filled"
        />

        <TextField
          onChange={handleChange}
          name="password"
          value={formData.password}
          label="Mot de passe"
          variant="filled"
          type="password"
        />

        <Box sx={{ textAlign: "right" }}>
          <Button
            onClick={handleUpdateProfile}
            sx={{ textTransform: "capitalize" }}
            variant="contained"
          >
            Enregistrer les modifications
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            message="Profil mis à jour avec succès."
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilStudent;
