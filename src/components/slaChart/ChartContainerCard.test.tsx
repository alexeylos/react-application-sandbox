import { Agreement } from '@/types/slaChart';
import { render, screen } from '@testing-library/react';
import ChartContainerCard from './ChartContainerCard';

jest.mock('../reusable/chart/LineChart', () => {
  const MockLineChart = () => <div>LineChart Component</div>;
  MockLineChart.displayName = 'LineChart';
  return MockLineChart;
});

jest.mock('../reusable/chart/Barchart', () => {
  const MockBarchart = () => <div>Barchart Component</div>;
  MockBarchart.displayName = 'Barchart';
  return MockBarchart;
});

const mockData: Agreement = {
  id: '1',
  name: 'Test Agreement',
  indicators: [
    {
      id: '1',
      name: 'uptime',
      title: 'Uptime Indicator',
      description: 'Uptime description',
      type: 'percentage',
      unit: 'ms',
      internal_objective: 99,
      external_objective: 95,
      values: [
        { value: 0.2999, date: '2024-10-12' },
        { value: 0.6423, date: '2024-10-13' },
      ],
    },
    {
      id: '2',
      name: 'response-time',
      title: 'Response Time Indicator',
      description: 'Response Time description',
      type: 'time',
      unit: 'ms',
      internal_objective: 200,
      external_objective: 300,
      values: [
        { value: 107.1436, date: '2024-10-12', category: 'Checkout page latency' },
        { value: 106.7118, date: '2024-10-13', category: 'Internal objective' },
      ],
    },
  ],
};

describe('ChartContainerCard', () => {
  it('renders chart container with correct title', () => {
    render(<ChartContainerCard data={mockData} />);
    expect(screen.getByText('Test Agreement')).toBeInTheDocument();
  });

  it('renders uptime indicator correctly', () => {
    render(<ChartContainerCard data={mockData} />);
    expect(screen.getByText('Uptime Indicator')).toBeInTheDocument();
    expect(screen.getByText(/64\.23\s*%/i)).toBeInTheDocument();
  });

  it('renders response-time indicator correctly', () => {
    render(<ChartContainerCard data={mockData} />);
    expect(screen.getByText('Response Time Indicator')).toBeInTheDocument();
    expect(screen.getByText(/106\.71\s*ms/i)).toBeInTheDocument();
  });

  it('renders appropriate chart type based on indicator type', () => {
    render(<ChartContainerCard data={mockData} />);
    expect(screen.getByText('LineChart Component')).toBeInTheDocument();
    expect(screen.getByText('Barchart Component')).toBeInTheDocument();
  });

  it('renders the last column with 24-column width if indicators length is odd', () => {
    const oddMockData: Agreement = {
      ...mockData,
      indicators: [
        ...mockData.indicators,
        {
          id: '3',
          name: 'latency',
          title: 'Latency Indicator',
          description: 'Latency description',
          type: 'time',
          unit: 'ms',
          internal_objective: 0,
          external_objective: 0,
          values: [],
        },
      ],
    };

    render(<ChartContainerCard data={oddMockData} />);
    const lastCol = document.querySelectorAll('.ant-col')[oddMockData.indicators.length - 1];

    expect(lastCol).toHaveClass('ant-col-xs-24 ant-col-xl-24');
  });

  it('renders correctly when indicator values are empty', () => {
    const noValuesMockData = {
      ...mockData,
      indicators: mockData.indicators.map((ind) => ({ ...ind, values: [] })),
    };
    render(<ChartContainerCard data={noValuesMockData} />);
    expect(screen.getByText('Uptime Indicator')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('Response Time Indicator')).toBeInTheDocument();
    expect(screen.getByText('0 ms')).toBeInTheDocument();
  });
});
