import { TripDetailsCardProps } from '@/types/booking';
import { BorderlessTableOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import dayjs from 'dayjs';
import './PassengersListCard.less';

const PassengersListCard = ({ booking }: TripDetailsCardProps) => {
  return (
    <Card title="Passengers List">
      {booking.passengers.map((passenger) => (
        <div className="per-passenger" key={passenger.ticket_number}>
          <p className="passenger">{passenger.name}</p>
          <div className="passenger-details">
            <p className="details">
              <UserOutlined />
              <span>
                {`${passenger.category}${
                  passenger.category === 'infant'
                    ? ' (0-3 years)'
                    : passenger.category === 'child'
                      ? ' (4-15 years)'
                      : ' (16-99 years)'
                }`}
              </span>
            </p>

            <p className="details">
              <CalendarOutlined />
              <span>{dayjs(passenger.birth_date).format('YYYY.MM.DD')}</span>
            </p>
          </div>

          <p className="ticket-number">
            <BorderlessTableOutlined />
            <span>{passenger.ticket_number}</span>
          </p>
        </div>
      ))}
    </Card>
  );
};

export default PassengersListCard;
