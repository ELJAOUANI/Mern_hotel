import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';
import appRoutes from './routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const AppRoutes = () => {
  return useRoutes(appRoutes);
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </Provider>
  );
};

export default App;