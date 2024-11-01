import { bookingsDetails } from '@/msw/bookingDetailsMockData';
import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import PassengersListCard from './PassengersListCard';

describe('PassengersListCard', () => {
  it('renders the passengers list correctly', () => {
    render(<PassengersListCard booking={bookingsDetails[0]} />);
    expect(screen.getByText('Passengers List')).toBeInTheDocument();
    bookingsDetails[0].passengers.forEach((passenger) => {
      expect(screen.getByText(passenger.name)).toBeInTheDocument();
      expect(
        screen.getByText(
          `${passenger.category}${
            passenger.category === 'infant'
              ? ' (0-3 years)'
              : passenger.category === 'child'
                ? ' (4-15 years)'
                : ' (16-99 years)'
          }`,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(dayjs(passenger.birth_date).format('YYYY.MM.DD')),
      ).toBeInTheDocument();
      expect(screen.getByText(passenger.ticket_number)).toBeInTheDocument();
    });
  });
});
