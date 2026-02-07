import './TrendCard.css';

const sentimentConfig = {
    positive: {
        icon: '🌱',
        label: 'Positive',
        color: 'var(--magic-green)'
    },
    neutral: {
        icon: '⚡',
        label: 'Neutral',
        color: 'var(--gold)'
    },
    negative: {
        icon: '🌪️',
        label: 'Concern',
        color: '#ff6b6b'
    }
};

export default function TrendCard({ trend, index }) {
    const sentiment = sentimentConfig[trend.sentiment];

    return (
        <article
            className="trend-card glass-card"
            style={{ '--delay': `${index * 0.15}s` }}
        >
            {/* Header */}
            <div className="trend-header">
                <div className="trend-rank">#{index + 1}</div>
                <h3 className="trend-name">{trend.name}</h3>
                <div
                    className="sentiment-badge"
                    style={{ '--sentiment-color': sentiment.color }}
                >
                    <span className="sentiment-icon">{sentiment.icon}</span>
                    <span className="sentiment-label">{sentiment.label}</span>
                </div>
            </div>

            {/* Description */}
            <p className="trend-description">{trend.description}</p>

            {/* Stats */}
            <div className="trend-stats">
                <div className="stat">
                    <span className="stat-value">{trend.mentions}</span>
                    <span className="stat-label">Mentions</span>
                </div>
                <div className="stat">
                    <span className="stat-value text-gradient">{trend.growth}</span>
                    <span className="stat-label">Growth</span>
                </div>
                <div className="stat">
                    <div className="strength-bar">
                        <div
                            className="strength-fill"
                            style={{ width: `${trend.strength}%` }}
                        ></div>
                    </div>
                    <span className="stat-label">Trend Strength</span>
                </div>
            </div>

            {/* Tags */}
            <div className="trend-tags">
                {trend.tags.map((tag, i) => (
                    <span key={i} className="tag">#{tag}</span>
                ))}
            </div>

            {/* Source */}
            <div className="trend-source">
                <span className="source-icon">📍</span>
                <span className="source-name">{trend.source}</span>
            </div>

            {/* Magical corner decoration */}
            <div className="card-decoration top-left">✦</div>
            <div className="card-decoration bottom-right">✦</div>
        </article>
    );
}
