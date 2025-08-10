import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Button, TextField } from "@mui/material";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    imageUrl: null,
    price: "",
    dateDebut: "",
    dateFin: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/categories/all"
      );
      const updatedCategories = response.data.map((category) => ({
        ...category,
        id: category._id,
      }));
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      icon: "warning",
      title: "Êtes-vous sûr(e) ?",
      text: "Voulez-vous vraiment supprimer cette catégorie ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:3000/api/categories/delete/${id}`
          );
          setCategories(categories.filter((category) => category.id !== id));
          Swal.fire("Succès !", "Catégorie supprimée avec succès.", "success");
        } catch (error) {
          console.error(
            "Erreur lors de la suppression de la catégorie :",
            error
          );
          Swal.fire(
            "Erreur !",
            "Échec de la suppression de la catégorie.",
            "error"
          );
        }
      }
    });
  };

  const handleUpdateClick = (category) => {
    setFormData({
      id: category.id,
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      dateDebut: category.dateDebut,
      dateFin: category.dateFin,
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "imageUrl") {
      if (e.target.files.length > 0) {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("name", formData.name);
      formDataUpload.append("description", formData.description);
      formDataUpload.append("price", formData.price);
      formDataUpload.append("dateDebut", formData.dateDebut);
      formDataUpload.append("dateFin", formData.dateFin);

      // Vérifiez si une nouvelle image a été sélectionnée
      if (formData.imageUrl instanceof File) {
        formDataUpload.append(
          "imageUrl",
          formData.imageUrl,
          formData.imageUrl.name
        );
      }

      if (formData.id) {
        await axios.put(
          `http://localhost:3000/api/categories/update/${formData.id}`,
          formDataUpload
        );
        Swal.fire("Succès !", "Catégorie mise à jour avec succès.", "success");
      } else {
        await axios.post(
          "http://localhost:3000/api/categories/create",
          formDataUpload
        );
        Swal.fire("Succès !", "Catégorie créée avec succès.", "success");
      }

      setFormData({
        id: "",
        name: "",
        description: "",
        imageUrl: null,
        price: "",
        dateDebut: "",
        dateFin: "",
      });
      fetchData();
    } catch (error) {
      console.error("Erreur :", error);
      Swal.fire("Erreur !", "Échec de l'opération.", "error");
    }
  };

  return (
    <Box>
      <Header
        title={"Gestion des catégories"}
        subTitle={"Gérez vos catégories"}
      />

      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid
          rows={categories}
          columns={[
            { field: "name", headerName: "Nom", width: 100 },
            { field: "description", headerName: "Description", width: 200 },
            { field: "imageUrl", headerName: "URL de l'image", width: 200 },
            { field: "price", headerName: "Prix", width: 100 },
            { field: "dateDebut", headerName: "Date de début", width: 200 },
            { field: "dateFin", headerName: "Date de fin", width: 200 },
            {
              field: "action",
              headerName: "Action",
              width: 400,
              renderCell: ({ row }) => (
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(row.id)}
                    style={{
                      marginRight: "8px",
                      backgroundColor: "#007198",
                      color: "#fff",
                    }}
                  >
                    Supprimer
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateClick(row)}
                    style={{
                      marginRight: "8px",
                      backgroundColor: "#0594D0",
                      color: "#fff",
                    }}
                  >
                    Modifier
                  </Button>
                  <Link to={`/courCatgeoTeacher/${row.id}`}>
                    <Button
                      style={{ backgroundColor: "#3498DB", color: "#fff" }}
                    >
                      Lire
                    </Button>
                  </Link>
                </Box>
              ),
            },
          ]}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">
          Ajouter / Mettre à jour une catégorie
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Nom"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            accept="image/*"
            name="imageUrl"
            onChange={handleChange}
          />
          <TextField
            name="price"
            label="Prix"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="dateDebut"
            label="Date de début"
            type="date"
            value={formData.dateDebut}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="dateFin"
            label="Date de fin"
            type="date"
            value={formData.dateFin}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            {formData.id
              ? "Mettre à jour la catégorie"
              : "Ajouter une catégorie"}
          </Button>
          {formData.id && (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setFormData({
                  id: "",
                  name: "",
                  description: "",
                  imageUrl: null,
                  price: "",
                  dateDebut: "",
                  dateFin: "",
                })
              }
            >
              Effacer
            </Button>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default CategoriesManagement;
