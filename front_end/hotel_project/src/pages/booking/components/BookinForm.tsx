// src/components/BookingForm.tsx
import React, { useState, useEffect } from 'react';
import { BookingData } from '../../../types/booking';

interface Props {
  onSubmit: (data: BookingData) => void;
  loading: boolean;
  success: boolean;
}

const initialFormData: BookingData = {
  hotel: '',
  rooms: [''],
  customerName: '',
  customerEmail: '',
  checkInDate: '',
  checkOutDate: '',
  totalPrice: 0,
};

const BookingForm: React.FC<Props> = ({ onSubmit, loading, success }) => {
  const [formData, setFormData] = useState<BookingData>(initialFormData);

  useEffect(() => {
    if (success) {
      setFormData(initialFormData);
    }
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'totalPrice' ? Number(value) : value,
    }));
  };

  const handleRoomsChange = (index: number, value: string) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[index] = value;
    setFormData({ ...formData, rooms: updatedRooms });
  };

  const addRoomField = () => {
    setFormData((prev) => ({ ...prev, rooms: [...prev.rooms, ''] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="hotel"
        value={formData.hotel}
        onChange={handleChange}
        placeholder="Hotel ID"
        className="w-full border p-2 rounded"
        required
      />

      {formData.rooms.map((roomId, index) => (
        <input
          key={index}
          type="text"
          value={roomId}
          onChange={(e) => handleRoomsChange(index, e.target.value)}
          placeholder={`Room ID ${index + 1}`}
          className="w-full border p-2 rounded"
          required
        />
      ))}
      <button type="button" onClick={addRoomField} className="text-blue-600 text-sm underline">
        + Add Another Room
      </button>

      <input
        type="text"
        name="customerName"
        value={formData.customerName}
        onChange={handleChange}
        placeholder="Customer Name"
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        name="customerEmail"
        value={formData.customerEmail}
        onChange={handleChange}
        placeholder="Customer Email"
        className="w-full border p-2 rounded"
        required
      />

      <div className="flex gap-4">
        <input
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <input
        type="number"
        name="totalPrice"
        value={formData.totalPrice}
        onChange={handleChange}
        placeholder="Total Price"
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Booking'}
      </button>
    </form>
  );
};

export default BookingForm;
