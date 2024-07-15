import FeatureCard from '../components/reusable/FeatureCard';
import { useDashboardData } from '../api/dashboard';
import InfoCard from '../components/reusable/InfoCard';
import { Spin } from 'antd';
import React from 'react';
import { BookOutlined, FundOutlined, PieChartOutlined } from '@ant-design/icons';
import { ROUTES } from '../constants/common';

const Home: React.FC = () => {
  const { data, isLoading, isError } = useDashboardData();

  if (isLoading) {
    return <Spin size="large" data-testid="loading-spinner" />;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="user-name">
        Welcome, <span>{data?.name} !</span>
      </h1>

      <div className="card-container">
        <InfoCard
          title="PAX booked"
          value={data?.pax ?? 0}
          delta={data?.pax_delta ?? 0}
          currency=""
        />
        <InfoCard
          title="GMV"
          value={data?.gmv ?? 0}
          delta={data?.gmv_delta ?? 0}
          currency={data?.currency ?? 'USD'}
        />
      </div>

      <div className="quick-access">
        <span>Quick access</span>
      </div>

      <div className="card-container">
        <FeatureCard
          icon={<BookOutlined />}
          title="Booking"
          description="Manage your bookings."
          buttonLink={ROUTES.BOOKINGS}
        />
        <FeatureCard
          icon={<FundOutlined />}
          title="Trading"
          description="This feature is coming soon."
        />
        <FeatureCard
          icon={<PieChartOutlined />}
          title="Settings"
          description="Customize your application"
        />
      </div>
    </div>
  );
};

export default Home;
