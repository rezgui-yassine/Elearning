import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

function UsersProfile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/all");
      const updatedUsers = response.data.map((user) => ({
        ...user,
        id: user._id,
      }));
      setCategories(updatedUsers);
    } catch (error) {
      console.error("Erreur lors de la récupération des users :", error);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {users.map((user) => (
        <Card key={user._id} style={{ width: "18rem", margin: "1rem" }}>
          <Card.Img variant="top" src={user.avatar} />
          <Card.Body>
            <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
            <Card.Text>{user.bio}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default UsersProfile;
