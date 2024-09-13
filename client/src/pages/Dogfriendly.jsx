import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";

// Merge options for Leaflet marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Cache for geocoding results
const geocodeCache = new Map();

// Function to geocode an address using OpenStreetMap Nominatim API
const geocodeAddress = async (address, ville, codePostal) => {
  try {
    const query = `${encodeURIComponent(address)}, ${encodeURIComponent(
      ville
    )}, ${encodeURIComponent(codePostal)}`;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon, display_name: displayName } = data[0];
      const [adresse, city, postalCode] = displayName
        .split(",")
        .slice(0, 3)
        .map((part) => part.trim());
      const geocodedInfo = {
        position: [parseFloat(lat), parseFloat(lon)],
        address: adresse,
        ville: city,
        codePostal: postalCode,
      };

      geocodeCache.set(`${address}, ${ville}, ${codePostal}`, geocodedInfo);

      return geocodedInfo;
    }
    return null;
  } catch (error) {
    console.error("Erreur de géocodage de l'adresse:", error);
    return null;
  }
};

// Function to reverse geocode using OpenStreetMap Nominatim API
const reverseGeocode = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();

    if (data && data.address) {
      const { road, city, postcode } = data.address;
      return {
        address: road || "",
        ville: city || "",
        codePostal: postcode || "",
      };
    }
    return null;
  } catch (error) {
    console.error("Erreur de géocodage inversé:", error);
    return null;
  }
};

const reverseGeocodePostalCode = async (postalCode) => {
  try {
    const response = await axios.get(
      `http://api.geonames.org/postalCodeLookupJSON?postalcode=${postalCode}&country=FR&username=demo`
    );

    if (
      response.data &&
      response.data.postalcodes &&
      response.data.postalcodes.length > 0
    ) {
      const { placeName } = response.data.postalcodes[0];
      return placeName;
    }
    return null;
  } catch (error) {
    console.error("Erreur de recherche inversée du code postal:", error);
    return null;
  }
};

// List of place types
const placeTypes = [
  "Camping",
  "Hôtel",
  "Plage",
  "Parc",
  "Parc naturel",
  "Restaurant",
  "Gîte",
  "Airbnb",
  "Autre",
];

function MapClickHandler({ onClick }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const addressData = await reverseGeocode(lat, lng);
      if (addressData) {
        onClick({
          address: addressData.address,
          ville: addressData.ville,
          codePostal: addressData.codePostal,
        });
      }
    },
  });
  return null;
}

MapClickHandler.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function DogFriendly() {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingLocation, setAddingLocation] = useState(false);
  const [showForm, setShowForm] = useState(false); // New state for form visibility

  const { isAuthenticated } = useContext(AuthContext);

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dogfriendly`
      );

      if (response.data && Array.isArray(response.data)) {
        const geocodedLocations = await Promise.all(
          response.data.map(async (location) => {
            const geocodedInfo = await geocodeAddress(
              location.adresse,
              location.ville,
              location.code_postal
            );
            if (geocodedInfo) {
              return {
                ...geocodedInfo,
                name: location.name,
                description: location.description,
                type: location.type,
                price: location.price,
                adresse: location.adresse,
                ville: location.ville,
                codePostal: location.code_postal,
              };
            }
            return null;
          })
        );

        setLocations(geocodedLocations.filter((loc) => loc !== null));
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle adding a new location
  const handleAddLocation = async () => {
    const newLocation = {
      name,
      type,
      ville,
      codePostal,
      adresse: address,
      description,
      price: price === "" ? null : parseInt(price, 10),
    };

    setAddingLocation(true);

    try {
      if (!isAuthenticated) {
        toast.error(
          "Vous devez être connecté pour ajouter un lieu dog-friendly."
        );
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/dogfriendly`,
        newLocation
      );

      if (response.data) {
        const geocodedInfo = await geocodeAddress(
          newLocation.adresse,
          newLocation.ville,
          newLocation.codePostal
        );
        if (geocodedInfo) {
          const formattedLocation = {
            ...geocodedInfo,
            name: newLocation.name,
            description: newLocation.description,
            type: newLocation.type,
            price: newLocation.price,
            adresse: newLocation.adresse,
            ville: newLocation.ville,
            codePostal: newLocation.codePostal,
          };

          setLocations([...locations, formattedLocation]);

          setAddress("");
          setName("");
          setType("");
          setDescription("");
          setPrice("");
          setVille("");
          setCodePostal("");

          toast.success("Votre lieu dog-friendly a bien été ajouté !");
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du lieu:", error);
      toast.error("Erreur lors de l'ajout du lieu.");
    } finally {
      setAddingLocation(false);
    }
  };

  // Function to handle change in postal code
  const handlePostalCodeChange = async (e) => {
    const newPostalCode = e.target.value;
    setCodePostal(newPostalCode);
    setVille("");

    const city = await reverseGeocodePostalCode(newPostalCode);
    if (city) {
      setVille(city);
    }
  };

  return (
    <>
      <div className="header-Dogfriendly">
        <h1>Lieux dog-Friendly</h1>
        <p>
          Trouvez et partagez des lieux dog-friendly tels que des restaurants,
          des hôtels, des campings et des plages où votre chien est le bienvenu
          ! Utilisez notre carte interactive pour découvrir de nouveaux endroits
          et ajoutez vos recommandations personnelles pour aider d'autres
          passionnés de chiens à trouver les meilleurs spots pour eux et leurs
          amis à quatre pattes.
        </p>
      </div>
      <div className="promenade-container">
        {loading ? (
          <div>Chargement des lieux...</div>
        ) : (
          <MapContainer
            center={[46.309547041230495, 2.5215414968572425]}
            zoom={6}
            className="map-container-df"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
              <Marker key={location.name} position={location.position}>
                <Popup>
                  <div>
                    <h3>{location.name}</h3>
                    <p>
                      {location.address}, {location.ville},{" "}
                      {location.codePostal}
                    </p>
                    <p>{location.description}</p>
                    <p>Type: {location.type}</p>
                    <p>Prix: {location.price}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            <MapClickHandler
              onClick={(addressData) => {
                setAddress(addressData.address);
                setVille(addressData.ville);
                setCodePostal(addressData.codePostal);
              }}
            />
          </MapContainer>
        )}

        <div className="dog-friendly-container">
          {isAuthenticated ? (
            <>
              <button
                className="toggle-form"
                type="button"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "›" : "‹"}
              </button>
              {showForm && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddLocation();
                  }}
                  className="dog-friendly-form"
                >
                  <h2>Ajouter un lieu dog-Friendly</h2>
                  <div className="form-group">
                    <label htmlFor="name">Nom du lieu:</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                    >
                      <option value="">Sélectionnez un type</option>
                      {placeTypes.map((placeType) => (
                        <option key={placeType} value={placeType}>
                          {placeType}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Adresse:</label>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ville">Ville:</label>
                    <input
                      type="text"
                      id="ville"
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="codePostal">Code Postal:</label>
                    <input
                      type="text"
                      id="codePostal"
                      value={codePostal}
                      onChange={handlePostalCodeChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Prix (optionnel):</label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <button type="submit" disabled={addingLocation}>
                    {addingLocation ? "Ajout en cours..." : "Ajouter un lieu"}
                  </button>
                </form>
              )}
            </>
          ) : (
            <div className="not-authenticated-message">
              <h2>
                Vous devez être connecté pour proposer un lieu dog-Friendly
              </h2>
              <Link className="connect" to="/loggin">
                <button type="button">Se connecter</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DogFriendly;
