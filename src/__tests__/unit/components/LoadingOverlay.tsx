import { render, screen } from '@testing-library/react';
import LoadingOverlay from '../../../components/LoadingOverlay';

afterEach(() => {
  jest.clearAllMocks();
});

describe('<LoadingOverlay />', () => {
  it('renders spinner', () => {
    render(<LoadingOverlay />);

    expect(screen.getByAltText('spinner')).toBeInTheDocument();
  });

  it('renders with correct class names', () => {
    const { container } = render(<LoadingOverlay />);

    expect(container.firstChild).toHaveClass(
      'absolute top-0 left-0 w-full h-full rounded-lg flex justify-center items-center backdrop-blur-sm z-10'
    );
  });
});
