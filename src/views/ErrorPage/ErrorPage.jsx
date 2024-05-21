import { NavLink } from 'react-router-dom';
import { FaBomb } from 'react-icons/fa';
import './ErrorPage.css';

export default function ErrorPage() {
  return (
    <div
      className={`error-container align-items-center text-center
    justify-content-center p-5 w-100 mt-5 border rounded`}
    >
      <h1 className="align-self-center mb-4">Ooops! Page not found!</h1>
      <FaBomb className="fs-1" />
      <div className="m-3">
        <NavLink to="/home" className="fs-4">
          Home page
        </NavLink>
      </div>
    </div>
  );
}
