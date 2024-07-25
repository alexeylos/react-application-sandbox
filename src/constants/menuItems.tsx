import { HomeOutlined, BookOutlined } from '@ant-design/icons';
import { ROUTES } from './common';

const menuItems = [
  { key: ROUTES.HOME, icon: <HomeOutlined />, label: 'Home' },
  { key: ROUTES.BOOKINGS, icon: <BookOutlined />, label: 'Bookings' },
];

export default menuItems;
