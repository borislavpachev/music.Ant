import SpotifyWebApi from 'spotify-web-api-node';
import { redirectUri } from '../spotify.config';

export const spotifyApi = new SpotifyWebApi({
  clientId: `${import.meta.env.VITE_CLIENT_ID}`,
  clientSecret: `${import.meta.env.VITE_CLIENT_SECRET}`,
  redirectUri: redirectUri,
});

export const refreshAccessToken = async (refreshToken) => {
  try {
    const data = spotifyApi.refreshAccessToken(refreshToken);
    return data.body;
  } catch (error) {
    throw new Error('Could not refresh access token');
  }
};
