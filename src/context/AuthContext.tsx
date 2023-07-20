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
  token: string | null;
  updateToken: (token: string | null) => void;
};

type ProviderProps = {
  children: ReactNode | Array<ReactNode>;
};

const AuthContext = createContext<ContextType>({
  isLoaded: false,
  isLoading: true,
  token: null,
  updateToken: () => {},
});

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadedToken = loadAuthToken();
    if (loadedToken) {
      setToken(loadedToken);
    }
    setIsLoading(false);
    setIsLoaded(true);
  }, [isLoaded, isLoading]);

  const updateToken = useCallback((token: string | null) => {
    setToken(token);
    saveAuthToken(token);
  }, []);

  const value = useMemo(
    () => ({
      isLoaded,
      isLoading,
      token,
      updateToken,
    }),
    [isLoaded, isLoading, token, updateToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
