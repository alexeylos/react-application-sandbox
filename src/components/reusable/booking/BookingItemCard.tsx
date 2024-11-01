import { Booking } from '@/types/booking';
import { ArrowDownOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingItemCard.less';

const BookingItemCard: React.FC<Booking> = ({
  id,
  booking_dttm,
  carrier_name,
  passenger,
  departure_station,
  departure_dttm,
  arrival_station,
  arrival_dttm,
  total_price,
  currency,
  status,
}) => {
  const navigate = useNavigate();
  const onClickNavigate = useCallback(() => {
    navigate(`/bookings/${id}`);
  }, [id]);

  return (
    <>
      <Card onClick={onClickNavigate}>
        <Row gutter={[0, 16]}>
          <Col span={18}>
            <p className="passenger-name">
              <strong>{passenger}</strong>
            </p>
            <p className="booking-dttm">
              <ClockCircleOutlined />
              {`${dayjs(booking_dttm).format('YYYY-MM-DD HH:mm')}, ${carrier_name}`}
            </p>
            <div>
              <div className="departure">
                <span className="station-name">{departure_station}</span>
                <span className="time-date">
                  {dayjs(departure_dttm).format('YYYY-MM-DD HH:mm')}
                </span>
              </div>

              <div>
                <ArrowDownOutlined />
              </div>

              <div className="arrival">
                <span className="station-name">{arrival_station}</span>
                <span className="time-date">{dayjs(arrival_dttm).format('YYYY-MM-DD HH:mm')}</span>
              </div>
            </div>

            <div className="currency">
              <span>
                {total_price} {currency}
              </span>
            </div>
          </Col>

          <Col span={6}>
            <Row justify="end">
              <Tag color={status === 'active' ? 'green' : 'red'}>
                {(status ?? 'unknown').toUpperCase()}
              </Tag>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default BookingItemCard;
