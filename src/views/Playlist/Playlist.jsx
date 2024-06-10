import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSinglePlaylist } from '../../services/music.service';
import { AppContext } from '../../contexts/AppContext';
import { ThemeContext } from '../../contexts/theme';
import { CiPlay1 } from 'react-icons/ci';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import { PropTypes } from 'prop-types';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';

export default function Playlist({ token }) {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [{ theme, isDark }] = useContext(ThemeContext);
  const [{ setCurrentlyPlayingTrack }] = useContext(AppContext);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    getSinglePlaylist(token, id)
      .then((data) => {
        setLoading(false);
        if (data) {
          setPlaylist(data);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [token, id]);

  if (loading) {
    return <Loader size="190px" />;
  }

  return (
    <div className="custom-scroll w-100">
      {!playlist ? (
        <div className="border rounded text-center m-5 p-5 fs-2">
          No Playlist
        </div>
      ) : (
        <div
          className={`card m-3 border
        ${
          isDark
            ? `bg-${theme.color} text-${theme.textColor}`
            : `bg-${theme.color} text-${theme.textColor}`
        }`}
        >
          <div className="card-body d-flex">
            <img
              src={playlist.images[0].url}
              alt="cover"
              style={{ width: '250px', height: 'auto' }}
              className="w-25"
            />
            <div className="w-75 d-flex flex-column p-2 mx-3">
              <div>
                <p className="fs-3">
                  <strong>{playlist.name}</strong> by{' '}
                  {playlist.owner.display_name}
                </p>
                <p className="fst-italic fs-5">{playlist.description}</p>
                <p className="fs-5">Tracks: {playlist.tracks.total}</p>
              </div>
              <button
                className="btn btn-success mt-auto"
                onClick={() => setCurrentlyPlayingTrack(playlist.uri)}
              >
                <CiPlay1 className="fs-3" />
              </button>
            </div>
          </div>
          <div className="border border-secondary mx-3 mb-3"></div>
          <div className="w-100 px-2">
            {playlist.tracks.items.map((track, index) => {
              return (
                <PlaylistCard key={index} track={track.track} index={index} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

Playlist.propTypes = {
  token: PropTypes.string,
};
