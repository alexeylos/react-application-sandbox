import { BookingDetailsData } from '@/types/booking';
import dayjs from 'dayjs';

export const bookingsDetails: BookingDetailsData[] = Array.from({ length: 21 }, (_, i) => ({
  id: `B${i + 1}`,
  booking_dttm: dayjs().subtract(i, 'day').toISOString(),
  carrier_name: `Carrier ${i + 1}`,
  departure_station: `Station ${i + 1}`,
  departure_dttm: dayjs().subtract(i, 'day').toISOString(),
  arrival_station: `Station ${i + 1}`,
  arrival_dttm: dayjs().add(i, 'day').toISOString(),
  total_price: (100 + i * 10).toFixed(2),
  currency: 'USD',
  status: i % 2 === 0 ? 'active' : 'cancelled',
  purchaser: {
    name: `Purchaser ${i + 1}`,
    email: `purchaser${i + 1}@example.com`,
    phone: `+123456789${i}`,
    address: `Address ${i + 1}, City ${i + 1}, Country`,
  },
  passengers: [
    {
      name: `Passenger ${i + 1}`,
      category: i % 3 === 0 ? 'infant' : i % 2 === 0 ? 'child' : 'adult',
      birth_date: dayjs()
        .subtract(5 + i, 'year')
        .toISOString(),
      ticket_number: `TK${i + 1}`,
    },
  ],
  retailer: {
    name: `Retailer ${i + 1}`,
    code: `RET${i + 1}`,
  },
  payment_method: i % 2 === 0 ? 'Credit Card' : 'PayPal',
}));
