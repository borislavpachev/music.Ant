import HorizontalScroll from '../../../hoc/HorizontalScroll';
import PlaylistMiniCard from '../../PlaylistMiniCard/PlaylistMiniCard';
import useUserPlaylists from '../../../hooks/useUserPlaylists';

export default function UserPlaylists() {
  const { playlists } = useUserPlaylists();

  return (
    <>
      {playlists?.length === 0 ? (
        <div
          className="d-flex rounded align-items-center
         justify-content-center text-center w-100 h-100"
        >
          <p className="fs-2">User has no playlists</p>
        </div>
      ) : (
        <HorizontalScroll styleClasses={'w-100 h-100 d-flex rounded px-2'}>
          {playlists.map((playlist, index) => {
            return (
              <div key={index} style={{ display: 'inline-block' }}>
                <PlaylistMiniCard playlist={playlist} />
              </div>
            );
          })}
        </HorizontalScroll>
      )}
    </>
  );
}
