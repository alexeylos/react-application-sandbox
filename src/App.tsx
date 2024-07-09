import './styles.less';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import { useDashboardData } from './api/dashboard';
import { ROUTES } from './constants/common';
import Home from './pages/Home';
import Bookings from './pages/Bookings';

const App: React.FC = () => {
  const { isLoading, isError } = useDashboardData();

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" data-testid="loading-spinner" />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.BOOKINGS} element={<Bookings />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
