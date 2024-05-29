import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../contexts/theme';
import { PropTypes } from 'prop-types';
import { getMyPlaylists } from '../../../services/music.service';

export default function UserPlaylists({ token }) {
  const [{ theme, isDark }] = useContext(ThemeContext);
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
            };
          })
        );
      }
    });
  }, [token]);

  return (
    <div
      className={`w-75 d-flex align-items-center rounded
  ${
    isDark
      ? `profile-dark bg-${theme.color} text-${theme.textColor} border border-white`
      : `profile-light bg-${theme.color} text-${theme.textColor} border border-dark`
  }
  `}
    >
      {!playlists ? (
        <div className="container text-center p-5 my-2 fs-2">
          User has no playlists
        </div>
      ) : (
        playlists.map((playlist, index) => {
          return (
            <div
              key={index}
              className="container d-flex flex-column text-center
            align-items-center justify-content-start"
              style={{
                height: '165px',
                width: '165px',
              }}
            >
              <img
                alt="playlist"
                src={`${playlist.image}`}
                style={{ width: '110px', height: '110px' }}
              />
              <div>
                <div className="fs-5">{playlist.name}</div>
                <div>Tracks: {playlist.tracksCount}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

UserPlaylists.propTypes = {
  token: PropTypes.string,
};
