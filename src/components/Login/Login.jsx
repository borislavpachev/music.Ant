import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
} from '../../spotify.config';
import { generateCodeChallenge, generateRandomString } from '../../utils/pkce';

export default function Login() {

  const handleLogin = async () => {
    const codeVerifier = generateRandomString(128);
    localStorage.setItem('code_verifier', codeVerifier);

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      '%20'
    )}&code_challenge_method=S256&code_challenge=${codeChallenge}&response_type=code&show_dialog=true`;

    window.location.href = loginUrl;
  };

  return (
    <button className="btn btn-success w-100" onClick={handleLogin}>
      Spotify Login
    </button>
    );
}
