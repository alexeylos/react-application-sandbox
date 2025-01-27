import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import SiderMenu from './SiderMenu';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('SiderMenu', () => {
  const mockedNavigate = jest.fn();
  const mockedUseLocation = useLocation as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockedNavigate);
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/home' });
  });

  it('should render the logo and menu items', () => {
    render(
      <Router>
        <SiderMenu />
      </Router>,
    );

    const logoImage = screen.getByRole('img', { name: /website logo/i });
    expect(logoImage).toBeInTheDocument();

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBe(3);

    const homeMenuItem = screen.getByText((text) => text.trim() === 'Home');
    expect(homeMenuItem).toBeInTheDocument();
    const bookingsMenuItem = screen.getByText((text) => text.trim() === 'Bookings');
    expect(bookingsMenuItem).toBeInTheDocument();
  });

  it('should update selected menu item on navigation', async () => {
    mockedUseLocation.mockReturnValue({ pathname: '/bookings' });

    render(
      <Router>
        <SiderMenu />
      </Router>,
    );

    const bookingsMenuItem = screen.getByText((text) => text.trim() === 'Bookings');
    expect(bookingsMenuItem).toHaveClass('ant-menu-title-content');
  });

  it('should handle location updates correctly for booking detail pages', () => {
    mockedUseLocation.mockReturnValue({ pathname: '/bookings/123' });

    render(
      <Router>
        <SiderMenu />
      </Router>,
    );

    const bookingsMenuItem = screen.getByText((text) => text.trim() === 'Bookings');
    expect(bookingsMenuItem).toHaveClass('ant-menu-title-content');
  });

  it('should call navigate and update current location on menu item click', async () => {
    render(
      <Router>
        <SiderMenu />
      </Router>,
    );

    const bookingsMenuItem = screen.getByText((text) => text.trim() === 'Bookings');
    await userEvent.click(bookingsMenuItem);
    expect(mockedNavigate).toHaveBeenCalledWith('/bookings');
  });
});
