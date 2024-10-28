import { Booking } from '@/types/booking';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { MemoryRouter } from 'react-router-dom';
import BookingItemCard from './BookingItemCard';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const booking: Booking = {
  id: 'B1',
  booking_dttm: '2024-10-14T22:32:00Z',
  carrier_name: 'Carrier 1',
  passenger: 'Passenger 1',
  departure_station: 'Station 1',
  departure_dttm: '2024-10-14T22:32:00Z',
  arrival_station: 'Station 2',
  arrival_dttm: '2024-10-14T23:32:00Z',
  total_price: '100.00',
  currency: 'USD',
  status: 'active',
};

describe('BookingItemCard', () => {
  it('renders BookingItemCard correctly', () => {
    render(
      <MemoryRouter>
        <BookingItemCard {...booking} />
      </MemoryRouter>,
    );
    expect(screen.getByText(booking.passenger)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(booking.carrier_name, 'i'))).toBeInTheDocument();
    expect(screen.getByText(`${booking.total_price} USD`)).toBeInTheDocument();
    expect(screen.getByText(booking.status.toUpperCase())).toBeInTheDocument();
  });

  it('displays formatted departure and arrival times correctly', () => {
    render(
      <MemoryRouter>
        <BookingItemCard {...booking} />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(dayjs(booking.departure_dttm).format('YYYY-MM-DD HH:mm')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dayjs(booking.arrival_dttm).format('YYYY-MM-DD HH:mm')),
    ).toBeInTheDocument();
  });

  it('displays the correct status color based on status', () => {
    render(
      <MemoryRouter>
        <BookingItemCard {...booking} />
      </MemoryRouter>,
    );
    const statusTag = screen.getByText(booking.status.toUpperCase());
    expect(statusTag).toHaveClass('ant-tag-green');

    const cancelledBooking = { ...booking, status: 'cancelled' };
    render(
      <MemoryRouter>
        <BookingItemCard {...cancelledBooking} />
      </MemoryRouter>,
    );
    expect(screen.getByText('CANCELLED')).toHaveClass('ant-tag-red');
  });

  it('renders total price with currency', () => {
    render(
      <MemoryRouter>
        <BookingItemCard {...booking} />
      </MemoryRouter>,
    );
    expect(screen.getByText(`${booking.total_price} ${booking.currency}`)).toBeInTheDocument();
  });
});
