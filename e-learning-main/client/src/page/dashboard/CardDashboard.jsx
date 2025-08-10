import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaUserGraduate, FaChalkboardTeacher, FaUserTie } from "react-icons/fa";

const CardDashboard = () => {
  const [userCounts, setUserCounts] = useState({
    ADMIN: 0,
    FORMATEUR: 0,
    STUDENT: 0,
  });

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/all");
        const users = response.data;
        const counts = users.reduce(
          (acc, user) => {
            acc[user.role] += 1;
            return acc;
          },
          { ADMIN: 0, FORMATEUR: 0, STUDENT: 0 }
        );
        setUserCounts(counts);
      } catch (error) {
        console.error("Failed to fetch user counts:", error);
      }
    };

    fetchUserCounts();
  }, []);

  return (
    <Row xs={1} md={3} className="g-4">
      <Col>
        <Card className="p-3">
          <Card.Body>
            <Card.Title>Administrator</Card.Title>
            <Card.Text>
              <FaUserTie style={{ marginRight: "5px" }} />
              {userCounts.ADMIN} user(s)
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="p-3">
          <Card.Body>
            <Card.Title>Enseignant</Card.Title>
            <Card.Text>
              <FaChalkboardTeacher style={{ marginRight: "5px" }} />
              {userCounts.FORMATEUR} user(s)
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="p-3">
          <Card.Body>
            <Card.Title>Student</Card.Title>
            <Card.Text>
              <FaUserGraduate style={{ marginRight: "5px" }} />
              {userCounts.STUDENT} user(s)
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CardDashboard;
