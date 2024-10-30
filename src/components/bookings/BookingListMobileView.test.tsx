import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useBookings } from '../../api/bookings';
import BookingListMobileView from './BookingListMobileView';

jest.mock('../../api/bookings', () => ({
  useBookings: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockData = [
  {
    id: 1,
    passenger: 'John Doe',
    booking_dttm: '2024-10-14 20:45',
    departure_station: 'Station A',
    arrival_station: 'Station B',
    departure_dttm: '2024-10-14 20:45',
    arrival_dttm: '2024-10-14 21:45',
    status: 'active',
    total_price: '100.00',
    currency: 'USD',
  },
  {
    id: 2,
    passenger: 'Jane Smith',
    booking_dttm: '2024-10-14 21:00',
    departure_station: 'Station C',
    arrival_station: 'Station D',
    departure_dttm: '2024-10-14 21:00',
    arrival_dttm: '2024-10-14 22:00',
    status: 'inactive',
    total_price: '100.00',
    currency: 'USD',
  },
];

describe('BookingListMobileView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays error message', () => {
    (useBookings as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(
      <MemoryRouter>
        <BookingListMobileView />
      </MemoryRouter>,
    );
    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('renders booking items', () => {
    (useBookings as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter>
        <BookingListMobileView />
      </MemoryRouter>,
    );
    mockData.forEach((booking) => {
      expect(screen.getByText(booking.passenger)).toBeInTheDocument();
      expect(screen.getByText(booking.status.toUpperCase())).toBeInTheDocument();
    });
  });
});
