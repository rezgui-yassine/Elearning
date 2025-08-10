import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function MainCategories() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null); // State to hold the selected file
  // Update the formItems state to hold the file object
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const [formItems, setFormItems] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    dateDebut: "",
    dateFin: "",
  });
  const [modalMode, setModalMode] = useState("create"); // State to track modal mode (create/update)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/categories/all"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", formItems.name);
      formData.append("description", formItems.description);
      formData.append("price", formItems.price);
      formData.append("dateDebut", formItems.dateDebut);
      formData.append("dateFin", formItems.dateFin);
      formData.append("imageUrl", file); // Append the file to the form data

      const response = await axios.post(
        "http://localhost:3000/api/categories/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Category saved:", response.data);
      showAlert("success", "Succès", "Catégorie enregistrée avec succès");
      resetForm();
      fetchData();
      handleCloseModal(); // Close modal after successful creation
    } catch (error) {
      console.error("Error saving category:", error.message);
      showAlert("error", "Erreur", "Échec de l'enregistrement de la catégorie");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/categories/update/${formItems.id}`,
        formItems
      );
      console.log("Category updated:", response.data);
      showAlert("success", "Succès", "Catégorie mise à jour avec succès");
      resetForm();
      fetchData();
      handleCloseModal(); // Close modal after successful creation
    } catch (error) {
      console.error("Error updating category:", error.message);
      showAlert("error", "Erreur", "Échec de la mise à jour de la catégorie");
    }
  };

  const handleDelete = async (id) => {
    // Display confirmation alert using SweetAlert2
    Swal.fire({
      icon: "attention",
      title: "Tu es sûr ?",
      text: "Voulez-vous supprimer cette catégorie?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/api/categories/delete/${id}`
          );
          console.log("Category deleted:", response.data);
          showAlert("success", "Succès", "Catégorie supprimée avec succès");
          fetchData();
          handleCloseModal(); // Close modal after successful updating
        } catch (error) {
          console.error("Error deleting category:", error.message);
          showAlert(
            "error",
            "Erreur",
            "Échec de la suppression de la catégorie"
          );
        }
      }
    });
  };

  const handleShowModal = (mode, category = null) => {
    setModalMode(mode);
    setShowModal(true);
    if (mode === "update" && category) {
      setFormItems({
        id: category._id,
        name: category.name,
        description: category.description,
        imageUrl: category.imageUrl,
        price: category.price,
        dateDebut: category.dateDebut,
        dateFin: category.dateFin,
      });
    } else {
      resetForm();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "create") {
      handleCreate();
    } else {
      handleUpdate();
    }
  };

  const resetForm = () => {
    setFormItems({
      name: "",
      description: "",
      imageUrl: "",
      price: "",
      dateDebut: "",
      dateFin: "",
    });
  };

  const showAlert = (icon, title, text) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: 1500,
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Liste des catégories</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-end mb-3">
            <Button variant="success" onClick={() => handleShowModal("create")}>
              Ajouter catégorie
            </Button>
          </div>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prix</th>
                  <th>Date Debut</th>
                  <th>Date Fin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((category, index) => (
                  <tr key={index}>
                    <td>{category._id}</td>
                    <td>{category.name}</td>
                    <td>{category.price}</td>
                    <td>{category.dateDebut}</td>
                    <td>{category.dateFin}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(category._id)}
                      >
                        Supprimer
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => handleShowModal("update", category)}
                      >
                        Mettre à jour
                      </Button>
                      <Link to={`/cousesInCategories/${category._id}`}>
                        <Button className="btn btn-primary me-2">Lire</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {modalMode === "create"
                  ? "Ajouter une nouvelle catégorie"
                  : "Mettre à jour la catégorie"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    value={formItems.name}
                    onChange={(e) =>
                      setFormItems({ ...formItems, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={formItems.description}
                    onChange={(e) =>
                      setFormItems({
                        ...formItems,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control
                    type="number"
                    value={formItems.price}
                    onChange={(e) =>
                      setFormItems({ ...formItems, price: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Date Debut</Form.Label>
                  <Form.Control
                    type="date"
                    value={formItems.dateDebut}
                    onChange={(e) =>
                      setFormItems({ ...formItems, dateDebut: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Date Fin</Form.Label>
                  <Form.Control
                    type="date"
                    value={formItems.dateFin}
                    onChange={(e) =>
                      setFormItems({ ...formItems, dateFin: e.target.value })
                    }
                  />
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Fermer
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                {modalMode === "create" ? "Enregistrer" : "Mettre à jour"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default MainCategories;
