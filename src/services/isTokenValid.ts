import jwtDecode from 'jwt-decode';
interface Token {
  id: string;
  iat: number;
  exp: number;
}
export const isTokenValid = (token: string) => {
  try {
    const decodedToken = jwtDecode<Token>(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};
