import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useWebContext } from "../context/WebContext";

// 🔌 EV Station icon
const evIcon = new L.Icon({
  iconUrl:
    "https://static.vecteezy.com/system/resources/previews/019/551/284/original/electric-vehicle-charging-station-icon-in-gradient-colors-png.png",
  iconSize: [30, 30],
});

// 🧍 User location icon
const userIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/149/149071.png", // 👤 user icon
  iconSize: [30, 30],
});

// 📍 Auto center map to user + fit bounds
function AutoCenterMap({ stations, setUserLocation }) {
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 Current Location:", latitude, longitude);

        setUserLocation({ lat: latitude, lng: longitude });
        map.setView([latitude, longitude], 13);
      },
      (error) => {
        console.error("Location error:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0,
      }
    );
  }, [map, setUserLocation]);

  useEffect(() => {
    if (stations.length > 0) {
      const bounds = stations.map((s) => [s.location.lat, s.location.lng]);
      map.fitBounds(bounds);
    }
  }, [stations, map]);

  return null;
}

function MapView() {
  const [stations, setStations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const { API_LINK } = useWebContext();

  const getAllEVStations = async () => {
    try {
      const evData = await axios.get(
        `${API_LINK}/api/charging-station/get-all-charging-station`
      );
      setStations(evData.data.allEVStations);
    } catch (error) {
      console.log("getAllEVStations error: ", error);
    }
  };

  useEffect(() => {
    getAllEVStations();
  }, []);

  return (
    <MapContainer
      center={[28.6139, 77.209]} // Delhi default
      zoom={13}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <AutoCenterMap stations={stations} setUserLocation={setUserLocation} />

      {/* EV Charging Stations */}
      {stations.map((station) => (
        <Marker
          key={station._id}
          position={[station.location.lat, station.location.lng]}
          icon={evIcon}
        >
          <Popup>
            <strong>{station.name}</strong>
            <br />
            Power: {station.powerOutput}
            <br />
            Status: {station.status}
            <br />
            Connector: {station.connectorType}
          </Popup>
        </Marker>
      ))}

      {/* User's Current Location Marker */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>📍 You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default MapView;