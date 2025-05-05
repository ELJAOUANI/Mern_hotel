// features/auth/authThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginService } from "../../../services/authService";
import { loginSuccess, loginFailure } from "../../slices/auth/authSlice";

export const loginTh = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await loginService(credentials);

      if (response?.status === 200) {
        const token = response.data.token;
        const user = response.data.user; // Assuming `user` contains both email and other details like name

        // Save token and user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));  // Save user data as a string
        
        // Dispatch success action with both email and user details
        dispatch(loginSuccess({ email: user.email, token, name: user.name, role: user.role }));

        return response.data;
      } else {
        dispatch(loginFailure("Invalid credentials"));
        return rejectWithValue("Invalid credentials");
      }
    } catch (error: any) {
      dispatch(loginFailure("Login failed"));
      return rejectWithValue(error?.response?.data?.message || "Login failed");
    }
  }
);
