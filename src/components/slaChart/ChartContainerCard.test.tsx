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
    const chartDiv = screen
      .getByText('Response Time Indicator')
      .closest('.inner-card-header')
      ?.querySelector('.chart');
    expect(chartDiv).toContainHTML('<svg');
  });
});
