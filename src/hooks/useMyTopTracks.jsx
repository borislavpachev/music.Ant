import { useEffect, useState } from 'react';
import { getMyTopTracks } from '../services/music.service';
import toast from 'react-hot-toast';

export default function useMyTopTracks() {
  const [userTopTracks, setUserTopTracks] = useState(null);

  useEffect(() => {
    getMyTopTracks()
      .then((data) => {
        if (data) {
          setUserTopTracks(
            data.map((track) => {
              return {
                artist: track.artists[0].name,
                trackName: track.name,
                uri: track.uri,
                albumCover: track.album.images[0].url,
              };
            })
          );
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return { userTopTracks };
}
