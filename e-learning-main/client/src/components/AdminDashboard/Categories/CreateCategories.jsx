import axios from "axios";
import { useState } from "react";

function CreateCategories() {
  const [formItems, setFormItems] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    dateDebut: "",
    dateFin: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/categories/create",
        formItems
      );
      console.log("Category created:", response.data);
    } catch (error) {
      console.error("Error creating category:", error.message);
    }
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
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Course</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={formItems.title}
              onChange={(e) => handleInputChange(e, "title")}
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
  );
}

export default CreateCategories;
