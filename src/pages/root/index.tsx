import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';
import Spinner from '../../assets/spinner.svg';

const RootPage = () => {
  const { token, isLoaded } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !token) {
      navigate('/login');
    } else {
      navigate('/servers');
    }
  }, [isLoaded, token]);

  return (
    <section className="min-h-screen flex m-auto">
      <img className="mx-auto" src={Spinner} alt="spinner" />
    </section>
  );
};

export default RootPage;
