import { useContext, useEffect, useState } from 'react';
import { getUserData } from '../../services/auth.service';
import { PropTypes } from 'prop-types';
import toast from 'react-hot-toast';
import { ThemeContext } from '../../contexts/theme';
import ProfileCard from '../../components/ProfileComponents/ProfileCard/ProfileCard';
import UserTopTracks from '../../components/ProfileComponents/UserTopTracks/UserTopTracks';
import UserPlaylists from '../../components/ProfileComponents/UserPlaylists/UserPlaylists';
import Loader from '../../components/Loader/Loader';
import './Profile.css';

export default function Profile({ token, logout }) {
  const [{ theme, isDark }] = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);

    getUserData(token, logout)
      .then((data) => {
        setLoading(false);
        if (data) {
          setUser(data);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [token]);

  if (loading) {
    return <Loader size="150px" />;
  }

  return (
    <>
      {!user ? (
        <div
          className={`fs-2 m-5 p-5 border text-center align-items-center rounded
      ${
        isDark
          ? `bg-${theme.color} text-${theme.textColor} border border-white`
          : `bg-${theme.color} text-${theme.textColor} border border-dark`
      }
      `}
        >
          No user
        </div>
      ) : (
        <div className="container custom-scroll w-100 h-100 align-items-center">
          <div className="d-flex px-1 mx-4 my-2 mb-4 gap-4">
            <ProfileCard user={user} />
            <UserPlaylists />
          </div>
          <UserTopTracks />
        </div>
      )}
    </>
  );
}

Profile.propTypes = {
  token: PropTypes.string,
  logout: PropTypes.func,
};
