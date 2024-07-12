import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  it('renders "Home" text', () => {
    render(<Home />);
    const homeElement = screen.getByText(/Home/i);
    expect(homeElement).toBeInTheDocument();
  });
});
