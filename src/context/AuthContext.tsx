import {
  FC,
  ReactNode,
  useMemo,
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import { loadAuthToken, saveAuthToken } from '../utils/localStorage';

export type ContextType = {
  isLoaded: boolean;
  isLoading: boolean;
  token?: string;
  login: (token: string) => void;
};

type ProviderProps = {
  children: ReactNode | Array<ReactNode>;
};

const AuthContext = createContext<ContextType>({
  isLoaded: false,
  isLoading: true,
  token: undefined,
  login: () => {},
});

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    const loadedToken = loadAuthToken();
    if (loadedToken) {
      setToken(loadedToken);
    }
    setIsLoading(false);
    setIsLoaded(true);
  }, [isLoaded, isLoading]);

  const login = useCallback((token: string) => {
    setToken(token);
    saveAuthToken(token);
  }, []);

  const value = useMemo(
    () => ({
      isLoaded,
      isLoading,
      token,
      login,
    }),
    [isLoaded, isLoading, token, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
