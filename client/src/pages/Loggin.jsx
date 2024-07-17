import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const notifyUser = () =>
    toast("Connexion réussie ! Vous allez être redirigé(e) !");
  const notifyError = () =>
    toast.error("Email ou mot de passe incorrect ! Réessayez.");

  const handleValidation = async (e) => {
    e.preventDefault();
    try {
      const loginUrl = `${import.meta.env.VITE_API_URL}/api/auths`;

      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        notifyError();
        throw new Error("Email ou mot de passe incorrect !");
      }

      const userData = await response.json();
      login(userData.token);

      localStorage.setItem("user", JSON.stringify(userData.user));
      notifyUser();

      setTimeout(() => {
        navigate(`/Profil/${userData.user.id}`);
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      notifyError();
    }
  };

  return (
    <>
      <div className="header-loggin">
        <h1>Connectez-vous</h1>
        <p>
          Connectez-vous pour avoir accès à toutes les fonctionnalités du site
          et pouvoir partager vos lieux préférés avec les autres utilisateurs.
        </p>
      </div>
      <form className="login-form" onSubmit={handleValidation}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Mot de passe"
            required
          />
        </div>
        <button className="login-button" type="submit">
          Connexion
        </button>
        <Toaster />
        <Link to="/loggin-account" className="login-account">
          Pas de compte ? Inscrivez-vous
        </Link>
      </form>
    </>
  );
}

export default LoginForm;
