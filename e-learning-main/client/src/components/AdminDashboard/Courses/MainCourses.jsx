import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function MainCourses() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formItems, setFormItems] = useState({
    name: "",
    categoryIds: "", // Assuming categoryIds corresponds to the selected category ID
  });
  const getCategoryName = (categoryIds) => {
    const category = categories.find((cat) => cat._id === categoryIds);
    return category ? category.name : "";
  };

  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:3000/api/categories/all")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch courses
    axios
      .get("http://localhost:3000/api/courses/all")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedCategory = categories.find(
        (category) => category._id === formItems.categoryIds
      );

      if (!selectedCategory) {
        throw new Error("Please select a category");
      }

      const courseData = {
        ...formItems,
      };

      axios
        .post("http://localhost:3000/api/courses/create", courseData)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Course created successfully",
            timer: 1000, // Set a timeout for 1 second
          });
          // Refresh courses after creating
          fetchData();
          handleCloseModal();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to create course",
          });
          console.log(error);
        });
    } catch (error) {
      console.error("Error creating course:", error.message);
    }
  };

  const fetchData = () => {
    // Fetch courses after creating a new one
    axios
      .get("http://localhost:3000/api/courses/all")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event, fieldName) => {
    const { value } = event.target;
    setFormItems((prevFormItems) => ({
      ...prevFormItems,
      [fieldName]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">List of Courses</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="success" onClick={handleShowModal}>
          Add New Course
        </Button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course, index) => (
              <tr key={index}>
                <td>{course._id}</td>
                <td>{course.name}</td>

                <td>{getCategoryName(course.categoryIds)}</td>

                <td>
                  <Link to={`/readCourse/${course._id}`}>
                    <Button variant="info" className="me-2">
                      Read
                    </Button>
                  </Link>
                  <Button variant="primary" className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" className="me-2">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={formItems.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={formItems.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
            </div>
            <div className="mb-3">
              <Form.Label>ImageUrl</Form.Label>
              <Form.Control
                type="text"
                value={formItems.imageUrl}
                onChange={(e) => handleInputChange(e, "imageUrl")}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formItems.price}
                onChange={(e) => handleInputChange(e, "price")}
              />
            </div>
            <div className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formItems.categoryIds}
                onChange={(e) => handleInputChange(e, "categoryIds")}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                    {console.log(category.name)}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MainCourses;
