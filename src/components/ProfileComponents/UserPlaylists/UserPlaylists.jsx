import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { getMyPlaylists } from '../../../services/music.service';
import HorizontalScroll from '../../../hoc/HorizontalScroll';
import PlaylistCard from '../../PlaylistCard/PlaylistCard';

export default function UserPlaylists({ token }) {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    getMyPlaylists(token).then((data) => {
      if (data) {
        setPlaylists(
          data.map((playlist) => {
            return {
              image: playlist.images[0].url,
              name: playlist.name,
              tracksCount: playlist.tracks.total,
              uri: playlist.uri,
            };
          })
        );
      }
    });
  }, [token]);

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
                <PlaylistCard playlist={playlist} />
              </div>
            );
          })}
        </HorizontalScroll>
      )}
    </>
  );
}

UserPlaylists.propTypes = {
  token: PropTypes.string,
};
