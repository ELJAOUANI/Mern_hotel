// bookingSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createBooking, getAllBookings,deleteBooking } from '../../Thunk/booking/bookingThunk';
import { BookingData } from '../../../types/booking';

interface BookingState {
  loading: boolean;
  error: string | null;
  success: boolean;
  bookings: BookingData[]; 
  selectedItem: BookingData | null; 
}

const initialState: BookingState = {
  loading: false,
  error: null,
  success: false,
  bookings: [],
  selectedItem: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    selectBooking: (state, action: PayloadAction<BookingData>) => {
       console.log('Setting selectedItem in Redux:', action.payload); // Debug log
      state.selectedItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get All Bookings
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        // Remove deleted booking from state
        state.bookings = state.bookings.filter(booking => booking._id !== action.payload);
        state.selectedItem = null;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  
      
  },
});

export const { resetBookingState ,selectBooking} = bookingSlice.actions;
export default bookingSlice.reducer;
