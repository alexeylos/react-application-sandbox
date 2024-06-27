import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Hello World title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Hello World!/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Primary and Dashed buttons', () => {
  render(<App />);
  const primaryButton = screen.getByText(/Primary Button/i);
  const dashedButton = screen.getByText(/Dashed Button/i);
  expect(primaryButton).toBeInTheDocument();
  expect(dashedButton).toBeInTheDocument();
});
