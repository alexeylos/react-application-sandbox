module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'esbuild-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^antd/es/(.*)$': 'antd/lib/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/api/*.ts',
    '!src/msw/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 30,
      functions: 30,
      lines: 80,
    },
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
