import { HttpResponse, http } from 'msw';
import { bookings } from '../msw/bookingMockData';

export const handlers = [
  http.get('/api/dashboard', () => {
    return HttpResponse.json({
      name: 'John Doe',
      pax: 2043,
      pax_delta: 100,
      gmv: 340302,
      gmv_delta: -10000,
      currency: 'USD',
    });
  }),
  http.get('/api/bookings', () => {
    return HttpResponse.json(bookings);
  }),
];
