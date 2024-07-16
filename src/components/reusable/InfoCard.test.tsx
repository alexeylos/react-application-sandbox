import { render } from '@testing-library/react';
import InfoCard from './InfoCard';
import { ReusableCardProps } from '@/types/reuseableCardProps';

jest.mock('./InfoCard.less', () => jest.fn());
jest.mock('../../asset/dollar.svg', () => 'test-file-stub');

jest.mock('../../utils/common', () => ({
  getDeltaTagColor: jest.fn((delta) => (delta > 0 ? 'green' : 'red')),
}));

describe('InfoCard', () => {
  const props: ReusableCardProps = {
    title: 'Revenue',
    value: 1000,
    delta: 50,
    currency: 'USD',
  };

  it('renders the component with the correct title and value', () => {
    const { getByText } = render(<InfoCard {...props} />);
    expect(getByText('Revenue')).toBeInTheDocument();
    expect(getByText('1000')).toBeInTheDocument();
  });

  it('displays the USD currency symbol', () => {
    const { container } = render(<InfoCard {...props} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('shows the correct delta value with green upward icon', () => {
    const { getByText, container } = render(<InfoCard {...props} />);
    const deltaElement = getByText('+50');
    expect(deltaElement).toBeInTheDocument();
    expect(deltaElement).toHaveClass('color-green');
    const icon = container.querySelector('.anticon-rise');
    expect(icon).toBeInTheDocument();
  });

  it('shows the correct delta value with red downward icon', () => {
    const negativeProps = { ...props, delta: -50 };
    const { getByText, container } = render(<InfoCard {...negativeProps} />);
    const deltaElement = getByText('-50');
    expect(deltaElement).toBeInTheDocument();
    expect(deltaElement).toHaveClass('color-red');
    const icon = container.querySelector('.anticon-fall');
    expect(icon).toBeInTheDocument();
  });

  it('does not display any delta icon when delta is zero', () => {
    const zeroDeltaProps = { ...props, delta: 0 };
    const { container } = render(<InfoCard {...zeroDeltaProps} />);
    const icon = container.querySelector('.anticon');
    expect(icon).not.toBeInTheDocument();
  });
});
