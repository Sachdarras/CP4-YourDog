import Caroussel from "../components/Carousseldynamiqueacceuil";

function Acceuil() {
  return (
    <>
      <div className="header-container">
        <h1>Découvrez le Monde du Chien</h1>;
        <p>
          Bienvenue dans l'univers des chiens où l'aventure et la compagnie
          fidèle vous attendent.
        </p>
      </div>
      <Caroussel />
    </>
  );
}

export default Acceuil;
