import { useContext, useEffect, useState } from 'react';
import { getUserData } from '../../services/auth.service';
import { PropTypes } from 'prop-types';
import toast from 'react-hot-toast';
import { ThemeContext } from '../../contexts/theme';
import ProfileCard from '../../components/ProfileComponents/ProfileCard/ProfileCard';
import UserTopTracks from '../../components/ProfileComponents/UserTopTracks/UserTopTracks';
import UserPlaylists from '../../components/ProfileComponents/UserPlaylists/UserPlaylists';
import './Profile.css';

export default function Profile({ token, logout }) {
  const [{ theme, isDark }] = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;

    getUserData(token, logout)
      .then((data) => setUser(data))
      .catch((error) => {
        toast.error(error.message);
      });
  }, [token]);

  return (
    <>
      {user ? (
        <div className="w-100 h-100 align-items-center">
          <div className="d-flex px-1 mx-2 my-1 gap-4">
            <ProfileCard user={user} />
            <UserPlaylists token={token} />
          </div>
          <UserTopTracks token={token} />
        </div>
      ) : (
        <div
          className={`fs-2 m-5 p-5 border text-center rounded
        ${
          isDark
            ? `bg-${theme.color} text-${theme.textColor} border border-white`
            : `bg-${theme.color} text-${theme.textColor} border border-dark`
        }
        `}
        >
          No user
        </div>
      )}
    </>
  );
}

Profile.propTypes = {
  token: PropTypes.string,
  logout: PropTypes.func,
};