import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DashboardData } from '../types/types';

const fetchDashboardData = async () => {
  const response = await axios.get('/api/dashboard');
  return response.data;
};

export const useDashboardData = () => {
  return useQuery<DashboardData>({ queryKey: ['dashboardData'], queryFn: fetchDashboardData });
};
