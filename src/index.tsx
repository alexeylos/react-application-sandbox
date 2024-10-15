import { createRoot } from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme } from 'antd';

const queryClient = new QueryClient();

async function deferRender() {
  const { worker } = await import('./msw/browser-worker');
  return worker.start();
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with id 'root' not found in the document");
}

deferRender().then(() => {
  const root = createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#7f00ff',
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        <App />
      </ConfigProvider>
    </QueryClientProvider>,
  );
});
