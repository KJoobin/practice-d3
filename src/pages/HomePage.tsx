import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h2>
        HomePage
      </h2>
      <ul>
        <li>
          <Link to="/bar">
            bar
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
