import { DashboardData } from '@/types/dashboard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchDashboardData = async () => {
  const response = await axios.get('/api/dashboard');
  return response?.data;
};

export const useDashboardData = () => {
  return useQuery<DashboardData>({ queryKey: ['dashboardData'], queryFn: fetchDashboardData });
};
