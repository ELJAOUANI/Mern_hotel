import React, { useState } from 'react';
import { AddReservationModal } from '../../pages/booking/components/AddReservationModal';
import { useAppSelector } from '../../store/hooks/hooks';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setShowModal(true);
  };

  return (
    <div>
    <div
      className="bg-dark text-white p-5 text-center"
      style={{
        backgroundImage:
          'url("/image/background_img.avif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="bg-dark bg-opacity-75 p-5 rounded">
        <h1 className="display-4 fw-bold">Welcome to Oceanview Hotel</h1>
        <p className="lead">Experience luxury by the sea</p>
        <button
  className="btn btn-primary btn-lg mt-3"
  data-bs-toggle="modal"
  data-bs-target={isAuthenticated ? "#addNewReservation" : undefined}
  onClick={handleBookNow}
>
  {isAuthenticated ? "Book Now" : "Login to Book"}
</button>



      </div>
    </div>


    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2 className="mb-4">Our Story</h2>
          <p className="lead">
            Founded in 1995, Oceanview Hotel has been providing exceptional
            hospitality for over 25 years.
          </p>
          <p>
            Located on the pristine coastline, our hotel offers breathtaking
            views and world-class service to make your stay unforgettable.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="/image/img_2.jpeg"
            alt="Hotel Lobby"
            className="img-fluid rounded"
          />
        </div>
      </div>
    </div>

    {showModal && <AddReservationModal />}
  </div>
  );
};

export default HomePage;
