import { spotifyApi } from './spotify.service';

export const getMyTopTracks = async (token) => {
  spotifyApi.setAccessToken(token);
  return spotifyApi
    .getMyTopTracks()
    .then((data) => {
      let topTracks = data.body.items;
      return topTracks;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const getMyPlaylists = async (token) => {
  spotifyApi.setAccessToken(token);
  return spotifyApi
    .getUserPlaylists()
    .then((data) => {
      let playlists = data.body.items;
      return playlists;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
