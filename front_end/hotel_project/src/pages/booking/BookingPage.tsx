import  { useEffect, useState } from 'react';
import BookingTable from './components/BookingTable';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { deleteBooking, getAllBookings } from '@/store/Thunk/booking/bookingThunk';
import { Validate } from '@/core/constants';
import { AddReservationModal } from './components/AddReservationModal';


const BookingPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const bookings = useAppSelector(state => state.booking.bookings); 
  console.log(bookings);
  
  const selectedBooking = useAppSelector(state => state.booking.selectedItem); 
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      await dispatch(getAllBookings());
      setIsLoading(false);
    };

    fetchBookings();

    return () => {
      setIsLoading(false); 
    };
  }, [dispatch]);

  const handleDeleteBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (!selectedBooking?._id) return;
    setIsLoading(true);
    try {

        await dispatch(deleteBooking(selectedBooking?._id)); 
        console.log(selectedBooking?._id);
        
       
       $('#delete-booking').modal('hide');
    } catch (error) {
        console.error('Failed to Delete booking:', error);
    } finally {
        setIsLoading(false);
    }
}


  return (


    <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Liste des Reservations</h1>


<button 
            className="btn btn-primary mb-4 px-4 py-2"
             data-bs-toggle="modal" 
                data-bs-target="#addNewReservation"
          >
            Ajouter une reservation
          </button>
         
            <div className="overflow-x-auto">
                {bookings  && (
                    <BookingTable data={bookings} />
                    
                )}
            </div>
            <Validate
                id="delete-booking"
                isLoading={isLoading}
                method={handleDeleteBooking}
                itemid={selectedBooking?.id}
                title="Supression d'une Reservation"
                message="Êtest-vous sûr de supprimer cette reservation?"
                severity="danger"
            />
                <AddReservationModal/>
        </div>

  );
};

export default BookingPage;




