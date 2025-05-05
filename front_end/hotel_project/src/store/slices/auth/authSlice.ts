import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state for authentication
interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    email: string;
    // Add other fields as needed
    name?: string;
    role: string; 
  };
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Try to retrieve token and user data from localStorage
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || 'null');

const initialAuthState = token && user
  ? {
      isAuthenticated: true,
      user,
      loading: false,
      error: null,
    }
  : initialState;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ email: string; token: string; name: string; role: string }>)
    {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');  // Remove token
      localStorage.removeItem('user');  // Remove user data
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
