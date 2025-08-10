import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const [formItems, setFormItems] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",

    categoryIds: "",
  });
  const [categories, setCategories] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories
    axios
      .get("http://localhost:3000/api/categories/all")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
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
      console.log(courseData);

      axios
        .post("http://localhost:3000/api/courses/create", courseData)
        .then((response) => {
          console.log(response);
          // navigate("/mainCourses");
        })
        .catch((error) => {
          console.log(error);
        });

      // console.log("Course created:", response.data);
      // navigate("/mainCourses");
    } catch (error) {
      console.error("Error creating course:", error.message);
    }
  };

  const handleChange = (e) => {
    setFormItems({
      ...formItems,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w50 border bg-white shadow px-5 pt-3  pb-5  rounded  ">
        <h1>Add a Course</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              required
              value={formItems.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              required
              value={formItems.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">
              Image URL
            </label>
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              name="imageUrl"
              required
              value={formItems.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              required
              value={formItems.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              name="categoryIds"
              value={formItems.categoryIds}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Course
          </button>
          <input type="reset" className="btn btn-danger ms-2" value="Reset" />
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
