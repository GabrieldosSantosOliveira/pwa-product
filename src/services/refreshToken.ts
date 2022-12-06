import { api } from './api';
import { getStorage } from './getStorage';
interface Response {
  token: string;
}
export const refreshToken = async () => {
  const id = getStorage('id');
  const refreshToken = getStorage('refreshToken');
  const { data } = await api.post<Response>(
    '/auth/refreshToken',
    {
      refreshToken,
      id
    }
  );
  return data;
};
