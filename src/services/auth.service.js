import { spotifyApi } from './spotify.service';

export const getUserData = async (token, logout) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (result.error?.status === 401) {
      logout();
    }
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const data = spotifyApi.refreshAccessToken(refreshToken);
    return data.body;
  } catch (error) {
    throw new Error('Could not refresh access token');
  }
};
