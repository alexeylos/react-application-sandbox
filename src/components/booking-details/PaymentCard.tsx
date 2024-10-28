import { TripDetailsCardProps } from '@/types/booking';
import { Card } from 'antd';
import './PaymentCard.less';

const PaymentCard = ({ booking }: TripDetailsCardProps) => {
  return (
    <div>
      <Card className="payment-card" title="Payment">
        <div className="payment">
          <div className="payment-details">
            <p className="title">Total Price</p>
            <p className="value">{`${booking.currency == 'USD' ? '$' : '€'}  ${booking.total_price}`}</p>
          </div>

          <div className="payment-details">
            <p className="title">Retailer</p>
            <p className="value">{`${booking.retailer.name} , ${booking.retailer.code}`}</p>
          </div>

          <div className="payment-details">
            <p className="title">Payment Method</p>
            <p className="value">{booking.payment_method}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentCard;
