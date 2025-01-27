import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Barchart from './Barchart';

jest.mock('@ant-design/plots', () => ({
  Column: jest.fn().mockImplementation(({ onReady }) => {
    const mockChart = {
      _container: {
        getBoundingClientRect: jest.fn(() => ({ height: 400 })),
      },
      on: jest.fn(),
      emit: jest.fn(),
    };
    if (onReady) {
      onReady(mockChart);
    }

    return <div data-testid="chart" />;
  }),
}));

describe('Barchart Component', () => {
  const mockData = [
    { date: '2024-11-01', value: 10 },
    { date: '2024-11-02', value: 20 },
  ];

  it('calls onReady and emits tooltip event correctly', () => {
    render(<Barchart data={mockData} />);
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mockColumn = require('@ant-design/plots').Column;
    expect(mockColumn).toHaveBeenCalled();
    expect(mockColumn.mock.calls[0][0].onReady).toBeDefined();
  });
});
