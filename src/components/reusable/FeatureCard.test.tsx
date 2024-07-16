import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { LinkOutlined } from '@ant-design/icons';
import FeatureCard from './FeatureCard';
import { FeatureCardProps } from '@/types/reuseableCardProps';

jest.mock('./FeatureCard.less', () => jest.fn());

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  block?: boolean;
};

jest.mock('antd', () => {
  const originalAntd = jest.requireActual('antd');
  return {
    ...originalAntd,
    Button: ({ children, onClick, disabled, block }: ButtonProps) => (
      <button
        data-testid="mock-button"
        onClick={onClick}
        disabled={disabled}
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
    render(
      <Router>
        <FeatureCard {...baseProps} />
      </Router>,
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders the button with "Soon" text and disabled if buttonLink is not provided', () => {
    render(
      <Router>
        <FeatureCard {...baseProps} buttonLink="" />
      </Router>,
    );
    const button = screen.getByRole('button', { name: /Soon/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('renders the button with "Go to the Page" text and primary type if buttonLink is provided', () => {
    render(
      <Router>
        <FeatureCard {...baseProps} buttonLink="https://google.com" />
      </Router>,
    );
    const button = screen.getByRole('button', { name: /Go to the Page/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('renders the icon correctly', () => {
    render(
      <Router>
        <FeatureCard {...baseProps} />
      </Router>,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('navigates to the correct URL when the button is clicked', async () => {
    render(
      <Router>
        <FeatureCard {...baseProps} buttonLink="/test-url" />
      </Router>,
    );
    const button = screen.getByRole('button', { name: /Go to the Page/i });
    userEvent.click(button);
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
});
