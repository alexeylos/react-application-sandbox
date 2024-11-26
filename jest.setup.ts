import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), 
    removeListener: jest.fn(), 
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('d3-array', () => ({}));
jest.mock('@ant-design/plots', () => ({
  Chart: jest.fn(),
  Column: jest.fn(),
}));
