import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { generateCodeChallenge, generateRandomString } from '../utils/pkce';
import { authEndpoint, redirectUri, scopes } from '../spotify.config';

function useLogin() {
  const [{ appLoading, setAppLoading }] = useContext(AppContext);
  const handleLogin = async () => {
    setAppLoading(true);
    const codeVerifier = generateRandomString(128);
    localStorage.setItem('code_verifier', codeVerifier);

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const loginUrl = `${authEndpoint}?client_id=${
      import.meta.env.VITE_CLIENT_ID
    }&redirect_uri=${redirectUri}&scope=${scopes.join(
      '%20'
    )}&code_challenge_method=S256&code_challenge=${codeChallenge}&response_type=code&show_dialog=true`;

    window.location.href = loginUrl;
  };
  return { appLoading, handleLogin };
}

export default useLogin;
