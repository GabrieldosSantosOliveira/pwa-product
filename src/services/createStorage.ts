interface IStorageProviderProps {
  initialValue: string;
  key: string;
  expiresIn: number;
}
export const createStorage = ({
  key,
  expiresIn,
  initialValue
}: IStorageProviderProps) => {
  localStorage.setItem(
    key,
    JSON.stringify({ value: initialValue, expiresIn })
  );
};
