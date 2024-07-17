import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

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
  const [sendForm, setSendForm] = useState(false);
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    lieu: "",
    description: "",
    name: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/promenade`)
      .then((response) => {
        setPromenades(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des points:", error);
      });
  }, [sendForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const latitude = parseFloat(formData.latitude);
    const longitude = parseFloat(formData.longitude);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      console.error("Latitude ou longitude invalide");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/promenade`, {
        ...formData,
        latitude,
        longitude,
      })
      .then(() => {
        setPromenades([...promenades]);
        setFormData({
          latitude: "",
          longitude: "",
          lieu: "",
          description: "",
          name: "",
        });
        setSendForm((prev) => !prev);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la promenade:", error);
      });
  };

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

      <div className="promenade-container">
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

        <div className="form-container">
          <form onSubmit={handleSubmit} className="promenade-form">
            <h2>Proposer une promenade</h2>
            <div className="form-group">
              <label>
                Latitude:
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Longitude:
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Lieu:
                <input
                  type="text"
                  name="lieu"
                  value={formData.lieu}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                >
                  Description{" "}
                </textarea>
              </label>
            </div>
            <div className="form-group">
              <label>
                Nom:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <button type="submit">Proposer</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Promenade;
