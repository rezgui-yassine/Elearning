import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function MainUsers() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formItems, setFormItems] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });
  const [modalMode, setModalMode] = useState("create");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/all");
      setData(response.data); // Assuming response.data is an array of users
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error (e.g., display error message)
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/create",
        formItems
      );
      console.log("User saved:", response.data);
      showAlert("success", "Success", "User created successfully");
      resetForm();
      fetchData(); // Call fetchData again to fetch updated user data
      handleCloseModal();
    } catch (error) {
      console.error("Error saving user:", error.message);
      showAlert("error", "Error", "Failed to create user");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/update/${formItems.id}`,
        formItems
      );
      console.log("User updated:", response.data);
      showAlert("success", "Success", "User updated successfully");
      resetForm();
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error.message);
      showAlert("error", "Error", "Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/api/users/delete/${id}`
          );
          console.log("User deleted:", response.data);
          showAlert("success", "Success", "User deleted successfully");
          fetchData();
          handleCloseModal();
        } catch (error) {
          console.error("Error deleting user:", error.message);
          showAlert("error", "Error", "Failed to delete user");
        }
      }
    });
  };

  const handleShowModal = (mode, user = null) => {
    setModalMode(mode);
    setShowModal(true);
    if (mode === "update" && user) {
      setFormItems({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        password: user.password,
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
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      password: "",
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
      <h1 className="text-center mb-4">List of Users</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-end mb-3">
            <Button variant="success" onClick={() => handleShowModal("create")}>
              Add User
            </Button>
          </div>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                  <tr key={index}>
                    <td>{user._id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => handleShowModal("update", user)}
                      >
                        Update
                      </Button>
                      <Link to={`/users/${user._id}`}>
                        <Button className="btn btn-primary me-2">Read</Button>
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
                {modalMode === "create" ? "Add New User" : "Update User"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formItems.firstName}
                    onChange={(e) =>
                      setFormItems({ ...formItems, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formItems.lastName}
                    onChange={(e) =>
                      setFormItems({
                        ...formItems,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formItems.email}
                    onChange={(e) =>
                      setFormItems({
                        ...formItems,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formItems.password}
                    onChange={(e) =>
                      setFormItems({ ...formItems, password: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    value={formItems.role}
                    onChange={(e) =>
                      setFormItems({ ...formItems, role: e.target.value })
                    }
                  />
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                {modalMode === "create" ? "Save" : "Update"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default MainUsers;
