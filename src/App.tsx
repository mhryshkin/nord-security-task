import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from './context/AuthContext';

import RootPage from './pages/root';
import LoginPage from './pages/login';
import ServersPage from './pages/servers';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/servers" element={<ServersPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
