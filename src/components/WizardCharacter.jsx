import { useState, useEffect } from 'react';
import './WizardCharacter.css';

const wizardQuotes = [
    "I sense eco-magic stirring in the digital realm...",
    "The spirits of sustainability whisper their secrets...",
    "Behold! The crystal reveals green wisdom...",
    "Ancient algorithms detect emerging eco-trends...",
    "The forest spirits guide our discovery...",
];

export default function WizardCharacter({ isAnalyzing, onComplete }) {
    const [quote, setQuote] = useState(wizardQuotes[0]);
    const [showSpeech, setShowSpeech] = useState(true);

    useEffect(() => {
        if (isAnalyzing) {
            const interval = setInterval(() => {
                setQuote(wizardQuotes[Math.floor(Math.random() * wizardQuotes.length)]);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isAnalyzing]);

    return (
        <div className={`wizard-container ${isAnalyzing ? 'casting' : ''}`}>
            {/* Wizard SVG */}
            <div className="wizard-figure">
                <svg viewBox="0 0 200 280" className="wizard-svg">
                    {/* Hat */}
                    <defs>
                        <linearGradient id="hatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4a2c7a" />
                            <stop offset="100%" stopColor="#2d1b4e" />
                        </linearGradient>
                        <linearGradient id="robeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1a0f2e" />
                            <stop offset="100%" stopColor="#2d1b4e" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Wizard Hat */}
                    <path
                        d="M100 5 L140 80 L60 80 Z"
                        fill="url(#hatGradient)"
                        stroke="#ffd700"
                        strokeWidth="2"
                    />
                    <ellipse cx="100" cy="80" rx="45" ry="10" fill="url(#hatGradient)" stroke="#ffd700" strokeWidth="2" />

                    {/* Stars on hat */}
                    <text x="90" y="45" fill="#ffd700" fontSize="12" filter="url(#glow)">✦</text>
                    <text x="105" y="60" fill="#00ff88" fontSize="8" filter="url(#glow)">✧</text>

                    {/* Face */}
                    <ellipse cx="100" cy="105" rx="30" ry="25" fill="#e8d4b8" />

                    {/* Beard */}
                    <path
                        d="M70 115 Q100 200 130 115"
                        fill="#e0e0e0"
                        stroke="#c0c0c0"
                        strokeWidth="1"
                    />
                    <path d="M75 120 Q100 180 125 120" fill="#f0f0f0" />

                    {/* Eyes */}
                    <ellipse cx="88" cy="100" rx="5" ry="6" fill="#2d1b4e" />
                    <ellipse cx="112" cy="100" rx="5" ry="6" fill="#2d1b4e" />
                    <circle cx="90" cy="98" r="2" fill="white" />
                    <circle cx="114" cy="98" r="2" fill="white" />

                    {/* Eyebrows */}
                    <path d="M78 92 Q88 88 98 92" stroke="#888" strokeWidth="2" fill="none" />
                    <path d="M102 92 Q112 88 122 92" stroke="#888" strokeWidth="2" fill="none" />

                    {/* Nose */}
                    <path d="M100 105 L103 115 L97 115" fill="#d4c4a8" />

                    {/* Robe */}
                    <path
                        d="M60 140 L40 280 L160 280 L140 140 Q100 160 60 140"
                        fill="url(#robeGradient)"
                        stroke="#4a2c7a"
                        strokeWidth="2"
                    />

                    {/* Robe details */}
                    <path d="M80 160 L75 280" stroke="#ffd700" strokeWidth="1" opacity="0.5" />
                    <path d="M120 160 L125 280" stroke="#ffd700" strokeWidth="1" opacity="0.5" />

                    {/* Arms */}
                    <path
                        d="M55 160 Q30 200 50 240"
                        stroke="url(#robeGradient)"
                        strokeWidth="20"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        d="M145 160 Q170 200 150 240"
                        stroke="url(#robeGradient)"
                        strokeWidth="20"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Hands */}
                    <circle cx="50" cy="245" r="12" fill="#e8d4b8" />
                    <circle cx="150" cy="245" r="12" fill="#e8d4b8" />

                    {/* Staff */}
                    <line x1="45" y1="150" x2="35" y2="280" stroke="#8B4513" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="40" cy="145" r="15" fill="none" stroke="#ffd700" strokeWidth="3" filter="url(#glow)" />
                    <circle cx="40" cy="145" r="8" fill="#00ff88" filter="url(#glow)" className="staff-orb" />
                </svg>

                {/* Magic particles */}
                {isAnalyzing && (
                    <div className="magic-particles">
                        {[...Array(12)].map((_, i) => (
                            <span key={i} className="particle" style={{
                                '--delay': `${i * 0.2}s`,
                                '--x': `${Math.random() * 100 - 50}px`,
                                '--y': `${Math.random() * 100 - 50}px`
                            }}>✦</span>
                        ))}
                    </div>
                )}
            </div>

            {/* Speech bubble */}
            <div className={`speech-bubble ${isAnalyzing ? 'active' : ''}`}>
                <p>{quote}</p>
                <div className="bubble-tail"></div>
            </div>
        </div>
    );
}
