import { useEffect, useState } from 'react';

export default function useAuth() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshing = localStorage.getItem('refreshToken');
    const expires = localStorage.getItem('expiresIn');

    if (token) {
      setAccessToken(token);
      setRefreshToken(refreshing);
      setExpiresIn(expires);
    }
  }, []);

  return {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    expiresIn,
    setExpiresIn,
  };
}
