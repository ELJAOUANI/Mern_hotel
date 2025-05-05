// src/store/Thunk/roomThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRooms } from '@/services/bookingService';

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllRooms();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch rooms');
    }
  }
);
