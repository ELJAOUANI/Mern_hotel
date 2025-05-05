// src/store/slices/roomSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchRooms } from '@/store/Thunk/rooms/roomThunk';

interface Room {
  id: string;
  name: string;
  price: number;
}

interface RoomState {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.loading = false;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default roomSlice.reducer;
