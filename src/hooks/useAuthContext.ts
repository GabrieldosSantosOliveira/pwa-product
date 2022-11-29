import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
  const value = useContext(AuthContext);
  return value;
};
