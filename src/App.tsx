import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import RootPage from './pages/root';
import LoginPage from './pages/login';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/servers" element={< />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
