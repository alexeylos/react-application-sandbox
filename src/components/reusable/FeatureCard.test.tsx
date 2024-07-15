// FeatureCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeatureCard from './FeatureCard';
import { FeatureCardProps } from '@/types/reuseableCardProps';
import { LinkOutlined } from '@ant-design/icons';

type ButtonProps = {
  children: React.ReactNode;
  block?: boolean;
};

jest.mock('antd', () => {
  const originalAntd = jest.requireActual('antd');

  return {
    ...originalAntd,
    Button: ({ children, block, ...props }: ButtonProps) => (
      <button
        data-testid="mock-button"
        {...props}
        style={{ display: block ? 'block' : 'inline-block' }}
      >
        {children}
      </button>
    ),
  };
});

describe('FeatureCard', () => {
  const baseProps: FeatureCardProps = {
    icon: <LinkOutlined data-testid="icon" />,
    title: 'Test Title',
    description: 'Test Description',
    buttonLink: '',
  };

  it('renders without crashing', () => {
    render(<FeatureCard {...baseProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders the button with "Soon" text and disabled if buttonLink is not provided', () => {
    render(<FeatureCard {...baseProps} buttonLink="" />);
    const button = screen.getByRole('button', { name: /Soon/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('renders the button with "Go to the Page" text and primary type if buttonLink is provided', () => {
    render(<FeatureCard {...baseProps} buttonLink="https://google.com" />);
    const button = screen.getByRole('button', { name: /Go to the Page/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', 'https://google.com');
  });

  it('renders the icon correctly', () => {
    render(<FeatureCard {...baseProps} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
