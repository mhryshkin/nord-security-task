import { FC } from 'react';

import { useAuthContext } from '../context/AuthContext';
import Spinner from '../assets/spinner.svg';

type Props = {
  children?: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const { isLoading } = useAuthContext();

  return (
    <section className="min-h-screen flex">
      {isLoading ? <img className="mx-auto" src={Spinner} alt="spinner" /> : children}
    </section>
  );
};

export default Layout;
