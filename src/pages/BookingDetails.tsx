import { Col, Row, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useBookingDetails } from '../api/bookingDetailsApi';
import ExtraInfo from '../components/booking-details/ExtraInfo';
import PassengersListCard from '../components/booking-details/PassengersListCard';
import PaymentCard from '../components/booking-details/PaymentCard';
import PurchaserCard from '../components/booking-details/PurchaserCard';
import TripDetailsCard from '../components/booking-details/TripDetailsCard';
import './BookingDetails.less';

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Error: Booking ID is missing</div>;
  }

  const { data: booking, isLoading, isError } = useBookingDetails(id);

  if (isLoading) return <Spin tip="Loading bookings..." />;

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col xs={24} md={12} xl={8}>
          <div className="trip-details-extra-info">
            <TripDetailsCard booking={booking} />
            <ExtraInfo />
          </div>
        </Col>
        <Col xs={24} md={12} xl={16}>
          <div className="trip-details-extra-info">
            <div>
              <Row gutter={[20, 20]}>
                <Col xs={24} sm={12} md={24} lg={24} xl={12}>
                  <PurchaserCard booking={booking} />
                </Col>
                <Col xs={24} sm={12} md={24} lg={24} xl={12}>
                  <PaymentCard booking={booking} />
                </Col>
              </Row>
            </div>

            <div>
              <PassengersListCard booking={booking} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookingDetails;
