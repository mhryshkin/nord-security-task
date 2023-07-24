import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import RootPage from '../../../pages/root';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('<RootPage />', () => {
  it('redirects to /login when token is not loaded', () => {
    render(
      <AuthContext.Provider
        value={{ isLoaded: true, token: null, isLoading: false, updateToken: jest.fn() }}
      >
        <Router initialEntries={['/']}>
          <RootPage />
        </Router>
      </AuthContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('redirects to /servers when token is loaded', () => {
    render(
      <AuthContext.Provider
        value={{ isLoaded: true, token: 'test-token', isLoading: false, updateToken: jest.fn() }}
      >
        <Router initialEntries={['/']}>
          <RootPage />
        </Router>
      </AuthContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/servers');
  });
});
