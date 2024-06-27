import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { useDashboardData } from './hooks/useDashboardData';
import { mocked } from 'jest-mock';

jest.mock('./styles.less', () => jest.fn());

jest.mock('./hooks/useDashboardData.ts', () => ({
  useDashboardData: jest.fn(),
}));

const queryClient = new QueryClient();

describe('App Component', () => {
  it('renders loading state', () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
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
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('renders data when request is successful', async () => {
    (mocked(useDashboardData) as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: { user_name: 'Jane Doe', tickets_sold: 100 },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Project X!')).toBeInTheDocument();
      expect(screen.getByText('User Name: Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('Tickets Sold: 100')).toBeInTheDocument();
    });
  });
});
