import { PropTypes } from 'prop-types';

export default function ProfileCard({ user }) {
  return (
    <div className="card bg-success" style={{ width: '40%', height: 'auto' }}>
      <div className="card-body d-flex align-items-center">
        <img
          src={`${user?.images[1].url}`}
          style={{
            borderRadius: '50%',
            minWidth: '60%',
            height: 'auto',
          }}
          className="img-fluid"
        />
        <div className="align-items-center px-2 text-white">
          <p className="fs-4">{user.display_name}</p>
          <span style={{ whiteSpace: 'nowrap' }}>Country: {user.country}</span>
          <p>Followers: {user.followers.total}</p>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.object,
};
