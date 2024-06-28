import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { mocked } from 'jest-mock';
import { useDashboardData } from './api/dashboard';

jest.mock('./styles.less', () => jest.fn());

jest.mock('./api/dashboard.ts', () => ({
  useDashboardData: jest.fn(),
}));

describe('App Component', () => {
  it('renders loading state', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(<App />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders error state', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: null,
    });

    render(<App />);
    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('renders data when request is successful', async () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { user_name: 'Jane Doe', tickets_sold: 100 },
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Project X!')).toBeInTheDocument();
      expect(screen.getByText('User Name: Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('Tickets Sold: 100')).toBeInTheDocument();
    });
  });
});
