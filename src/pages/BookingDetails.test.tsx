import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as bookingApi from '../api/bookingDetailsApi';
import BookingDetails from './BookingDetails';

jest.mock('../api/bookingDetailsApi', () => ({
  useBookingDetails: jest.fn(),
}));

describe('BookingDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays error state when fetching fails', () => {
    (bookingApi.useBookingDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <MemoryRouter initialEntries={['/booking/B1']}>
        <BookingDetails />
      </MemoryRouter>,
    );

    expect(screen.getByText('Error: Booking ID is missing')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (bookingApi.useBookingDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/booking/B1']}>
        <Routes>
          <Route path="/booking/:id" element={<BookingDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    const loadingSpinner = document.querySelector('.ant-spin');
    expect(loadingSpinner).toBeInTheDocument();
    expect(loadingSpinner).toHaveClass('ant-spin-spinning');
  });

  it('displays error state when fetching fails', () => {
    (bookingApi.useBookingDetails as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <MemoryRouter initialEntries={['/booking/B1']}>
        <Routes>
          <Route path="/booking/:id" element={<BookingDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('renders booking details when data is successfully fetched', async () => {
    const mockBooking = {
      id: 'B1',
      carrier_name: 'Carrier 1',
      departure_station: 'Station 1',
      arrival_station: 'Station 2',
      departure_dttm: '2024-10-14T22:32:00Z',
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

    (bookingApi.useBookingDetails as jest.Mock).mockReturnValue({
      data: mockBooking,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/booking/B1']}>
        <Routes>
          <Route path="/booking/:id" element={<BookingDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    // Assertions for successfully fetched data
    expect(screen.getByText('Trip Details')).toBeInTheDocument();
    expect(screen.getByText(/Carrier 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Price/i)).toBeInTheDocument();
    expect(screen.getByText('$ 100.00')).toBeInTheDocument();
    expect(screen.getByText(/Purchaser/i)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Retailer 1 , R001/i)).toBeInTheDocument();
    expect(screen.getByText(/Credit Card/i)).toBeInTheDocument();
  });

  it('renders with missing optional data (e.g., no retailer or payment method)', () => {
    const mockBooking = {
      id: 'B1',
      carrier_name: 'Carrier 1',
      departure_station: 'Station 1',
      arrival_station: 'Station 2',
      departure_dttm: '2024-10-14T22:32:00Z',
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
      retailer: 'null',
      payment_method: 'null',
    };

    (bookingApi.useBookingDetails as jest.Mock).mockReturnValue({
      data: mockBooking,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/booking/B1']}>
        <Routes>
          <Route path="/booking/:id" element={<BookingDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Trip Details')).toBeInTheDocument();
    expect(screen.getByText(/Carrier 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Retailer 1 , R001/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Credit Card/i)).not.toBeInTheDocument();
  });
});
