import { createAsyncThunk } from '@reduxjs/toolkit';
import { createBookingService, deleteBookingService, getBookings } from '../../../services/bookingService';
import { BookingData } from '../../../types/booking';

export const createBooking = createAsyncThunk(
  'booking/create',
  async (booking: BookingData, thunkAPI) => {
    try {
      const data = await createBookingService(booking);
      console.log('Booking response thunk:', data);
      
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Booking failed');
    }
  }
);

export const getAllBookings = createAsyncThunk(
  'booking/getAll',
  async (_, thunkAPI) => {
    try {
      const data = await getBookings(); // should return an array of bookings
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);
export const deleteBooking = createAsyncThunk(
  'booking/delete',
  async (bookingId: string, thunkAPI) => {
    try {
      await deleteBookingService(bookingId);
      return bookingId; // return ID for reducer to remove from store
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete booking');
    }
  }
);
