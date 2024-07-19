import dataSportsCanins from "../Data/ActivityData";

function Activity() {
  return (
    <>
      <div className="activity-header">
        <h1>Les activités et sports canins</h1>
        <p>
          Découvrez les sports canins ! Explorez un monde où complicité, énergie
          et enthousiasme entre l'homme et le chien se rencontrent. Que vous
          soyez passionné de course ou amateur de vélo, trouvez des activités
          adaptées à vous et à votre chien. Inspirez-vous pour essayer de
          nouvelles aventures et renforcer votre lien avec votre compagnon à
          quatre pattes.
        </p>
      </div>
      <div className="activity-container">
        {dataSportsCanins.map((sport) => (
          <div key={sport} className="activity-card">
            <img
              src={sport.image}
              alt={sport.titre}
              className="activity-image"
            />
            <h2>{sport.titre}</h2>
            <p>{sport.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Activity;
