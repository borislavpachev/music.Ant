import { redirectUri } from '../spotify.config';

export const getUserData = async (token, logout) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      logout();
    } else {
      return result;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const getSpotifyAccessToken = async (code) => {
  const codeVerifier = localStorage.getItem('code_verifier');

  const payload = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: `${import.meta.env.VITE_CLIENT_ID}`,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  try {
    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      payload
    );
    const data = await response.json();

    if (data) {
      console.log(data);
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      localStorage.setItem('expiresIn', data.expires_in);
    }
  } catch (error) {
    console.error('Error in getToken:', error);
  }
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const setAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const setExpiresIn = (expiresIn) => {
  localStorage.setItem('expiresIn', expiresIn);
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return;

  const url = 'https://accounts.spotify.com/api/token';
  const payload = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: `${import.meta.env.VITE_CLIENT_ID}`,
    }),
  };
  const response = await fetch(url, payload);

  if (response.ok) {
    const data = await response.json();
    setAccessToken(data.access_token);
    setExpiresIn(data.expires_in);
  } else {
    console.log(response.error);
  }
};
