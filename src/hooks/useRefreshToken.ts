import { useToast } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../services/api';
import { createStorage } from '../services/createStorage';
import { getStorage } from '../services/getStorage';

export const useRefreshToken = () => {
  const [isRefreshing, setIsRefreshing] = useState(1);
  const [token, setToken] = useState(() => {
    const storage = getStorage('token');
    if (storage) {
      return storage;
    }
    return undefined;
  });

  const refreshToken = getStorage('refreshToken');
  const id = getStorage('id');
  const handleRefreshToken = async () => {
    try {
      const { data } = await api.post(
        '/auth/refreshToken',
        {
          refreshToken,
          id
        }
      );
      setToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) return;
    handleRefreshToken();
  }, [isRefreshing]);
  setInterval(() => {
    setIsRefreshing(prevState => prevState + 1);
  }, 5555);
  return { token };
};
