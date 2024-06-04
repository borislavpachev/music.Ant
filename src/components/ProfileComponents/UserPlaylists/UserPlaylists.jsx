import { useEffect, useState } from 'react';
import { getMyPlaylists } from '../../../services/music.service';
import HorizontalScroll from '../../../hoc/HorizontalScroll';
import PlaylistMiniCard from '../../PlaylistMiniCard/PlaylistMiniCard';
import toast from 'react-hot-toast';

export default function UserPlaylists() {
  const [playlists, setPlaylists] = useState(null);

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

  return (
    <>
      {!playlists ? (
        <div className="w-100 p-5 my-2 mx-4 fs-2 border rounded">
          User has no playlists
        </div>
      ) : (
        <HorizontalScroll styleClasses={'d-flex'}>
          {playlists.map((playlist, index) => {
            return (
              <div key={index} style={{ display: 'inline-block' }}>
                <PlaylistMiniCard playlist={playlist} />
              </div>
            );
          })}
        </HorizontalScroll>
      )}
    </>
  );
}
