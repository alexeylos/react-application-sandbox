import menuItems from './menuItems';
import { ROUTES } from './common';
import { HomeOutlined, BookOutlined } from '@ant-design/icons';

describe('menuItems', () => {
  it('should contain the correct menu items', () => {
    expect(menuItems).toEqual([
      { key: ROUTES.HOME, icon: <HomeOutlined />, label: 'Home' },
      { key: ROUTES.BOOKINGS, icon: <BookOutlined />, label: 'Bookings' },
    ]);
  });
});
