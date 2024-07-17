import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function LogginAccount() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [birthday, setBirthday] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [user, setUser] = useState(null); // État pour stocker les détails de l'utilisateur

  const emailRef = useRef();

  const notifySuccess = () =>
    toast.success("Votre compte a été créé avec succès !");
  const notifyError = () =>
    toast.error("Erreur lors de la création du compte.");

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }
    const newUser = {
      nom,
      prenom,
      birthday,
      adresse,
      ville,
      codePostal,
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users`,
        newUser
      );
      setUser(response.data);
      notifySuccess();
      setShowConfirmation(true);
    } catch (error) {
      console.error("Erreur lors de la création du compte : ", error);
      notifyError();
    }
  };

  useEffect(() => {
    if (user) {
      // Mettre à jour les états avec les données de l'utilisateur après création du compte
      setNom(user.nom || "");
      setPrenom(user.prenom || "");
      setBirthday(user.birthday || "");
      setAdresse(user.adresse || "");
      setVille(user.ville || "");
      setCodePostal(user.codePostal || "");
      setEmail(user.email || "");
    }
  }, [user]);

  return (
    <div>
      <div className="header-loggin">
        <h1>Inscription</h1>
        <p>
          Connectez-vous pour avoir accès à toutes les fonctionnalités du site
          et partager vos lieux préférés avec les autres utilisateurs.
        </p>
      </div>
      <form className="account-form" onSubmit={handleAddUser}>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            placeholder="Entrez votre nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            placeholder="Entrez votre prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Date de naissance</label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            placeholder="Entrez votre date de naissance"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="adresse">Adresse</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            placeholder="Entrez votre adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ville">Ville</label>
          <input
            type="text"
            id="ville"
            name="ville"
            placeholder="Entrez votre ville"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="code_postal">Code Postal</label>
          <input
            type="text"
            id="code_postal"
            name="code_postal"
            placeholder="Entrez votre code postal"
            value={codePostal}
            onChange={(e) => setCodePostal(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {!showConfirmation && (
          <button className="account-button" type="submit">
            S'enregistrer
          </button>
        )}
        {showConfirmation && user && (
          <div className="confirmation-message">
            <div className="card">
              <h2 className="user-greeting">Bienvenue !</h2>
              <p className="user-greeting">
                Votre compte a été créé avec succès.
              </p>
              <Link to="/loggin">
                <button className="account-log" type="button">
                  Se connecter
                </button>
              </Link>
            </div>
          </div>
        )}
      </form>
      <Toaster />
    </div>
  );
}

export default LogginAccount;
