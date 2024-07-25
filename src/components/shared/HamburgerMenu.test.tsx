import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('antd', () => ({
  Drawer: ({ children, visible }: { children: React.ReactNode; visible: boolean }) => (
    <div data-testid="mock-drawer" style={{ display: visible ? 'block' : 'none' }}>
      {children}
    </div>
  ),
  Button: ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <button data-testid="mock-button" onClick={onClick}>
      {children}
    </button>
  ),
  Menu: ({
    onClick,
    selectedKeys,
  }: {
    onClick: (params: { key: string }) => void;
    selectedKeys: string[];
  }) => (
    <ul data-testid="mock-menu">
      {selectedKeys.map((key) => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
        <li key={key} onClick={() => onClick({ key })}>
          {key}
        </li>
      ))}
    </ul>
  ),
}));

describe('HamburgerMenu component', () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/home' });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  });

  test('renders HamburgerMenu component', () => {
    const { getByTestId } = render(<HamburgerMenu />);

    const menuButton = getByTestId('mock-button');
    expect(menuButton).toBeInTheDocument();
  });

  test('opens and closes drawer when button is clicked', () => {
    const { getByTestId, queryByTestId } = render(<HamburgerMenu />);
    const drawer = queryByTestId('mock-drawer');
    expect(drawer).toHaveStyle('display: none');
    fireEvent.click(getByTestId('mock-button'));
    expect(drawer).toHaveStyle('display: none');
    fireEvent.click(getByTestId('mock-button'));
    expect(drawer).toHaveStyle('display: none');
  });

  test('selects menu item when clicked', () => {
    const { getByTestId } = render(<HamburgerMenu />);
    const menuList = getByTestId('mock-menu');
    fireEvent.click(menuList.firstChild as Element);
    expect(useNavigate()).toHaveBeenCalledWith('/home');
  });
});
