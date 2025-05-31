import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://static.vecteezy.com/system/resources/previews/019/551/284/original/electric-vehicle-charging-station-icon-in-gradient-colors-png.png",
  iconSize: [30, 30],
});

function MapView() {
  const [stations, setStations] = useState([
    {
      _id: "1",
      name: "EV Charger 1",
      location: { lat: 28.6139, lng: 77.209 },
      status: "active",
      powerOutput: 50,
      connectorType: "Type2",
    },
  ]);

  //   useEffect(() => {
  //     fetch('https://your-backend.com/api/stations')
  //       .then(res => res.json())
  //       .then(data => setStations(data));
  //   }, []);

  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={13}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {stations.map((station) => (
        <Marker
          key={station._id}
          position={[station.location.lat, station.location.lng]}
          icon={customIcon}
        >
          <Popup>
            <strong>{station.name}</strong>
            <br />
            Power: {station.powerOutput} kW
            <br />
            Status: {station.status}
            <br />
            Connector: {station.connectorType}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
