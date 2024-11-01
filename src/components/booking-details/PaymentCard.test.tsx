import { bookingsDetails } from '@/msw/bookingDetailsMockData';
import { render, screen } from '@testing-library/react';
import PaymentCard from './PaymentCard';

describe('PaymentCard', () => {
  it('renders the payment details correctly with USD currency', () => {
    render(<PaymentCard booking={bookingsDetails[0]} />);
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('Total Price')).toBeInTheDocument();
    expect(screen.getByText(`$ ${bookingsDetails[0].total_price}`)).toBeInTheDocument();
    expect(screen.getByText('Retailer')).toBeInTheDocument();
    expect(
      screen.getByText(`${bookingsDetails[0].retailer.name} , ${bookingsDetails[0].retailer.code}`),
    ).toBeInTheDocument();
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
    expect(screen.getByText(bookingsDetails[0].payment_method)).toBeInTheDocument();
  });

  it('renders the correct currency symbol for EUR', () => {
    const euroBooking = { ...bookingsDetails[0], currency: 'EUR' };
    render(<PaymentCard booking={euroBooking} />);
    expect(screen.getByText(`€ ${euroBooking.total_price}`)).toBeInTheDocument();
  });
});
