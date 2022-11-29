import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
interface IStorageProviderProps {
  initialValue: string;
  key: string;
  expiresIn: number;
}

export const useCreateStorage = ({
  expiresIn,
  initialValue,
  key
}: IStorageProviderProps) => {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      const { value, expiresIn } = JSON.parse(storageValue);
      if (
        !dayjs(expiresIn).isAfter(dayjs.unix(expiresIn))
      ) {
        return value;
      }
      localStorage.removeItem(key);
    }
    return initialValue;
  });
  useEffect(() => {
    const value = {
      value: state,
      expiresIn
    };
    localStorage.setItem(key, JSON.stringify(value));
  }, [expiresIn, key, state]);
  return [state, setState];
};
type IStorageConsumer = Pick<IStorageProviderProps, 'key'>;
export const useStorage = ({
  key
}: IStorageConsumer): string | undefined => {
  const storageValue = localStorage.getItem(key);
  if (storageValue) {
    const { value, expiresIn } = JSON.parse(storageValue);
    if (!dayjs(expiresIn).isAfter(dayjs.unix(expiresIn))) {
      return value;
    } else {
      localStorage.removeItem(key);
      return undefined;
    }
  }
  return undefined;
};
