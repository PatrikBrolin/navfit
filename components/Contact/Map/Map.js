import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = () => {


  const redMarker = new L.Icon({
    iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  return (
    <MapContainer
      center={[59.20188, 17.7671]}
      zoom={10}
      style={{ height: "400px", width: "100%" }}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[59.20188, 17.7671]} icon={redMarker}>
        <Popup>
        Actic Salem, Säbyvägen 19, 144 30 Rönninge
        </Popup>
      </Marker>
      <Marker position={[59.30398, 18.11337]} icon={redMarker}>
        <Popup>
        Actic Hammarbysjöstad, Skeppsmäklargatan 1, 120 69 Stockholm
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
