import { mockBooking, mockBookingMissingData } from '@/msw/bookingDetailsMockData';
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
    expect(screen.getByText(/Total Price/i)).toBeInTheDocument();
    expect(screen.getByText('$ 100.00')).toBeInTheDocument();
    expect(screen.getByText(/Purchaser/i)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Retailer 1 , R001/i)).toBeInTheDocument();
    expect(screen.getByText(/Credit Card/i)).toBeInTheDocument();
  });

  it('renders with missing optional data (e.g., no retailer or payment method)', () => {
    (bookingApi.useBookingDetails as jest.Mock).mockReturnValue({
      data: mockBookingMissingData,
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
