import { Link } from 'react-router';
import { PageMeta } from '../components/ui';
export const meta = () => PageMeta('Page not found', 'Find your way back to Mayank’s projects.');
export default function NotFound() {
  return (
    <div className="shell error-page">
      <p className="eyebrow">404 / OFF THE MAP</p>
      <h1>
        This path is
        <br />
        still unexplored.
      </h1>
      <p>The page you’re looking for isn’t here. The projects are.</p>
      <Link to="/projects" className="button primary">
        Explore projects ↗
      </Link>
    </div>
  );
}
