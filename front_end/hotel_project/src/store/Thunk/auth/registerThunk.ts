import { createAsyncThunk } from "@reduxjs/toolkit";
import { register as registerService } from "../../../services/authService";
import { registerSuccess, registerFailure } from "../../slices/auth/registerSlice";

export const registerTh = createAsyncThunk(
  "auth/register",
  async (
    credentials: { email: string; password: string; name: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await registerService(credentials);

      if (response?.status === 201) {
        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem("token", token);

        dispatch(registerSuccess({ email: user.email, name: user.name }));
        return response.data;
      } else {
        dispatch(registerFailure("Registration failed"));
        return rejectWithValue("Registration failed");
      }
    } catch (error: any) {
      dispatch(registerFailure("Registration failed"));
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);