import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

function UpdateCategories() {
  const [data, setData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    dateDebut: "",
    dateFin: "",
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/categories/getCategoryById/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Handle update category
  const handleUpdateCategory = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/categories/update/${id}`,
        data
      );
      console.log("Category updated:", response.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Category updated successfully",
        timer: 1000,
      });
    } catch (error) {
      console.error("Error updating category:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update category",
      });
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Mis à jour de Catégorie</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <div className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={data.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={data.imageUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={data.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Date Debut</Form.Label>
              <Form.Control
                type="date"
                name="dateDebut"
                value={data.dateDebut}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Date Fin</Form.Label>
              <Form.Control
                type="date"
                name="dateFin"
                value={data.dateFin}
                onChange={handleInputChange}
              />
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" onClick={handleUpdateCategory}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default UpdateCategories;
