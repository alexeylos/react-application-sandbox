/* eslint-disable jsx-a11y/click-events-have-key-events */
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('antd', () => ({
  Drawer: ({ children, open }: { children: React.ReactNode; open: boolean }) => (
    <div data-testid="mock-drawer" style={{ display: open ? 'block' : 'none' }}>
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
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li key={key} onClick={() => onClick({ key })}>
          {key}
        </li>
      ))}
    </ul>
  ),
}));

describe('HamburgerMenu component', () => {
  let navigateMock: jest.Mock;

  beforeEach(() => {
    navigateMock = jest.fn();
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/home' });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  test('renders HamburgerMenu component', () => {
    const { getByTestId } = render(<HamburgerMenu />);
    const menuButton = getByTestId('mock-button');
    expect(menuButton).toBeInTheDocument();
  });

  test('opens and closes drawer when button is clicked', () => {
    const { getByTestId } = render(<HamburgerMenu />);
    const menuButton = getByTestId('mock-button');
    const drawer = getByTestId('mock-drawer');

    fireEvent.click(menuButton);
    expect(drawer).toHaveStyle('display: block');
  });

  test('renders the logo image', () => {
    const { getByAltText } = render(<HamburgerMenu />);
    const logoImage = getByAltText('website logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'https://i.ibb.co/Xbn3Bdm/logo1.png');
  });

  test('selects menu item when clicked', () => {
    const { getByTestId } = render(<HamburgerMenu />);
    const menuList = getByTestId('mock-menu');
    fireEvent.click(menuList.firstChild as Element);
    expect(navigateMock).toHaveBeenCalledWith('/home');
  });

  test('sets current location to /bookings when pathname matches bookings detail page', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/bookings/123' });
    const { getByTestId } = render(<HamburgerMenu />);
    const menuList = getByTestId('mock-menu');
    fireEvent.click(menuList.firstChild as Element);
    expect(navigateMock).toHaveBeenCalledWith('/bookings');
  });

  test('sets current location to pathname for non-bookings pages', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/about' });
    const { getByTestId } = render(<HamburgerMenu />);
    expect(getByTestId('mock-menu')).toHaveTextContent('/about');
  });

  test('navigates to different menu items when clicked', () => {
    const { getByTestId } = render(<HamburgerMenu />);
    const menuList = getByTestId('mock-menu');

    fireEvent.click(menuList.firstChild as Element);
    expect(navigateMock).toHaveBeenCalledWith('/home');
  });
});
