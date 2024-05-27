// import { Link } from 'react-router-dom';
import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
} from '../../spotify.config';
import { generateCodeChallenge, generateRandomString } from '../../utils/pkce';
// import { useEffect, useState } from 'react';

export default function Login() {
  // const [codeVerifier, setCodeVerifier] = useState(null);
  // const [codeChallenge, setCodeChallenge] = useState(null);

  // useEffect(() => {
  //   setCodeVerifier(generateRandomString(128));
  //   localStorage.setItem('code_verifier', codeVerifier);
  //   generateCodeChallenge(codeVerifier).then((data) => setCodeChallenge(data));
  // }, []);

  const handleLogin = async () => {
    // Generate code verifier and store it in localStorage
    const codeVerifier = generateRandomString(128);
    localStorage.setItem('code_verifier', codeVerifier);

    // Generate code challenge
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Construct the login URL
    const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      '%20'
    )}&code_challenge_method=S256&code_challenge=${codeChallenge}&response_type=code&show_dialog=true`;

    // Redirect to the login URL
    window.location.href = loginUrl;
  };

  return (
    // <Link
    //   to={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    //     '%20'
    //   )}&code_challenge_method=S256&code_challenge=${codeChallenge}&response_type=code&show_dialog=true`}
    // >
    <button className="btn btn-success w-100" onClick={handleLogin}>
      Spotify Login
    </button>
    // </Link>
  );
}
