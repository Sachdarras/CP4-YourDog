// src/components/Nav.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Nav() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="nav-container">
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/promenade">Lieux de promenade</Link>
        </li>
        <li>
          <Link to="/dog_friendly">Lieux Dog-friendly</Link>
        </li>
        <li>
          <Link to="/activity">Activité/Sports</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <button type="button" className="nav-link" onClick={handleLogout}>
              Se déconnecter
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/loggin">Se connecter</Link>
            </li>
            <li>
              <Link to="/loggin-account">S'enregistrer</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
