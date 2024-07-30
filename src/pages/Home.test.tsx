import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mocked } from 'jest-mock';
import { useDashboardData } from '../api/dashboard';
import Home from './Home';

jest.mock('./Home.less', () => jest.fn());
jest.mock('../api/dashboard', () => ({
  useDashboardData: jest.fn(),
}));

describe('Home Component', () => {
  it('renders loading state', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(
      <Router>
        <Home />
      </Router>,
    );

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders error state', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    render(
      <Router>
        <Home />
      </Router>,
    );

    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('renders loaded state with data', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        name: 'John Doe',
        pax: 123,
        pax_delta: 10,
        gmv: 1000,
        gmv_delta: 50,
        currency: 'USD',
      },
    });

    render(
      <Router>
        <Home />
      </Router>,
    );

    expect(
      screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'span' && content.includes('John Doe');
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('PAX booked')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('GMV')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        name: 'John Doe',
        pax: 123,
        pax_delta: 10,
        gmv: 1000,
        gmv_delta: 50,
        currency: 'USD',
      },
    });

    render(
      <Router>
        <Home />
      </Router>,
    );

    expect(screen.getByText('Booking')).toBeInTheDocument();
    expect(screen.getByText('Trading')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('navigates to correct route when feature card is clicked', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        name: 'John Doe',
        pax: 123,
        pax_delta: 10,
        gmv: 1000,
        gmv_delta: 50,
        currency: 'USD',
      },
    });

    render(
      <Router>
        <Home />
      </Router>,
    );

    const bookingCard = screen.getByText('Booking');
    fireEvent.click(bookingCard);
    expect(window.location.pathname).toBe('/');
  });

  it('renders feature card descriptions correctly', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        name: 'John Doe',
        pax: 123,
        pax_delta: 10,
        gmv: 1000,
        gmv_delta: 50,
        currency: 'USD',
      },
    });

    render(
      <Router>
        <Home />
      </Router>,
    );

    expect(screen.getByText('Manage your bookings.')).toBeInTheDocument();
    expect(screen.getByText('This feature is coming soon.')).toBeInTheDocument();
    expect(screen.getByText('Customize your application')).toBeInTheDocument();
  });

  it('checks if the feature cards have the correct links and buttons', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        name: 'John Doe',
        pax: 123,
        pax_delta: 10,
        gmv: 1000,
        gmv_delta: 50,
        currency: 'USD',
      },
    });

    render(
      <Router>
        <Home />
      </Router>,
    );

    const bookingButton = screen.getByText('Go to the Page');
    expect(bookingButton).toBeInTheDocument();

    const soonButtons = screen.queryAllByText('Soon');
    expect(soonButtons).toHaveLength(2);
    const [tradingButton, settingsButton] = soonButtons;
    expect(tradingButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });
});
