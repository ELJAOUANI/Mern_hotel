import React from "react";

export const RegisterForm = ({
  onSubmit,
  onInputChange,
  formData,
  isLoading,
}: {
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: { email: string; password: string; name: string };
  isLoading: boolean;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={onInputChange}
          required
        />
      </div>
 <div className="d-flex justify-content-center">
  <button type="submit" className="btn btn-primary" disabled={isLoading}>
    {isLoading ? "Registering..." : "Register"}
  </button>
</div>
    </form>
  );
};