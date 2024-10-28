import { BookingDetailsData } from '@/types/booking';
import { render, screen } from '@testing-library/react';
import PurchaserCard from './PurchaserCard';

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
    {
      name: 'Bob',
      category: 'child',
      birth_date: '2010-05-21',
      ticket_number: 'T2',
    },
    {
      name: 'Charlie',
      category: 'infant',
      birth_date: '2022-12-01',
      ticket_number: 'T3',
    },
  ],
  retailer: {
    name: 'Retailer 1',
    code: 'R001',
  },
  payment_method: 'Credit Card',
};

describe('PurchaserCard', () => {
  it('renders the purchaser details correctly', () => {
    render(<PurchaserCard booking={mockBooking} />);
    expect(screen.getByText('Purchaser')).toBeInTheDocument();
    expect(screen.getByText(mockBooking.purchaser.name)).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText(mockBooking.purchaser.email)).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText(mockBooking.purchaser.phone)).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText(mockBooking.purchaser.address)).toBeInTheDocument();
  });
});
