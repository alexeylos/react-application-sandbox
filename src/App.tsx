import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import { ROUTES } from './constants/common';
import BookingDetails from './pages/BookingDetails';
import Bookings from './pages/Bookings';
import Home from './pages/Home';
import './styles.less';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.BOOKINGS} element={<Bookings />} />
          <Route path={ROUTES.BOOKING_DETAILS} element={<BookingDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
