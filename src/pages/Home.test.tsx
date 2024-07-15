import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mocked } from 'jest-mock';
import { useDashboardData } from '../api/dashboard';
import Home from './Home';

jest.mock('./styles.less', () => jest.fn());

jest.mock('../api/dashboard.ts', () => ({
  useDashboardData: jest.fn(),
}));

describe('App Component', () => {
  it('renders loading state', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(<Home />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders error state', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    render(<Home />);
    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('renders data when request is successful', async () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        name: 'John Doe',
        pax: 2043,
        pax_delta: 100,
        gmv: 340302,
        gmv_delta: -10000,
        currency: 'USD',
      },
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('John Doe !')).toBeInTheDocument();
    });
  });
});
