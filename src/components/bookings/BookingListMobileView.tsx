import { Col, Row, Spin } from 'antd';
import { useBookings } from '../../api/bookings';
import BookingItemCard from '../reusable/booking/BookingItemCard';

function BookingListMobileView() {
  const { data, isLoading, isError } = useBookings();

  if (isLoading) return <Spin tip="Loading bookings..." />;

  if (isError) {
    return <div>Error fetching data</div>;
  }
  return (
    <Row gutter={[32, 32]}>
      {data?.map((booking) => (
        <Col key={booking.id} xs={24} sm={12} xl={8}>
          {' '}
          <BookingItemCard {...booking} />
        </Col>
      ))}
    </Row>
  );
}

export default BookingListMobileView;
