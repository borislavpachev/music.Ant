import SpotifyWebApi from 'spotify-web-api-node';
import { clientId, clientSecret } from '../spotify.config';

export const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});
