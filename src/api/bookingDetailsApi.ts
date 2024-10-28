import { BookingDetailsData } from '@/types/booking';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBookingDetails = async (bookingId: string): Promise<BookingDetailsData> => {
  try {
    const response = await axios.get(`/api/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking details:', error);
    throw new Error('Failed to fetch booking details');
  }
};

export const useBookingDetails = (bookingId: string) => {
  return useQuery<BookingDetailsData>({
    queryKey: ['bookingDetails', bookingId],
    queryFn: () => fetchBookingDetails(bookingId),
    enabled: !!bookingId,
  });
};
