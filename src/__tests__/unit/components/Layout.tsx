import { render, screen } from '@testing-library/react';
import { useAuthContext } from '../../../context/AuthContext';
import Layout from '../../../components/Layout';

jest.mock('../../../context/AuthContext');

describe('<Layout />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders spinner when isLoading is true', () => {
    (useAuthContext as jest.Mock).mockReturnValue({ isLoading: true });

    render(
      <Layout>
        <p>Test Children</p>
      </Layout>
    );

    expect(screen.getByAltText('spinner')).toBeInTheDocument();
    expect(screen.queryByText('Test Children')).not.toBeInTheDocument();
  });

  it('renders children when isLoading is false', () => {
    (useAuthContext as jest.Mock).mockReturnValue({ isLoading: false });

    render(
      <Layout>
        <p>Test Children</p>
      </Layout>
    );

    expect(screen.getByText('Test Children')).toBeInTheDocument();
    expect(screen.queryByAltText('spinner')).not.toBeInTheDocument();
  });
});
