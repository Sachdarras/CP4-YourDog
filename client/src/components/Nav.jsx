import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav-container">
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>

        <li>
          <Link to="/event">Lieux de promenade</Link>
        </li>
        <li>
          <Link to="/pro">Lieux Dog-friendly</Link>
        </li>
        <li>
          <Link to="/activity">Activité/Sports</Link>
        </li>
        <li>
          <Link to="/loggin">Se connecter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
