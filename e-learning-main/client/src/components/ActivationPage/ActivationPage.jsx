import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function ActivationPage() {
  const { activationCode } = useParams();

  useEffect(() => {
    // Make the POST request to verify the activation code
    axios
      .post(`http://localhost:3000/api/auth/verif/${activationCode}`)
      .then((response) => {
        // Handle successful verification if needed
        console.log("Activation success:", response.data);
      })
      .catch((error) => {
        // Handle verification failure if needed
        console.error("Activation failed:", error);
      });
  }, [activationCode]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Account Activation</h1>

              <Link to="/login" className="btn btn-primary">
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivationPage;