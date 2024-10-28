import { TripDetailsCardProps } from '@/types/booking';
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import './PurchaserCard.less';

const PurchaserCard = ({ booking }: TripDetailsCardProps) => {
  console.log(booking);

  return (
    <div>
      <Card title="Purchaser">
        <div className="purchaser-details">
          <p className="name">{booking.purchaser.name}</p>
          <div className="email">
            <div className="icon-container">
              <MailOutlined />
            </div>
            <div className="container-details">
              <p>Email</p>
              <p className="email-address">{booking.purchaser.email}</p>
            </div>
          </div>

          <div className="phone">
            <div className="icon-container">
              <PhoneOutlined />
            </div>
            <div className="container-details">
              <p>Phone</p>
              <p>{booking.purchaser.phone}</p>
            </div>
          </div>
          <div className="location">
            <div className="icon-container">
              <EnvironmentOutlined />
            </div>
            <div className="container-details">
              <p>Location</p>
              <p>{booking.purchaser.address}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PurchaserCard;
