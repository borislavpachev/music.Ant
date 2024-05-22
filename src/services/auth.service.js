import toast from 'react-hot-toast';

export const getUserData = async (token) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!result.ok) {
      localStorage.removeItem('spotifyToken');
    }
    return result;
  } catch (error) {
    toast.error(error.message);
  }
};
