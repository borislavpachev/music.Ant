import { Link } from 'react-router-dom';
import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
} from '../../spotify.config';

export default function Login() {
  return (
    <Link
      to={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        '%20'
      )}&response_type=token&show_dialog=true`}
    >
      <button className="btn btn-success w-100">Spotify Login</button>
    </Link>
  );
}
