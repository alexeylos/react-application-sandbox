import { BarChartOutlined, BookOutlined, HomeOutlined } from '@ant-design/icons';
import { ROUTES } from './common';
import menuItems from './menuItems';

describe('menuItems', () => {
  it('should contain the correct menu items', () => {
    expect(menuItems).toEqual([
      { key: ROUTES.HOME, icon: <HomeOutlined />, label: 'Home' },
      { key: ROUTES.BOOKINGS, icon: <BookOutlined />, label: 'Bookings' },
      { key: ROUTES.SLA, icon: <BarChartOutlined />, label: 'SLA' },
    ]);
  });
});
