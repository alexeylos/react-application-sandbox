import { render, screen } from '@testing-library/react';
import Bookings from './Bookings';

describe('Home Component', () => {
  it('renders "Home" text', () => {
    render(<Bookings />);
    const homeElement = screen.getByText(/Booking/i);
    expect(homeElement).toBeInTheDocument();
  });
});
