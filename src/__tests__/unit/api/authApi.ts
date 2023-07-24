import authApi from '../../../api/authApi';
import axios from '../../../api/axios';

jest.mock('../../../api/axios', () => {
  return {
    post: jest.fn(),
    defaults: {
      headers: {
        common: {},
      },
    },
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('authApi', () => {
  it('calls the login endpoint with given data and sets the Authorization header', async () => {
    const postData = { username: 'test_username', password: 'test_password' };
    const token = 'test_token';

    (axios.post as jest.Mock).mockResolvedValue({ data: { token } });

    const data = await authApi.login(postData);

    expect(axios.post).toHaveBeenCalledWith('/tokens', postData);
    expect(axios.defaults.headers.common['Authorization']).toEqual(`Bearer ${token}`);
    expect(data).toEqual({ token });
  });

  it('removes the Authorization header on logout', () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer token';

    authApi.logout();

    expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
  });
});
