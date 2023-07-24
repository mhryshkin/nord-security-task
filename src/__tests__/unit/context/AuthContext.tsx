import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuthContext } from '../../../context/AuthContext';
import { loadAuthToken, saveAuthToken } from '../../../utils/localStorage';
import { useEffect } from 'react';

jest.mock('../../../utils/localStorage');

function MockConsumer() {
  const { token } = useAuthContext();
  return <div>{token || 'No Token'}</div>;
}

describe('<AuthProvider />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads the auth token from local storage on mount', async () => {
    const mockToken = 'test-token';
    (loadAuthToken as jest.Mock).mockReturnValueOnce(mockToken);

    render(
      <AuthProvider>
        <MockConsumer />
      </AuthProvider>
    );

    expect(loadAuthToken).toBeCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText(mockToken)).toBeInTheDocument();
    });
  });

  it('starts with no token if not in local storage', async () => {
    (loadAuthToken as jest.Mock).mockReturnValueOnce(null);

    render(
      <AuthProvider>
        <MockConsumer />
      </AuthProvider>
    );

    expect(loadAuthToken).toBeCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText('No Token')).toBeInTheDocument();
    });
  });

  it('updates the token using updateToken', async () => {
    const mockToken = 'test-token';
    (loadAuthToken as jest.Mock).mockReturnValueOnce(null);

    const TestComponent: React.FC = () => {
      const { updateToken } = useAuthContext();
      useEffect(() => {
        updateToken(mockToken);
      }, [updateToken]);

      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(saveAuthToken).toBeCalledTimes(1);
      expect(saveAuthToken).toBeCalledWith(mockToken);
    });
  });
});
