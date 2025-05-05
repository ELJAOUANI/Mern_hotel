import { RouteObject } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '../pages/home/HomePage';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';
import RegisterPage from '../pages/auth/RegisterPage';

import PublicRoute from './PublicRoute';
import ContactPage from '@/pages/contact/ContactPage';
import BookingPage from '@/pages/booking/BookingPage';


const appRoutes: RouteObject[] = [
  {
    element: (
      <PublicRoute>
        <MainLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },

      // {
      //   path: '/',
      //   element: <BookingPage />
      // },
    ]
  },
  {
    element: <ProtectedRoute />, // Protected routes wrapper
    children: [
      {
        element: <MainLayout />, // Layout wraps protected pages
        children: [
          {
            path: '/',
            element: <HomePage />
          },
          {
            path: '/contact',
            element: <ContactPage />
          },
          {
            path: '/dashboardAdmin',
            element: <BookingPage />
          },
          // Add more protected routes here...
        ]
      }
    ]
  }
];

export default appRoutes;
