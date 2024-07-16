import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SiderMenu from './SiderMenu';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({ pathname: '/home' }),
}));

describe('SilderMenu', () => {
  it('should render the logo and menu items', () => {
    render(
      <Router>
        <SiderMenu />
      </Router>,
    );

    const logoImage = screen.getByRole('img', { name: /website logo/i });
    expect(logoImage).toBeInTheDocument();

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBe(2);

    const homeMenuItem = screen.getByText((text) => text.trim() === 'Home');
    expect(homeMenuItem).toBeInTheDocument();
    const bookingsMenuItem = screen.getByText((text) => text.trim() === 'Bookings');
    expect(bookingsMenuItem).toBeInTheDocument();
    expect(homeMenuItem).toHaveClass('ant-menu-title-content');
  });

  it('should update selected menu item on navigation', async () => {
    render(
      <Router>
        <SiderMenu />
      </Router>,
    );

    const bookingsLink = screen.getByText((text) => text.trim() === 'Home');
    userEvent.click(bookingsLink);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const bookingsMenuItem = screen.getByText((text) => text.trim() === 'Bookings');

    expect(bookingsMenuItem).toHaveClass('ant-menu-title-content');
  });
});
