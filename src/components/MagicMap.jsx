import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MagicMap.css';

// Fix for default Leaflet icon issues in Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: null,
    iconUrl: null,
    shadowUrl: null,
});

// Custom Magical Icons
const createMagicIcon = (emoji, color) => L.divIcon({
    className: 'magic-marker-icon',
    html: `<div style="background: ${color}; box-shadow: 0 0 15px ${color}"><span>${emoji}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20]
});

const icons = {
    market: createMagicIcon('🥬', '#00ff88'),
    shop: createMagicIcon('🛍️', '#ffd700'),
    nature: createMagicIcon('🌳', '#00c8ff'),
    energy: createMagicIcon('⚡', '#ff4500'),
    rune: createMagicIcon('✨', '#a855f7') // For decoration
};

// Mock Locations (Magical Overlay)
const magicalLocations = [
    { id: 1, name: "Crystal Grove Market", type: "market", lat: 40.7128, lng: -74.0060, desc: "Organic potions and herbs" },
    { id: 2, name: "Sunfire Solar Spire", type: "energy", lat: 40.7580, lng: -73.9855, desc: "Renewable energy source" },
    { id: 3, name: "Sanctuary of Old Threads", type: "shop", lat: 40.7829, lng: -73.9654, desc: "Thrifted robes and armor" },
    { id: 4, name: "Whispering Park", type: "nature", lat: 40.7484, lng: -73.9857, desc: "Ancient trees speak here" },
    // Random Runes
    { id: 101, name: "Ancient Rune", type: "rune", lat: 40.73, lng: -74.02, desc: "A source of magical power" },
    { id: 102, name: "Star Fragment", type: "rune", lat: 40.76, lng: -73.95, desc: "Fallen from the void" },
];

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, 13);
        });
    }, [map]);

    return position === null ? null : (
        <Marker position={position} icon={createMagicIcon('🧙‍♂️', '#ffffff')}>
            <Popup>You are here!</Popup>
        </Marker>
    );
}

function MagicMap() {
    // Default to NYC if no location found
    const center = [40.7128, -74.0060];

    return (
        <div className="magic-map-container glass-card">
            <div className="map-header">
                <h2 className="map-title">Realm Map</h2>
                <div className="map-controls">
                    <span className="live-indicator">● Live Uplink</span>
                </div>
            </div>

            <div className="leaflet-frame">
                <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                    {/* Dark Matter Tiles */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    <LocationMarker />

                    {magicalLocations.map(loc => (
                        <Marker
                            key={loc.id}
                            position={[loc.lat, loc.lng]}
                            icon={icons[loc.type]}
                        >
                            <Popup className="magic-popup">
                                <strong>{loc.name}</strong><br />
                                {loc.desc}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Decorative Overlay */}
                <div className="map-overlay-border"></div>
            </div>
        </div>
    );
}

export default MagicMap;
