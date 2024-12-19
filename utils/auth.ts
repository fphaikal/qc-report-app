import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

// Simpan token di cookies
export const setToken = (token:string ) => {
  Cookies.set('token', token, { expires: 1 }); // Token berlaku selama 1 hari
};

// Ambil token dari cookies
export const getToken = () => {
  return Cookies.get('token');
};

// Decode token untuk mendapatkan data
export const decodeToken = (token: string) => {
    return jwtDecode(token);
};

export const getRole = () => {
  const token = getToken();
  if (token) {
    const decoded: { role: string } = jwtDecode(token);
    return decoded.role || 'user';
  }
  return null;
}

export const getUsername = () => {
  const token = getToken();
  if (token) {
    const decoded: { username: string } = jwtDecode(token);
    return decoded.username || 'user';
  }
  return null;
}

// Hapus token dari cookies
export const removeToken = () => {
  Cookies.remove('token');
};
