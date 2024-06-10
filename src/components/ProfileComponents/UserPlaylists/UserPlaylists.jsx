import { useEffect, useState } from 'react';
import { getMyPlaylists } from '../../../services/music.service';
import HorizontalScroll from '../../../hoc/HorizontalScroll';
import PlaylistMiniCard from '../../PlaylistMiniCard/PlaylistMiniCard';
import toast from 'react-hot-toast';

export default function UserPlaylists() {
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

  return (
    <>
      {playlists?.length === 0 ? (
        <div
          className="d-flex rounded align-items-center
         justify-content-center text-center w-100 h-100"
        >
          <p className="fs-2">User has no playlists</p>
        </div>
      ) : (
        <HorizontalScroll styleClasses={'w-100 h-100 d-flex rounded px-2'}>
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
