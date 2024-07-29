export interface Booking {
  id: string;
  booking_dttm: string;
  carrier_name: string;
  passenger: string;
  departure_station: string;
  departure_dttm: string;
  arrival_station: string;
  arrival_dttm: string;
  total_price: string;
  currency: string;
  status: string;
}
