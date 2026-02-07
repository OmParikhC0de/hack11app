import './LoadingSpell.css';

const loadingMessages = [
    "Consulting the forest spirits...",
    "Scanning eco-realms...",
    "Decoding green whispers...",
    "Channeling nature's wisdom...",
    "Gathering sustainable secrets...",
];

export default function LoadingSpell() {
    const message = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

    return (
        <div className="loading-spell">
            {/* Spinning runes circle */}
            <div className="runes-circle">
                <div className="rune-item">☽</div>
                <div className="rune-item">✧</div>
                <div className="rune-item">⚘</div>
                <div className="rune-item">☀</div>
                <div className="rune-item">❋</div>
                <div className="rune-item">✦</div>
            </div>

            {/* Center orb */}
            <div className="center-orb">
                <div className="orb-pulse"></div>
                <div className="orb-core">🌿</div>
            </div>

            {/* Loading text */}
            <p className="loading-text">{message}</p>

            {/* Dots animation */}
            <div className="loading-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    );
}
