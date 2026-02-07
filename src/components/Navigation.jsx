import './Navigation.css';

function Navigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home', description: 'Discover Trends' },
    { id: 'consultation', icon: '🧙‍♂️', label: 'Consultation', description: 'Ask the Wizard' },
    { id: 'faq', icon: '📖', label: 'FAQ', description: 'Common Questions' },
    { id: 'quests', icon: '📜', label: 'Quest Board', description: 'Daily Challenges' },
    { id: 'map', icon: '🗺️', label: 'Realm Map', description: 'Find Eco-Spots' },
  ];

  return (
    <nav className="floating-nav">
      <div className="nav-orbs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`nav-orb ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            style={{ '--orb-index': index }}
            title={tab.label}
          >
            <span className="orb-glow"></span>
            <span className="orb-icon">{tab.icon}</span>
            <span className="orb-tooltip">
              <span className="tooltip-title">{tab.label}</span>
              <span className="tooltip-desc">{tab.description}</span>
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
