import React from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./testimonials.css"; // Make sure you have the testimonials.css file in your project directory

const UsersCards = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/all");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <MDBContainer className="my-5">
      <MDBRow className="text-center">
        {users.map((user) => (
          <MDBCol md="3" className="mb-4" key={user.id}>
            <MDBCard className="testimonial-card">
              <div
                className="card-up"
                style={{ backgroundColor: user.cardColor }}
              ></div>
              <div className="avatar mx-auto bg-white">
                <div
                  className="rounded-circle img-fluid"
                  style={{
                    width: "110px",
                    height: "110px",
                    border: "3px solid #fff",
                    borderRadius: "50%",
                    backgroundImage: `url(${user.avatar})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
              <MDBCardBody>
                <h4 className="mb-4">
                  {user.firstName} {user.lastName}
                </h4>
                <hr />
                <p className="dark-grey-text mt-4">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  {user.bio}
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default UsersCards;
