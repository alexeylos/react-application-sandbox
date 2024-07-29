import { Booking } from '../types/booking';
import dayjs from 'dayjs';

export const bookings: Booking[] = Array.from({ length: 21 }, (_, i) => ({
  id: `B${i + 1}`,
  booking_dttm: dayjs().subtract(i, 'day').toISOString(),
  carrier_name: `Carrier ${i + 1}`,
  passenger: `Passenger ${i + 1}`,
  departure_station: `Station ${i + 1}`,
  departure_dttm: dayjs().subtract(i, 'day').toISOString(),
  arrival_station: `Station ${i + 1}`,
  arrival_dttm: dayjs().add(i, 'day').toISOString(),
  total_price: (100 + i * 10).toFixed(2),
  currency: 'USD',
  status: i % 2 === 0 ? 'active' : 'cancelled',
}));
