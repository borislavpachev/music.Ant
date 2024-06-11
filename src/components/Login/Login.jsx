import useLogin from '../../hooks/useLogin';

export default function Login() {
  const { appLoading, handleLogin } = useLogin();

  return appLoading ? (
    <div className="spinner-border text-success"></div>
  ) : (
    <button className="btn btn-success" onClick={handleLogin}>
      <span style={{ whiteSpace: 'nowrap' }}>Spotify Login</span>
    </button>
  );
}
