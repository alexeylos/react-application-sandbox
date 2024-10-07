import { Booking } from '@/types/booking';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBookings = async () => {
  try {
    const response = await axios.get('/api/bookings');
    return response?.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};

export const useBookings = () => {
  return useQuery<Booking[]>({ queryKey: ['bookings'], queryFn: fetchBookings });
};
