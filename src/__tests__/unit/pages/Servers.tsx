import { render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import ServersPage from '../../../pages/servers';

const server = setupServer(
  rest.get('/servers', (_req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Server 1', distance: 100 },
        { name: 'Server 2', distance: 200 },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

afterEach(() => {
  jest.clearAllMocks();
  server.resetHandlers();
});

describe('<ServersPage />', () => {
  const queryClient = new QueryClient();

  it('displays the servers when loaded', async () => {
    const { getByText, queryByAltText } = render(
      <QueryClientProvider client={queryClient}>
        <ServersPage />
      </QueryClientProvider>
    );

    expect(queryByAltText('spinner')).toBeInTheDocument();

    await waitFor(() => expect(queryByAltText('spinner')).not.toBeInTheDocument());

    expect(getByText('Servers')).toBeInTheDocument();
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Destination')).toBeInTheDocument();
    expect(getByText('Server 1')).toBeInTheDocument();
    expect(getByText('Server 2')).toBeInTheDocument();
  });
});
