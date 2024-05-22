export default function About() {
  return (
    <div
      className={`d-flex flex-column justify-content-center
       align-items-center fs-5 mt-5
    `}
    >
      <h4>About Music.ant</h4>
      <div className="p-4">
        Welcome to <strong>Music.ant</strong>, your ultimate destination for
        searching and playing your favorite tracks seamlessly. Built with the
        latest web technologies, Music.ant leverages the power of the Spotify
        API and modern React frameworks to deliver a smooth and engaging music
        experience.
        <br />
        <br />
        <h5> Key Features:</h5>
        <ul>
          <li>
            <strong>Track Search:</strong> Effortlessly search for songs,
            artists, and albums using the extensive Spotify music library.
          </li>
          <li>
            <strong>Instant Playback:</strong> Enjoy instant playback of tracks
            directly within the app, powered by the react-spotify-web-playback
            component.
          </li>
          <li>
            <strong>User-Friendly Interface:</strong> Navigate through a clean
            and intuitive interface designed for an enjoyable user experience.
          </li>
        </ul>
        <br />
        <h5> How It Works:</h5>
        Music.ant connects to the Spotify API to fetch and display a wide array
        of tracks based on your search queries. Simply login to your Spotify
        account and type in the name of the song, artist, or album you`re
        looking for, and Music.ant will present you with a list of matching
        results. Click on any track to start playing it instantly through the
        integrated Spotify web player.
      </div>
    </div>
  );
}
