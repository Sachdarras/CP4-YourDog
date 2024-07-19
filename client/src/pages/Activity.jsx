import dataSportsCanins from "../Data/ActivityData";

function Activity() {
  return (
    <>
      <div className="activity-header">
        <h1>Les activités et sports canins</h1>
        <p>
          Venez découvrir les différents types de sports canins ! Plongez dans
          un univers où la complicité, l'énergie et l'enthousiasme entre l'homme
          et le chien sont au cœur de chaque activité. Que vous soyez un
          passionné de course, un amateur de vélo ou simplement en quête d'une
          nouvelle aventure avec votre compagnon à quatre pattes, vous trouverez
          ici une multitude de sports canins adaptés à vos besoins et à ceux de
          votre chien. Explorez nos descriptions détaillées et laissez-vous
          inspirer pour essayer de nouvelles activités, renforcer votre lien
          avec votre chien et profiter de moments inoubliables ensemble.
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
