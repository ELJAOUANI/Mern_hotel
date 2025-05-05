import { useState } from "react";
import AuthForm from "../auth/components/AuthForm";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginTh } from "../../store/Thunk/auth/authThunk";
import utils from "@/core/utils/helpers";

export default function LoginPage() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const result = await dispatch(loginTh({ email, password }));

      if (loginTh.fulfilled.match(result)) {
        const user = result.payload.user;
        utils.navigateByRole(user.role, navigate); // Redirect based on role
      } else {
        const error = (result.payload as any)?.message || "Login failed";
        console.log(error);
        
        setErrorMessage(error);
      }
    } catch (err: any) {
      setErrorMessage("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-dark bg-opacity-50"
      style={{
        backgroundImage: "url('/image/view_mg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="bg-white bg-opacity-75 rounded shadow p-5"
        style={{ minWidth: "350px", maxWidth: "420px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary" style={{ fontFamily: "'Georgia', serif" }}>
          Hotel Login
        </h2>

        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}

        <AuthForm
          onSubmit={handleLogin}
          buttonLabel="Login"
          loading={loading}
        />

        <div className="mt-3 text-center text-muted">
          Don't have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
