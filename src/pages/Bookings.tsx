import { Space } from 'antd';
import BookingsTable from '../components/bookings/BookingsTable';
import React from 'react';
import Title from 'antd/es/typography/Title';

const Bookings: React.FC = () => {
  return (
    <>
      <Space direction="vertical" size="large">
        <Title level={3}>Bookings</Title>
        <BookingsTable />
      </Space>
    </>
  );
};

export default Bookings;
