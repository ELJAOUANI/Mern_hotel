
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';



const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Outlet /> {/* Render nested routes here */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;