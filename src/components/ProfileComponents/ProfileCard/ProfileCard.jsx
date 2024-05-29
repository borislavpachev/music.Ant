import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/theme';
import { PropTypes } from 'prop-types';

export default function ProfileCard({ user }) {
  const [{ theme, isDark }] = useContext(ThemeContext);

  return (
    <div
      className={`w-25 d-flex align-items-center justify-content-between 
          rounded
        ${
          isDark
            ? `profile-dark bg-${theme.color} text-${theme.textColor} border border-white`
            : `profile-light bg-${theme.color} text-${theme.textColor} border border-dark`
        }
        `}
    >
      <img
        src={`${user?.images[1].url}`}
        style={{
          height: '150px',
          width: '150px',
          borderRadius: '50%',
        }}
        className="mx-3 my-2"
      />
      <div className="d-flex flex-column align-items-start mx-3">
        <p className="fs-3">{user.display_name}</p>
        <p>Country: {user.country}</p>
        <p>Followers: {user.followers.total}</p>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.object,
};
