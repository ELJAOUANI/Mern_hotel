// src/types/booking.ts
export interface BookingData {
    _id: string;
    rooms: string[];
    customerName: string;
    customerEmail: string;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
  }
  