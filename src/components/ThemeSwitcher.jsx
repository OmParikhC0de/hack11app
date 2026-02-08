import { useState, useEffect } from 'react';
import './ThemeSwitcher.css';

const themes = [
    { id: 'forest', icon: '🌿', label: 'Eternal Forest', color: '#00ff88' },
    { id: 'void', icon: '🌌', label: 'Celestial Void', color: '#a855f7' },
    { id: 'solar', icon: '☀️', label: 'Solar Flare', color: '#ff4500' }
];

function ThemeSwitcher() {
    const [currentTheme, setCurrentTheme] = useState('forest');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    return (
        <div className={`theme-switcher ${isOpen ? 'open' : ''}`}>
            <button
                className="theme-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                title="Change Theme"
            >
                <span className="toggle-icon">🎨</span>
            </button>

            <div className="theme-options">
                {themes.map(theme => (
                    <button
                        key={theme.id}
                        className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                        onClick={() => {
                            setCurrentTheme(theme.id);
                            setIsOpen(false);
                        }}
                        style={{ '--theme-color': theme.color }}
                        title={theme.label}
                    >
                        <span className="theme-icon">{theme.icon}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ThemeSwitcher;
