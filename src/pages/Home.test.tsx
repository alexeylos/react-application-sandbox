import { render, screen } from '@testing-library/react';
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
});
