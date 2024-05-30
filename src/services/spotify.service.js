import SpotifyWebApi from 'spotify-web-api-node';
import { redirectUri } from '../spotify.config';

export const spotifyApi = new SpotifyWebApi({
  clientId: `${import.meta.env.VITE_CLIENT_ID}`,
  clientSecret: `${import.meta.env.VITE_CLIENT_SECRET}`,
  redirectUri: redirectUri,
});


