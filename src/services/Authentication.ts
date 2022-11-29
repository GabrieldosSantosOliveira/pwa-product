import dayjs from 'dayjs';

import { api } from '../services/api';
import { createStorage } from '../services/createStorage';
import { isTokenValid } from '../services/isTokenValid';
import { getStorage } from './../services/getStorage';

interface IRefreshTokenResponse {
  token: string;
}

export const Authentication = async () => {
  try {
    const tokenStorage = getStorage('token');
    const id = getStorage('id');
    const refreshToken = getStorage('refreshToken');
    console.log('tokenStorage', tokenStorage);
    console.log('id', id);
    if (!refreshToken || !id) return false;
    switch (typeof tokenStorage) {
      case 'string':
        try {
          const isValid = isTokenValid(tokenStorage);
          if (isValid) return true;
        } catch {
          return false;
        }
        break;
      case 'undefined':
        try {
          const { data } =
            await api.post<IRefreshTokenResponse>(
              '/auth/refreshToken',
              {
                id,
                refreshToken
              }
            );
          createStorage({
            expiresIn: dayjs().add(55, 'seconds').unix(),
            initialValue: data.token,
            key: 'token'
          });
          return true;
        } catch {
          return false;
        }
        break;
    }

    return false;
  } catch {
    return false;
  }
};
