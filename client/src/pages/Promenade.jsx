import { useEffect, useState, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

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
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    lieu: "",
    description: "",
    name: "",
  });

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/promenade`)
      .then((response) => {
        setPromenades(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des points:", error);
      });
  }, [showForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/loggin");
      return;
    }

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
        setShowForm(true); // Assure que le formulaire est visible après soumission
        toast.success("Promenade ajoutée avec succès!");
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la promenade:", error);
        toast.error("Erreur lors de l'ajout de la promenade");
      });
  };

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setFormData({
          ...formData,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return null;
  }

  return (
    <>
      <Toaster />
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
        <div className={`map-container ${showForm ? "map-expanded" : ""}`}>
          <MapContainer
            className="map"
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
                    <h3>{promenade.lieu}</h3>
                    <p>{promenade.description}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

            <LocationMarker />
          </MapContainer>
        </div>

        <button
          className="toggle-form"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "›" : "‹"}
        </button>

        {showForm && (
          <div className="form-container">
            {isAuthenticated ? (
              <form onSubmit={handleSubmit} className="promenade-form">
                <h2>Proposer une promenade</h2>
                <p>
                  Cliquez sur la carte pour ajouter les points de latitude et
                  longitude au formulaire.
                </p>
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
                    />
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
            ) : (
              <div>
                <h2>Vous devez être connecté pour proposer une promenade</h2>
                <button type="button" onClick={() => navigate("/loggin")}>
                  Se connecter
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Promenade;
