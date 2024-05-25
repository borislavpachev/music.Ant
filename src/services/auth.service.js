import toast from 'react-hot-toast';

export const getUserData = async (token) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    if (error.status === 401) {
      localStorage.removeItem('spotifyToken');
    }
    toast.error(error.message);
  }
};
