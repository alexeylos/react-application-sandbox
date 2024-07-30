import FeatureCard from '../components/reusable/FeatureCard';
import { useDashboardData } from '../api/dashboard';
import InfoCard from '../components/reusable/InfoCard';
import { Col, Row, Spin } from 'antd';
import React from 'react';
import { BookOutlined, FundOutlined, PieChartOutlined } from '@ant-design/icons';
import { ROUTES } from '../constants/common';
import './Home.less';

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
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} xl={8}>
            <InfoCard
              title="PAX booked"
              value={data?.pax ?? 0}
              delta={data?.pax_delta ?? 0}
              currency=""
            />
          </Col>

          <Col xs={24} sm={12} xl={8}>
            <InfoCard
              title="GMV"
              value={data?.gmv ?? 0}
              delta={data?.gmv_delta ?? 0}
              currency={data?.currency ?? 'USD'}
            />
          </Col>
        </Row>
      </div>

      <div className="quick-access">
        <span>Quick access</span>
      </div>

      <div className="card-container">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} xl={8}>
            <FeatureCard
              icon={<BookOutlined />}
              title="Booking"
              description="Manage your bookings."
              buttonLink={ROUTES.BOOKINGS}
            />
          </Col>

          <Col xs={24} sm={12} xl={8}>
            <FeatureCard
              icon={<FundOutlined />}
              title="Trading"
              description="This feature is coming soon."
            />
          </Col>

          <Col xs={24} sm={12} xl={8}>
            <FeatureCard
              icon={<PieChartOutlined />}
              title="Settings"
              description="Customize your application"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
