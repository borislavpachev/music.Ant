import { useEffect, useState } from 'react';
import { getMyPlaylists } from '../services/music.service';
import toast from 'react-hot-toast';

export default function useUserPlaylists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getMyPlaylists()
      .then((data) => {
        if (data) {
          setPlaylists(
            data.map((playlist) => {
              return {
                image: playlist.images[0].url,
                name: playlist.name,
                tracksCount: playlist.tracks.total,
                uri: playlist.uri,
                id: playlist.id,
              };
            })
          );
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return { playlists };
}
