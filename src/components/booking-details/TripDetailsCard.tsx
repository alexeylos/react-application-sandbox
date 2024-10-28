import { TripDetailsCardProps } from '@/types/booking';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import dayjs from 'dayjs';
import './TripDetailsCard.less';

const TripDetailsCard = ({ booking }: TripDetailsCardProps) => {
  return (
    <div>
      <Card title="Trip Details">
        <p className="carrier-name">carrier name : {booking.carrier_name}</p>
        <div className="divider"></div>
        <div className="destination-details">
          <div className="departure">
            <p className="title">Departure</p>
            <p className="date-time">{dayjs(booking.departure_dttm).format('YYYY.MM.DD HH:mm')}</p>
            <p className="location">{booking.departure_station}</p>
          </div>

          <ArrowRightOutlined />

          <div className="arrival">
            <p className="title">Departure</p>
            <p className="date-time">{dayjs(booking.departure_dttm).format('YYYY.MM.DD HH:mm')}</p>
            <p className="location">{booking.departure_station}</p>
          </div>
        </div>

        <div className="divider"></div>

        <div className="booked">
          <p className="title">Booked at</p>
          <p className="date-time">{dayjs(booking.booking_dttm).format('YYYY.MM.DD HH:mm')}</p>
        </div>
      </Card>
    </div>
  );
};

export default TripDetailsCard;
