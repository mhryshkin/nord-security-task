import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from './assets/nord-security.svg';
import Logout from './assets/logout.svg';

import { useAuthContext } from './context/AuthContext';
import authApi from './api/authApi';

type Props = {
  children?: React.ReactNode;
};

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { token, isLoaded, updateToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !token) {
      navigate('/login');
    }
  }, [isLoaded, token]);

  const logout = useCallback(() => {
    authApi.logout();
    updateToken(null);
  }, []);

  if (isLoaded && !token) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="w-full shadow-lg">
        <div className="max-w-[1080px] mx-auto flex justify-between items-center px-10 py-4">
          <div>
            <img className="w-50" src={Logo} alt="logo" />
          </div>
          <button onClick={logout}>
            <img className="w-6 h-6 hover:opacity-70" src={Logout} alt="logout" />
          </button>
        </div>
      </div>

      <div className="p-10 max-w-[1080px] mx-auto">{children}</div>
    </div>
  );
};

export default ProtectedRoute;
