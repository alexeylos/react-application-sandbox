import { Agreement } from '@/types/slaChart';
import { render, screen } from '@testing-library/react';
import { useSlaChart } from '../api/slaDetailsApi';
import Sla from './Sla';

jest.mock('../api/slaDetailsApi', () => ({
  useSlaChart: jest.fn(),
}));

interface MockDataItem {
  id: number;
  name: string;
  metrics: Record<string, unknown>[];
}

jest.mock('../components/SlaChart/ChartContainerCard', () => {
  const MockChartContainerCard = ({ data }: { data: Agreement }) => (
    <div data-testid="chart-container-card">{JSON.stringify(data)}</div>
  );

  MockChartContainerCard.displayName = 'ChartContainerCard';

  return MockChartContainerCard;
});

describe('Sla Component', () => {
  it('displays loading spinner while fetching data', () => {
    (useSlaChart as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<Sla />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('displays error message if fetching data fails', () => {
    (useSlaChart as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<Sla />);

    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('renders ChartContainerCard for each data item when data is available', () => {
    const mockData: MockDataItem[] = [
      { id: 1, name: 'Chart 1', metrics: [] },
      { id: 2, name: 'Chart 2', metrics: [] },
    ];
    (useSlaChart as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    render(<Sla />);

    expect(screen.getByText('SLA')).toBeInTheDocument();
    expect(screen.getByText('Metrics for last 7 days')).toBeInTheDocument();
    expect(screen.getAllByTestId('chart-container-card')).toHaveLength(2);
    expect(screen.getByText(JSON.stringify(mockData[0]))).toBeInTheDocument();
    expect(screen.getByText(JSON.stringify(mockData[1]))).toBeInTheDocument();
  });
});
