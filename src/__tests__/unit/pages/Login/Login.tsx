import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import userEvent from '@testing-library/user-event';

import LoginPage from '../../../../pages/login';

jest.mock('../../../../context/AuthContext');

const mutationMock = jest.fn();
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useMutation: () => ({
    mutate: mutationMock,
    isSuccess: false,
    isLoading: false,
    isError: false,
    error: null,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('LoginPage', () => {
  const navigate = require('react-router-dom').useNavigate();
  const mockUseAuthContext = require('../../../../context/AuthContext').useAuthContext;
  const authContextValue = {
    token: null,
    isLoaded: true,
    updateToken: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
    mockUseAuthContext.mockReturnValue(authContextValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <LoginPage />
      </QueryClientProvider>
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('calls loginMutation on form submit', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <LoginPage />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'test_username' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'test_password' } });

    const submitButton = screen.getByRole('button', { name: /log in/i });
    await waitFor(() => expect(submitButton).toBeEnabled());

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mutationMock).toHaveBeenCalledWith(
        { username: 'test_username', password: 'test_password' },
        expect.objectContaining({ onSuccess: expect.any(Function) })
      );
    });
  });
});
