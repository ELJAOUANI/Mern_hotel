import React, { useEffect, useState, useMemo } from 'react';
import Modal from '@/core/constants/Modal';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { fetchRooms } from '@/store/Thunk/rooms/roomThunk';
import { createBooking } from '@/store/Thunk/booking/bookingThunk';
import { toast } from 'react-toastify';

export const AddReservationModal = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { rooms, loading: roomsLoading, error: roomsError } = useAppSelector((state) => state.room);

  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [newReservation, setNewReservation] = useState({
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    checkInDate: '',
    checkOutDate: '',
    totalPrice: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleRoomSelect = (roomId: string) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    );
  };

  const calculateDays = (checkInDate: string, checkOutDate: string) => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDifference = checkOut.getTime() - checkIn.getTime();
    return timeDifference > 0 ? Math.ceil(timeDifference / (1000 * 3600 * 24)) : 0;
  };

  const totalPrice = useMemo(() => {
    const days = calculateDays(newReservation.checkInDate, newReservation.checkOutDate);
    return selectedRooms.reduce((sum, roomId) => {
      const room = rooms.find((room) => room._id === roomId);
      return room ? sum + room.price * days : sum;
    }, 0);
  }, [selectedRooms, rooms, newReservation.checkInDate, newReservation.checkOutDate]);

  const handleAddReservation = async () => {
    if (!newReservation.checkInDate || !newReservation.checkOutDate) {
      alert('Please select both check-in and check-out dates');
      return;
    }

    if (selectedRooms.length === 0) {
      alert('Please select at least one room');
      return;
    }

    setIsLoading(true);
    try {
      const reservationPayload = {
        ...newReservation,
        totalPrice,
        rooms: selectedRooms,
      };
      await dispatch(createBooking(reservationPayload)).unwrap();
      
      toast.success('Reservation booked successfully ✅');
      // Reset form and close modal on success
      setNewReservation({
        customerName: user?.name || '',
        customerEmail: user?.email || '',
        checkInDate: '',
        checkOutDate: '',
        totalPrice: 0,
      });
      setSelectedRooms([]);
      $('#addNewReservation').modal('hide'); // Close modal using jQuery
    } catch (error) {
      console.error('Failed to add reservation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal 
      id="addNewReservation" 
      title="New Reservation" 
      size="lg"
    >
      <form onSubmit={(e) => {
        e.preventDefault();
        handleAddReservation();
      }}>
        <div className="modal-body">
          <div className="row">
            <div className="col-12 mb-3">
              <label className="form-label fw-bold">Available Rooms:</label>
              {roomsLoading && <div className="spinner-border spinner-border-sm"></div>}
              {roomsError && <div className="alert alert-danger">{roomsError}</div>}
              {!roomsLoading && rooms.length === 0 && (
                <div className="alert alert-info">No rooms available</div>
              )}
              <div className="row row-cols-1 row-cols-md-2 g-3">
                {rooms.map((room) => (
                  <div key={room._id} className="col">
                    <div className={`card ${selectedRooms.includes(room._id) ? 'border-primary' : ''}`}>
                      <div className="card-body">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedRooms.includes(room._id)}
                            onChange={() => handleRoomSelect(room._id)}
                            id={`room-${room._id}`}
                          />
                          <label className="form-check-label" htmlFor={`room-${room._id}`}>
                            <h5>{room.type}</h5>
                            <p className="mb-1">${room.price} per night</p>
                            <p className="text-muted small">{room.description}</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Check-in Date</label>
              <input
                type="date"
                name="checkInDate"
                value={newReservation.checkInDate}
                onChange={(e) => setNewReservation({ ...newReservation, checkInDate: e.target.value })}
                className="form-control"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Check-out Date</label>
              <input
                type="date"
                name="checkOutDate"
                value={newReservation.checkOutDate}
                onChange={(e) => {
                  setNewReservation({ ...newReservation, checkOutDate: e.target.value });
                }}
                className="form-control"
                min={newReservation.checkInDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="col-12 mb-3">
              <div className="card bg-light">
                <div className="card-body">
                  <h5 className="card-title">Booking Summary</h5>
                  <p className="mb-1">
                    <strong>Selected Rooms:</strong> {selectedRooms.length}
                  </p>
                  <p className="mb-1">
                    <strong>Duration:</strong> {calculateDays(newReservation.checkInDate, newReservation.checkOutDate)} nights
                  </p>
                  <p className="mb-0">
                    <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" onClick={() => $('#addNewReservation').modal('hide')}>
            Close
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              'Submit Reservation'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
