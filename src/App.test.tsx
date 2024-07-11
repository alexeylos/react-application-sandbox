import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

interface MenuProps {
  children: React.ReactNode;
}

interface MenuItemProps {
  children: React.ReactNode;
}

jest.mock('./styles.less', () => jest.fn());

jest.mock('antd', () => {
  const originalAntd = jest.requireActual('antd');

  return {
    ...originalAntd,
    Menu: (props: MenuProps) => <div>{props.children}</div>,
    MenuItem: ({ children }: MenuItemProps) => <div data-testid="home-menu-item">{children}</div>,
  };
});

test('renders Home page on initial render', () => {
  render(<App />);
  expect(screen.getByText('Home')).toBeInTheDocument();
});
