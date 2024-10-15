import Title from 'antd/es/typography/Title';
import React from 'react';
import BookingListMobileView from '../components/bookings/BookingListMobileView';
import BookingsTable from '../components/bookings/BookingsTable';
import { useBreakpoint } from '../lib/responsive';
const Bookings: React.FC = () => {
  const { lg } = useBreakpoint();
  return (
    <>
      <>
        <Title level={3}>Bookings</Title>
        {lg && <BookingsTable />}
        {!lg && <BookingListMobileView />}
      </>
    </>
  );
};

export default Bookings;
