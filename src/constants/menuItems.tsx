import { BarChartOutlined, BookOutlined, HomeOutlined } from '@ant-design/icons';
import { ROUTES } from './common';

const menuItems = [
  { key: ROUTES.HOME, icon: <HomeOutlined />, label: 'Home' },
  { key: ROUTES.BOOKINGS, icon: <BookOutlined />, label: 'Bookings' },
  { key: ROUTES.SLA, icon: <BarChartOutlined />, label: 'SLA' },
];

export default menuItems;
