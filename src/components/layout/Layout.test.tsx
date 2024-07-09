import React from 'react';
import { render } from '@testing-library/react';
import { Layout } from 'antd';

jest.mock('../shared/SilderMenu', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="silder-menu">Mocked SilderMenu</div>),
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
