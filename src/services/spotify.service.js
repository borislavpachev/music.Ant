import SpotifyWebApi from 'spotify-web-api-node';
import { redirectUri } from '../spotify.config';

export const spotifyApi = new SpotifyWebApi({
  clientId: `${import.meta.env.VITE_CLIENT_ID}`,
  clientSecret: `${import.meta.env.VITE_CLIENT_SECRET}`,
  redirectUri: redirectUri,
});


export const getToken = async (code, setToken) => {
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
      localStorage.setItem('accessToken', data.access_token);

      setToken(data.access_token);
    } else {
      console.error('Error fetching token:', data);
    }
  } catch (error) {
    console.error('Error in getToken:', error);
  }
};