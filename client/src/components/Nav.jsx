import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav-container">
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>

        <li>
          <Link to="/event">Événements</Link>
        </li>
        <li>
          <Link to="/pro">Le coin des pros</Link>
        </li>
        <li>
          <Link to="/activity">Activité Canines</Link>
        </li>
        <li>
          <Link to="/loggin">Se connecter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
