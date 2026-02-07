import { useState } from 'react';
import WizardCharacter from './components/WizardCharacter';
import CrystalBall from './components/CrystalBall';
import TrendCard from './components/TrendCard';
import MagicButton from './components/MagicButton';
import LoadingSpell from './components/LoadingSpell';
import { fetchTrends } from './data/mockTrends';
import './App.css';

function App() {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  const handleRevealTrends = async () => {
    setIsLoading(true);
    setHasRevealed(false);
    setTrends([]);

    try {
      const data = await fetchTrends();
      setTrends(data);
      setHasRevealed(true);
    } catch (error) {
      console.error('Failed to fetch trends:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-icon">🧙‍♂️</span>
          <span className="text-gradient-gold">Eco-Trend Wizard</span>
        </h1>
        <p className="app-subtitle">
          Discover magical sustainability insights from the digital realm
        </p>
      </header>

      {/* Main content area */}
      <main className="app-main">
        {/* Left: Wizard */}
        <section className="wizard-section">
          <WizardCharacter isAnalyzing={isLoading} />
        </section>

        {/* Center: Crystal Ball + Button */}
        <section className="crystal-section">
          <CrystalBall isActive={isLoading}>
            {isLoading ? (
              <LoadingSpell />
            ) : hasRevealed ? (
              <div className="reveal-complete">
                <span className="reveal-icon">✨</span>
                <span className="reveal-text">Trends Revealed!</span>
              </div>
            ) : (
              <div className="crystal-prompt">
                <span className="prompt-icon">🔮</span>
                <span className="prompt-text">Awaiting your command...</span>
              </div>
            )}
          </CrystalBall>

          <div className="action-area">
            <MagicButton
              onClick={handleRevealTrends}
              disabled={isLoading}
            >
              {isLoading ? 'Casting Spell...' : hasRevealed ? 'Discover More' : 'Reveal Trends'}
            </MagicButton>
          </div>
        </section>
      </main>

      {/* Trends Results */}
      {hasRevealed && trends.length > 0 && (
        <section className="trends-section">
          <h2 className="trends-title">
            <span className="title-decoration">✦</span>
            Emerging Eco-Trends
            <span className="title-decoration">✦</span>
          </h2>
          <p className="trends-subtitle">
            Top {trends.length} sustainability movements detected across eco-communities
          </p>

          <div className="trends-grid">
            {trends.map((trend, index) => (
              <TrendCard key={trend.id} trend={trend} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>
          <span className="footer-icon">🌿</span>
          Powered by Ancient Algorithms & Modern Green Magic
          <span className="footer-icon">🌿</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
