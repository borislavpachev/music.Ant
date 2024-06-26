import { spotifyApi } from './spotify.service';

export const getSearchResults = async (searchParam) => {
  return spotifyApi
    .searchTracks(searchParam, { limit: 20 })
    .then((res) => {
      const results = res.body.tracks.items;
      return results;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const getMyTopTracks = async () => {
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

export const getMyPlaylists = async () => {
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

export const getSinglePlaylist = async (token, playlist) => {
  if (!token) return;
  spotifyApi.setAccessToken(token);

  return spotifyApi
    .getPlaylist(playlist)
    .then((data) => {
      let playlistInfo = data.body;
      return playlistInfo;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const getNewReleases = async (token) => {
  if (!token) return;
  spotifyApi.setAccessToken(token);

  return spotifyApi
    .getNewReleases({ limit: 10 })
    .then((data) => {
      let newReleases = data.body.albums.items;
      return newReleases;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
