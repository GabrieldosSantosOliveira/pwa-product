import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';
interface IPrivateRouteProps {
  redirectTo: string;
}
export const PrivateRoute = ({
  redirectTo
}: IPrivateRouteProps): JSX.Element => {
  const { isLogged } = useAuthContext();
  return isLogged ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} />
  );
};
