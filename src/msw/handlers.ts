import { HttpResponse, http } from 'msw';
import { bookings } from '../msw/bookingMockData';

export const handlers = [
  http.get('/api/dashboard', () => {
    return HttpResponse.json({
      user_name: 'John Doe',
      tickets_sold: 42,
    });
  }),
  http.get('/api/bookings', () => {
    return HttpResponse.json(bookings);
  }),
];
