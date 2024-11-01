import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ExtraInfo from './ExtraInfo';

describe('ExtraInfo Component', () => {
  it('renders ExtraInfo component with title and text', () => {
    render(<ExtraInfo />);
    expect(screen.getByText('Extra')).toBeInTheDocument();
    expect(screen.getByText('No extras')).toBeInTheDocument();
  });
});
