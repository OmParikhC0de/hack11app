import { useState, useEffect } from 'react';
import './RealmMap.css';

// Location types that can be searched via Google Places
const searchCategories = [
    { id: 'all', label: 'All Places', icon: '🗺️', query: '' },
    { id: 'farmers-market', label: 'Markets', icon: '🥬', query: 'farmers market organic' },
    { id: 'refill', label: 'Refill Stations', icon: '🧴', query: 'zero waste refill store' },
    { id: 'thrift', label: 'Thrift Stores', icon: '👕', query: 'thrift store secondhand' },
    { id: 'garden', label: 'Gardens', icon: '🌻', query: 'community garden' },
    { id: 'recycling', label: 'Recycling', icon: '♻️', query: 'recycling center' },
    { id: 'repair', label: 'Repair', icon: '🔧', query: 'repair cafe electronics repair' },
];

// Suggested eco-friendly search terms
const suggestedSearches = [
    { icon: '🥬', label: 'Farmers Markets', query: 'farmers market' },
    { icon: '🧴', label: 'Zero Waste Stores', query: 'zero waste store' },
    { icon: '♻️', label: 'Recycling Centers', query: 'recycling center' },
    { icon: '👕', label: 'Thrift Stores', query: 'thrift store' },
    { icon: '🚲', label: 'Bike Shops', query: 'bike repair shop' },
    { icon: '🌱', label: 'Plant Nurseries', query: 'plant nursery garden center' },
    { icon: '☀️', label: 'Solar Installers', query: 'solar panel installation' },
    { icon: '🥗', label: 'Vegan Restaurants', query: 'vegan restaurant' },
];

function RealmMap() {
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const requestLocation = () => {
        setIsLoadingLocation(true);
        setLocationError(null);

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
    };

    const searchNearby = (query) => {
        if (!query) return;

        let url;
        if (userLocation) {
            // Search near user's location
            const { lat, lng } = userLocation;
            url = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lng},14z`;
        } else {
            // General search
            url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
        }
        window.open(url, '_blank');
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category.id);
        if (category.query) {
            searchNearby(category.query);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            searchNearby(searchQuery + ' eco sustainable');
        }
    };

    return (
        <div className="map-container">
            <div className="map-header">
                <span className="map-icon">🗺️</span>
                <h2 className="map-title">Realm Map</h2>
                <p className="map-subtitle">Discover eco-friendly locations near you</p>
            </div>

            {/* Location Section */}
            <div className="location-section glass-card">
                <div className="location-status">
                    {userLocation ? (
                        <div className="location-found">
                            <span className="location-dot"></span>
                            <span>Location enabled</span>
                            <span className="coords">({userLocation.lat.toFixed(2)}°, {userLocation.lng.toFixed(2)}°)</span>
                        </div>
                    ) : (
                        <div className="location-prompt">
                            <span className="prompt-icon">📍</span>
                            <p>Enable location for personalized nearby results</p>
                            <button
                                className="location-btn"
                                onClick={requestLocation}
                                disabled={isLoadingLocation}
                            >
                                {isLoadingLocation ? (
                                    <>🔄 Locating...</>
                                ) : (
                                    <>🧭 Enable Location</>
                                )}
                            </button>
                        </div>
                    )}
                    {locationError && (
                        <p className="location-error">⚠️ {locationError}</p>
                    )}
                </div>

                {/* Search Bar */}
                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for eco-friendly places..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-btn">
                        🔍 Search
                    </button>
                </form>
            </div>

            {/* Category Filters */}
            <div className="map-filters">
                {searchCategories.map(category => (
                    <button
                        key={category.id}
                        className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <span className="filter-icon">{category.icon}</span>
                        <span className="filter-label">{category.label}</span>
                    </button>
                ))}
            </div>

            {/* Suggested Searches */}
            <div className="suggested-section">
                <h3 className="suggested-title">✨ Quick Searches</h3>
                <div className="suggested-grid">
                    {suggestedSearches.map((item, i) => (
                        <button
                            key={i}
                            className="suggested-card glass-card"
                            onClick={() => searchNearby(item.query)}
                        >
                            <span className="suggested-icon">{item.icon}</span>
                            <span className="suggested-label">{item.label}</span>
                            <span className="suggested-arrow">→</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Info Card */}
            <div className="info-card glass-card">
                <div className="info-icon">💡</div>
                <div className="info-content">
                    <h4>How it works</h4>
                    <p>Click any category or quick search to open Google Maps with eco-friendly locations {userLocation ? 'near you' : ''}. Enable location for more relevant results!</p>
                </div>
            </div>
        </div>
    );
}

export default RealmMap;
