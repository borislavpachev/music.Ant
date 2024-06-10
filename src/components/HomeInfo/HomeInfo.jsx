export default function HomeInfo() {
  return (
    <div className="px-5 my-4">
      Welcome to <strong>Music.ant</strong>, your ultimate destination for
      searching and playing your favorite tracks seamlessly. Built with the
      latest web technologies, Music.ant leverages the power of the Spotify API
      and modern React frameworks to deliver a smooth and engaging music
      experience.
      <br />
      <br />
      <h5> Key Features:</h5>
      <ul>
        <li>
          <strong>Track Search:</strong> Effortlessly search for songs, artists,
          and albums using the extensive Spotify music library.
        </li>
        <li>
          <strong>Instant Playback:</strong> Enjoy instant playback of tracks
          directly within the app.
        </li>
        <li>
          <strong>User-Friendly Interface:</strong> Navigate through a clean and
          intuitive interface designed for an enjoyable user experience.
        </li>
      </ul>
      <br />
      <h5> How It Works:</h5>
      <strong>You must have Spotify Premium Account. </strong>
      <br />
      Music.ant connects to the Spotify API display a wide range of tracks based
      on your search queries. Simply login to your Spotify account and type in
      the name of the song or artist you`re looking for, and Music.ant will do
      the rest. Click on any track to start playing it instantly using Spotify
      web player.
    </div>
  );
}
