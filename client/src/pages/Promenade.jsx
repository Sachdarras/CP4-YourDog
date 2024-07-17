import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// Icône personnalisée pour le marqueur (exemple avec une icône d'épingle dorée)
const goldIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function Promenade() {
  const [promenades, setPromenades] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/promenade`)
      .then((response) => {
        setPromenades(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des points:", error);
      });
  }, []);

  return (
    <>
      <div className="header-promenade">
        <h1>Lieux de Promenade</h1>
        <p>
          Explorez de nouveaux lieux de promenade pour vous et votre compagnon à
          quatre pattes. Découvrez des endroits magnifiques à travers une carte
          interactive où vous pouvez partager vos spots préférés et trouver de
          nouvelles inspirations pour vos prochaines aventures.
        </p>
      </div>
      <MapContainer
        className="map-container"
        center={[46.309547041230495, 2.5215414968572425]}
        zoom={6}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {promenades.map((promenade) => (
          <Marker
            position={[promenade.latitude, promenade.longitude]}
            key={promenade.id}
            icon={goldIcon}
          >
            <Popup>
              <div>
                <h2>{promenade.name}</h2>
                <p>{promenade.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default Promenade;
