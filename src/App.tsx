import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from './context/AuthContext';

import RootPage from './pages/root';
import LoginPage from './pages/login';
import ServersPage from './pages/servers';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<RootPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/servers"
                element={
                  <ProtectedRoute>
                    <ServersPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
