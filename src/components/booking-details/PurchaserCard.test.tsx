import { bookingsDetails } from '@/msw/bookingDetailsMockData';
import { render, screen } from '@testing-library/react';
import PurchaserCard from './PurchaserCard';

describe('PurchaserCard', () => {
  it('renders the purchaser details correctly', () => {
    render(<PurchaserCard booking={bookingsDetails[0]} />);
    expect(screen.getByText('Purchaser')).toBeInTheDocument();
    expect(screen.getByText(bookingsDetails[0].purchaser.name)).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText(bookingsDetails[0].purchaser.email)).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText(bookingsDetails[0].purchaser.phone)).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText(bookingsDetails[0].purchaser.address)).toBeInTheDocument();
  });
});
