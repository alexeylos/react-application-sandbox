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

export interface BookingDetailsData {
  id: string;
  booking_dttm: string;
  carrier_name: string;
  departure_station: string;
  departure_dttm: string;
  arrival_station: string;
  arrival_dttm: string;
  total_price: string;
  currency: string;
  status: string;
  purchaser: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  passengers: {
    name: string;
    category: 'infant' | 'child' | 'adult';
    birth_date: string;
    ticket_number: string;
  }[];
  retailer: {
    name: string;
    code: string;
  };
  payment_method: string;
}

export interface TripDetailsCardProps {
  booking: BookingDetailsData;
}
