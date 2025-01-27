import { HttpResponse, http } from 'msw';
import { bookingsDetails } from '../msw/bookingDetailsMockData';
import { bookings } from '../msw/bookingMockData';
import { mockAgreements } from './slaChartMockData';

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

  http.get('/api/bookings/:booking_id', (req) => {
    const { booking_id } = req.params;
    const bookingDetail = bookingsDetails.find((booking) => booking.id === booking_id);
    if (bookingDetail) {
      return HttpResponse.json(bookingDetail);
    } else {
      return HttpResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
  }),

  http.get('/api/slaDetailsApi', () => {
    return HttpResponse.json(mockAgreements);
  }),
];
