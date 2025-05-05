import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/auth/authSlice'; // Import logout action

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authentication state from Redux store
  const { isAuthenticated ,user} = useSelector((state: any) => state.auth);

  // On mount, check localStorage for the token (if not already done in the slice)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      // Manually dispatch login success if the token is found
      dispatch({
        type: 'auth/loginSuccess',
        payload: { email: '', token }, // You can modify this payload as per your needs
      });
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to reset the auth state in Redux
    navigate('/login'); // Redirect user to login page after logging out
  };

  return (
    <header className="bg-light py-3 border-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="navbar-brand text-dark fw-bold">Luxury Stays</Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-dark">Reservation</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-dark">Contact</Link>
            </li>
             
             {user?.role === 'admin' && (
              <li className="nav-item">
                <Link to="/dashboardAdmin" className="nav-link text-dark">Booking request</Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Call-to-Action Buttons */}
        <div className="header-cta">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">Sign In</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
