// features/auth/registerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  isRegistering: boolean;
  user: null | {
    email: string;
    name: string;
  };
  success: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  isRegistering: false,
  user: null,
  success: false,
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerStart(state) {
      state.isRegistering = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<{ email: string; name: string }>) {
      state.isRegistering = false;
      state.user = action.payload;
      state.success = true;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.isRegistering = false;
      state.error = action.payload;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure } = registerSlice.actions;

export default registerSlice.reducer;