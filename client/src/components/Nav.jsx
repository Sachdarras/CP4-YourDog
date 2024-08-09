import { slide as Menu } from "react-burger-menu";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Nav() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleStateChange = (state) => {
    setIsMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Menu right isOpen={isMenuOpen} onStateChange={handleStateChange}>
      <Link to="/" onClick={closeMenu}>
        Accueil
      </Link>
      <Link to="/promenade" onClick={closeMenu}>
        Lieux de promenade
      </Link>
      <Link to="/dog_friendly" onClick={closeMenu}>
        Lieux Dog-friendly
      </Link>
      <Link to="/activity" onClick={closeMenu}>
        Activité/Sports
      </Link>
      {isAuthenticated ? (
        <button type="button" className="nav-link" onClick={handleLogout}>
          Se déconnecter
        </button>
      ) : (
        <>
          <Link to="/loggin" onClick={closeMenu}>
            Se connecter
          </Link>
          <Link to="/loggin-account" onClick={closeMenu}>
            S'enregistrer
          </Link>
        </>
      )}
    </Menu>
  );
}

export default Nav;
