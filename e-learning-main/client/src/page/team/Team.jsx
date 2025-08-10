import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";

const Team = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/all");
      setRows(
        response.data.map((user) => ({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          password: user.password,
          access:
            user.role === "ADMIN" ? (
              <GrUserAdmin />
            ) : user.role === "STUDENT" ? (
              <PiStudentBold />
            ) : user.role === "FORMATEUR" ? (
              <FaChalkboardTeacher />
            ) : (
              "Inconnu"
            ),
        }))
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const deleteUser = async (id) => {
    // Afficher une alerte de confirmation en utilisant SweetAlert2
    Swal.fire({
      icon: "warning",
      title: "Êtes-vous sûr(e) ?",
      text: "Voulez-vous vraiment supprimer cet utilisateur ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, le supprimer !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/users/delete/${id}`);
          setRows(rows.filter((row) => row.id !== id));
          Swal.fire("Succès !", "Utilisateur supprimé avec succès.", "success");
        } catch (error) {
          console.error(
            "Erreur lors de la suppression de l'utilisateur :",
            error
          );
          Swal.fire(
            "Erreur !",
            "Échec de la suppression de l'utilisateur.",
            "error"
          );
        }
      }
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(
          `http://localhost:3000/api/users/update/${formData.id}`,
          formData
        );
        Swal.fire("Succès !", "Utilisateur mis à jour avec succès.", "success");
        fetchData();
      } else {
        await axios.post("http://localhost:3000/api/users/create", formData);
        Swal.fire("Succès !", "Utilisateur créé avec succès.", "success");
        fetchData();
      }
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
      });
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

  const handleEdit = (user) => {
    setFormData({ ...user });
    handleSubmit();
    // Scroll to the bottom of the page to show the form
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "firstName",
      headerName: "Prénom",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "Nom de famille",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 120,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "access",
      headerName: "Accès",
      width: 120,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              p: "5px",
              borderRadius: "3px",
              textAlign: "center",
              backgroundColor:
                row.access === "Administrateur"
                  ? theme.palette.primary.dark
                  : row.access === "Enseignant"
                  ? theme.palette.secondary.dark
                  : "#5CAFE7",
              color: "#fff",
              minWidth: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {row.access}
          </Box>
        </Box>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      width: 120,
      flex: 1,
      align: "center",
      headerAlign: "center",
      Padding: 10,
      renderCell: ({ row }) => (
        <>
          <DeleteIcon
            style={{ color: "red" }}
            onClick={() => deleteUser(row.id)}
          />

          <EditIcon
            onClick={() => handleEdit(row)}
            style={{ marginRight: "10px" }}
            color="primary"
          />
        </>
      ),
    },
  ];

  return (
    <Box>
      <Header title={"ÉQUIPE"} subTitle={"Gestion des membres de l'équipe"} />

      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Modifier un utilisateur</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            label="Prénom"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="lastName"
            label="Nom de famille"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="E-mail"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            name="role"
            label="Rôle"
            value={formData.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="ADMIN">Administrateur</MenuItem>
            <MenuItem value="STUDENT">Étudiant</MenuItem>
            <MenuItem value="FORMATEUR">Enseignant</MenuItem>
          </TextField>
          <TextField
            name="password"
            label="Mot de passe"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained" color="primary">
              modifier
            </Button>
            {formData.id && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setFormData({})}
              >
                Effacer
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Team;
