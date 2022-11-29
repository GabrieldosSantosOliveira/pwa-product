import dayjs from 'dayjs';
type ResponseGetStorage = string | undefined;
export const getStorage = (
  key: string
): ResponseGetStorage => {
  const storageValue = localStorage.getItem(key);
  if (storageValue) {
    const { value, expiresIn } = JSON.parse(storageValue);
    if (!dayjs().isAfter(dayjs.unix(expiresIn))) {
      return value;
    } else {
      localStorage.removeItem(key);
      return undefined;
    }
  }
  return undefined;
};
