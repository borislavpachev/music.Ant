import { PropTypes } from 'prop-types';

export default function ProfileCard({ user }) {
  return (
    <div className='card bg-success' style={{ width: '400px' }}>
      <div className="card-body d-flex align-items-center">
        <img
          src={`${user?.images[1].url}`}
          style={{
            borderRadius: '50%',
            maxWidth: '50%',
            height: 'auto',
          }}
          className="img-fluid"
        />
        <div className="d-flex flex-column align-items-center mx-3 text-white">
          <p className="fs-4">{user.display_name}</p>
          <span style={{ whiteSpace: 'nowrap' }}>Country: {user.country}</span>
          <span>Followers: {user.followers.total}</span>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.object,
};
