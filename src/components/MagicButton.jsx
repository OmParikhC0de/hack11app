import { useState } from 'react';
import './MagicButton.css';

export default function MagicButton({ onClick, disabled, children }) {
    const [sparkles, setSparkles] = useState([]);

    const handleMouseMove = (e) => {
        if (disabled) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newSparkle = {
            id: Date.now() + Math.random(),
            x,
            y,
        };

        setSparkles(prev => [...prev.slice(-5), newSparkle]);

        setTimeout(() => {
            setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 600);
    };

    return (
        <button
            className={`magic-button ${disabled ? 'disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
            onMouseMove={handleMouseMove}
        >
            <span className="button-bg"></span>
            <span className="button-content">
                <span className="button-icon">✨</span>
                <span className="button-text">{children}</span>
            </span>

            {/* Sparkle effects */}
            {sparkles.map(sparkle => (
                <span
                    key={sparkle.id}
                    className="sparkle"
                    style={{ left: sparkle.x, top: sparkle.y }}
                >
                    ✦
                </span>
            ))}

            {/* Border glow */}
            <span className="button-glow"></span>
        </button>
    );
}
