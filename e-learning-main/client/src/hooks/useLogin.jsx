import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext";

const UseLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.status === 200) {
        message.success("User loged successfully");
        login(data.token, data.user); // Ensure login function handles these arguments correctly
      } else if (res.status === 404) {
        throw new Error(data.message);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default UseLogin;
