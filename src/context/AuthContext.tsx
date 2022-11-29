import { createContext, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Loading } from '../components/Loading';
import { Authentication } from '../services/Authentication';
interface IAuthContext {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}
export const AuthContext = createContext(
  {} as IAuthContext
);
export const AuthProvider = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  useEffect(() => {
    async function Auth() {
      try {
        const response = await Authentication();
        console.log(response);
        if (!response) {
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          localStorage.removeItem('refreshToken');
        }

        setIsLogged(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    Auth();
  }, [pathname]);
  if (loading) return <Loading />;
  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      <Outlet />
    </AuthContext.Provider>
  );
};
