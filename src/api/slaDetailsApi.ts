import { Agreement } from '@/types/slaChart';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSlaChartData = async () => {
  try {
    const response = await axios.get('/api/slaDetailsApi');
    return response?.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};

export const useSlaChart = () => {
  return useQuery<Agreement[]>({ queryKey: ['slaGraphData'], queryFn: fetchSlaChartData });
};
