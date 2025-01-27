import { IndicatorValue } from '@/types/slaChart';
import { render } from '@testing-library/react';
import LineChart from './LineChart';

jest.mock('@ant-design/plots', () => ({
  Line: jest.fn(() => <div data-testid="mock-line-chart">Mock Line Chart</div>),
}));

describe('LineChart Component', () => {
  const mockData: IndicatorValue[] = [
    { date: '2024-01-01', value: 100, category: 'A' },
    { date: '2024-01-02', value: 150, category: 'B' },
  ];

  it('renders without crashing', () => {
    const { getByTestId } = render(<LineChart data={mockData} />);
    const lineChart = getByTestId('mock-line-chart');
    expect(lineChart).toBeInTheDocument();
  });

  it('passes correct props to the Line component', () => {
    render(<LineChart data={mockData} />);

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mockLine = require('@ant-design/plots').Line;
    expect(mockLine).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: 'dark',
        data: mockData,
        xField: 'date',
        yField: 'value',
        sizeField: 'value',
        legend: { size: false },
        colorField: 'category',
      }),
      {},
    );
  });
});
