import { bookingsDetails } from '@/msw/bookingDetailsMockData';
import { render, screen } from '@testing-library/react';
import TripDetailsCard from './TripDetailsCard';

describe('TripDetailsCard', () => {
  it('renders trip details correctly', () => {
    render(<TripDetailsCard booking={bookingsDetails[0]} />);
    expect(screen.getByText('Trip Details')).toBeInTheDocument();
    expect(
      screen.getByText(`Carrier name : ${bookingsDetails[0].carrier_name}`),
    ).toBeInTheDocument();
    expect(screen.getByText('Booked at')).toBeInTheDocument();
  });
});
