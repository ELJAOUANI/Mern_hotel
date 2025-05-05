import axiosClient from "../api/axios";
import { BookingData } from "../types/booking";



export const createBookingService = async (booking:BookingData) => {
    try {
        const response = await axiosClient.post('/bookings', booking);
     console.log('createBookingService',response.data);
        return response.data;
    } catch (error:any) {
        console.error('Error response:', error.response.data.message);
    }
};
export const getBookings = async () => {
    try {
        const response = await axiosClient.get('/bookings');
        return response.data;
    } catch (error:any) {
        console.error('Error response:', error.response.data.message);
    }
}
    export const getAllRooms = async () => {
        try {
            const response = await axiosClient.get('/rooms');
            return response.data;
        } catch (error:any) {
            console.error('Error response:', error.response.data.message);
        }
};


export const deleteBookingService = async (bookingId: string) => {
    try {
      const response = await axiosClient.delete(`/bookings/${bookingId}`);
      return response.data;  
    } catch (error: any) {
      console.error('Error response:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to delete booking');
    }
  };
