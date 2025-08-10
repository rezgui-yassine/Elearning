import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext";

const useSignUp = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registreUser = async (values) => {
    if (values.password !== values.isPaswored) {
      return setError("Passwords do not match");
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.status === 201) {
        message.success("User created successfully");
        login(data.token, data.user); // Ensure login function handles these arguments correctly
      } else if (res.status === 400) {
        throw new Error(data.message);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, registreUser };
};

export default useSignUp;
