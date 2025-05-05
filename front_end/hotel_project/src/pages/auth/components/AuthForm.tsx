import React, { useState, FormEvent } from "react";

type AuthFormProps = {
  title?: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  buttonLabel: string;
  loading?: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  onSubmit,
  buttonLabel,
  loading = false,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password); // Parent handles errors
  };

  return (
    <div className="auth-form-container card shadow p-4">
      {title && <h3 className="text-center mb-4">{title}</h3>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Please wait..." : buttonLabel}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
