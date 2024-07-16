import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/common';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import './styles.less';
import Layout from './components/layout/layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.BOOKINGS} element={<Bookings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
