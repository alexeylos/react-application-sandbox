import { render } from '@testing-library/react';
import { Layout } from 'antd';

jest.mock('../../lib/responsive', () => ({
  __esModule: true,
  useBreakpoint: jest.fn(),
}));

jest.mock('../shared/SiderMenu', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="silder-menu">Mocked SilderMenu</div>),
}));

jest.mock('../shared/HamburgerMenu', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="hamburger-menu">Mocked HamburgerMenu</div>),
}));

describe('Layout Component', () => {
  it('should render children content', () => {
    const { getByText, getByTestId } = render(
      <Layout>
        <div data-testid="silder-menu">Test Content</div>
      </Layout>,
    );

    expect(getByTestId('silder-menu')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});

describe('Layout Component', () => {
  it('should render children content', () => {
    const { getByText, getByTestId } = render(
      <Layout>
        <div data-testid="hamburger-menu">Hambuger test Content</div>
      </Layout>,
    );

    expect(getByTestId('hamburger-menu')).toBeInTheDocument();
    expect(getByText('Hambuger test Content')).toBeInTheDocument();
  });
});
