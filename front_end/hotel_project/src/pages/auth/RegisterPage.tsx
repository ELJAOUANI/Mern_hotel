import { useState } from "react";
import { RegisterForm } from "./components/RegisterForm";
import { Link, useNavigate } from "react-router-dom";
import { registerTh } from "../../store/Thunk/auth/registerThunk";
import { useDispatch } from "react-redux";
import React from "react";

export default function RegisterPage() {
  const dispatch = useDispatch<any>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await dispatch(registerTh(formData) as any);

      if (registerTh.fulfilled.match(result)) {
        console.log("Registration successful:", result.payload);
        navigate("/"); 
      } else {
        console.error("Registration failed:", result.payload);
        setError(result.payload || "Registration failed");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 position-relative"
      style={{
        backgroundImage: "url('/image/view_mg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 0 }}
      ></div>

      <div
        className="card shadow-lg rounded-4 p-4"
        style={{ maxWidth: "480px", width: "100%", position: "relative", zIndex: 1 }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary" style={{ fontFamily: "'Georgia', serif" }}>
            Create Your Account
          </h2>
          <p className="text-muted">Join us and start booking your stay!</p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <RegisterForm
          onSubmit={handleRegister}
          onInputChange={handleInputChange}
          formData={formData}
          isLoading={isLoading}
        />

        <div className="mt-3 text-center text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
    Register here
  </Link>
        </div>
      </div>
    </div>
  );
}
