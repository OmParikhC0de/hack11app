import { useState, useEffect } from 'react';
import './MagicMap.css';

// Eco-friendly search categories
const searchCategories = [
    { id: 'my-location', label: 'My Location', icon: '📍', query: null },
    { id: 'farmers-market', label: 'Farmers Markets', icon: '🥬', query: 'farmers market organic' },
    { id: 'thrift', label: 'Thrift Stores', icon: '👕', query: 'thrift store secondhand' },
    { id: 'recycling', label: 'Recycling Centers', icon: '♻️', query: 'recycling center' },
    { id: 'zero-waste', label: 'Zero Waste', icon: '🧴', query: 'zero waste store' },
    { id: 'vegan', label: 'Vegan Food', icon: '🥗', query: 'vegan restaurant' },
    { id: 'bike', label: 'Bike Shops', icon: '🚲', query: 'bike repair shop' },
];

function MagicMap() {
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const [activeCategory, setActiveCategory] = useState('farmers-market');
    const [mapQuery, setMapQuery] = useState('farmers market organic');

    // Request location on mount
    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            setIsLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setIsLoadingLocation(false);
            },
            (error) => {
                let message = 'Unable to retrieve your location';
                if (error.code === 1) message = 'Location access denied. Please enable location services.';
                else if (error.code === 2) message = 'Location unavailable. Please try again.';
                else if (error.code === 3) message = 'Location request timed out.';
                setLocationError(message);
                setIsLoadingLocation(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    }, []);

    const handleCategoryClick = (category) => {
        setActiveCategory(category.id);
        setMapQuery(category.query);
    };

    // Build Google Maps embed URL
    const getMapEmbedUrl = () => {
        const apiKey = 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8'; // Free embed API key

        // If "My Location" is selected, show a marker at user's precise location
        if (activeCategory === 'my-location' && userLocation) {
            return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${userLocation.lat},${userLocation.lng}&zoom=15`;
        }

        // Otherwise, search for the selected category near user's location
        let locationParam = '';
        if (userLocation) {
            locationParam = `&center=${userLocation.lat},${userLocation.lng}&zoom=13`;
        }

        return `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(mapQuery || 'eco friendly')}${locationParam}`;
    };

    return (
        <div className="magic-map-container glass-card">
            <div className="map-header">
                <div className="header-left">
                    <span className="map-icon">🗺️</span>
                    <h2 className="map-title">Realm Map</h2>
                </div>
                <div className="map-controls">
                    {userLocation ? (
                        <span className="live-indicator">● Location Active</span>
                    ) : (
                        <span className="location-pending">📍 {isLoadingLocation ? 'Locating...' : 'No Location'}</span>
                    )}
                </div>
            </div>

            <p className="map-subtitle">Discover eco-friendly locations near you</p>

            {/* Category Filters */}
            <div className="category-filters">
                {searchCategories.map(category => (
                    <button
                        key={category.id}
                        className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <span className="category-icon">{category.icon}</span>
                        <span className="category-label">{category.label}</span>
                    </button>
                ))}
            </div>

            {/* Map Display */}
            <div className="map-frame">
                {locationError && !userLocation ? (
                    <div className="location-error-overlay">
                        <span className="error-icon">⚠️</span>
                        <p>{locationError}</p>
                        <p className="error-hint">Showing general results instead</p>
                    </div>
                ) : null}

                {isLoadingLocation ? (
                    <div className="loading-overlay">
                        <div className="magic-spinner"></div>
                        <p>Casting location spell...</p>
                    </div>
                ) : (
                    <iframe
                        className="google-map-embed"
                        src={getMapEmbedUrl()}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Eco-friendly locations map"
                    ></iframe>
                )}

                {/* Decorative Border */}
                <div className="map-overlay-border"></div>
            </div>

            {/* Info Footer */}
            <div className="map-footer">
                <span className="footer-icon">💡</span>
                <p>Click a category to find eco-friendly spots {userLocation ? 'near you' : 'in your area'}!</p>
            </div>
        </div>
    );
}

export default MagicMap;
