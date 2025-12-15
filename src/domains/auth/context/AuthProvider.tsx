import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ACCESS_TOKEN_STORAGE_NAME, accessToken } from '../storage/authStorage';
import { users, type LoginRequest } from '@apis/users';

type AuthContextType = {
  loggedIn: boolean;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logoutUser: () => void;
  hasToken: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = accessToken.get();
      if (token) {
        accessToken.save(token);
        setLoggedIn(true);
        setLoading(false);
        return;
      }
      accessToken.remove();
      setLoggedIn(false);
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ACCESS_TOKEN_STORAGE_NAME && e.newValue !== null) {
        accessToken.save(e.newValue);
        setLoggedIn(!!e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    const data = await users.postLogin(credentials);
    accessToken.save(data.accessToken);
    setLoggedIn(true);
  }, []);

  const logoutUser = useCallback(() => {
    accessToken.remove();
    setLoggedIn(false);
  }, []);

  const hasToken = useCallback(() => {
    const token = accessToken.get();
    return !!token;
  }, []);

  const value = {
    loggedIn,
    loading,
    login,
    logoutUser,
    hasToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 는 AuthProvider 내부에서 사용해야 합니다.');
  }
  return context;
}
