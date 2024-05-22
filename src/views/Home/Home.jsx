import { PropTypes } from 'prop-types';
import TrackCard from '../../components/TrackCard/TrackCard';

export default function Home({ results }) {
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center
  `}
    >
      <h1>Home</h1>
      <div className="row align-items-center justify-content-center">
        {results.map((result, index) => {
          return <TrackCard result={result} key={index} />;
        })}
      </div>
    </div>
  );
}

Home.propTypes = {
  results: PropTypes.array,
};
