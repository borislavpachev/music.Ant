import SpotifyWebApi from 'spotify-web-api-node';
import { clientId, clientSecret, redirectUri } from '../spotify.config';

export const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
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
