import { BookingDetailsData } from '@/types/booking';
import { render, screen } from '@testing-library/react';
import PaymentCard from './PaymentCard';

const mockBooking: BookingDetailsData = {
  id: 'B1',
  booking_dttm: '2024-10-14T22:32:00Z',
  carrier_name: 'Carrier 1',
  departure_station: 'Station 1',
  departure_dttm: '2024-10-14T22:32:00Z',
  arrival_station: 'Station 2',
  arrival_dttm: '2024-10-14T23:32:00Z',
  total_price: '100.00',
  currency: 'USD',
  status: 'active',
  purchaser: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
  },
  passengers: [
    {
      name: 'Alice',
      category: 'adult',
      birth_date: '1990-03-30',
      ticket_number: 'T1',
    },
  ],
  retailer: {
    name: 'Retailer 1',
    code: 'R001',
  },
  payment_method: 'Credit Card',
};

describe('PaymentCard', () => {
  it('renders the payment details correctly with USD currency', () => {
    render(<PaymentCard booking={mockBooking} />);

    // Check Payment card title
    expect(screen.getByText('Payment')).toBeInTheDocument();

    // Check Total Price label and value with currency symbol
    expect(screen.getByText('Total Price')).toBeInTheDocument();
    expect(screen.getByText(`$ ${mockBooking.total_price}`)).toBeInTheDocument();

    // Check Retailer label and value
    expect(screen.getByText('Retailer')).toBeInTheDocument();
    expect(
      screen.getByText(`${mockBooking.retailer.name} , ${mockBooking.retailer.code}`),
    ).toBeInTheDocument();

    // Check Payment Method label and value
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
    expect(screen.getByText(mockBooking.payment_method)).toBeInTheDocument();
  });

  it('renders the correct currency symbol for EUR', () => {
    const euroBooking = { ...mockBooking, currency: 'EUR' };
    render(<PaymentCard booking={euroBooking} />);

    // Check Total Price with € symbol
    expect(screen.getByText(`€ ${euroBooking.total_price}`)).toBeInTheDocument();
  });
});
