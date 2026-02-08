import { useState, useEffect } from 'react';
import { generateQuestBatch } from '../utils/questGenerator';
import './QuestBoard.css';

const difficultyColors = {
    Easy: 'var(--magic-green)',
    Medium: 'var(--gold)',
    Hard: '#ff6b6b'
};

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000];
const MAX_MANA = 100;

function getLevel(xp) {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
    }
    return 1;
}

function getXPForNextLevel(xp) {
    const level = getLevel(xp);
    if (level >= LEVEL_THRESHOLDS.length) return xp;
    return LEVEL_THRESHOLDS[level];
}

function getXPProgress(xp) {
    const level = getLevel(xp);
    const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
    const nextThreshold = LEVEL_THRESHOLDS[level] || currentThreshold + 100;
    return Math.min(100, ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100);
}

// Fireworks component
function Fireworks({ onComplete }) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 4000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fireworks-overlay">
            <div className="fireworks-container">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="firework" style={{
                        '--delay': `${Math.random() * 2}s`,
                        '--x': `${Math.random() * 100}%`,
                        '--hue': Math.random() > 0.5 ? 150 : 45
                    }} />
                ))}
            </div>
            <div className="celebration-text">
                <span className="celebration-icon">🎆</span>
                <span>Mana Fully Charged!</span>
                <span className="celebration-icon">🎆</span>
            </div>
        </div>
    );
}

function QuestBoard() {
    // Persistent State: Total XP (Lifetime)
    const [totalXP, setTotalXP] = useState(() => {
        const saved = localStorage.getItem('eco-total-xp');
        return saved ? parseInt(saved) : 0;
    });

    // Persistent State: Active Quests (Current Batch Objects)
    const [activeQuests, setActiveQuests] = useState(() => {
        const saved = localStorage.getItem('eco-active-quests');
        return saved ? JSON.parse(saved) : generateQuestBatch(8);
    });

    // Persistent State: Accepted Quest IDs
    const [acceptedIds, setAcceptedIds] = useState(() => {
        const saved = localStorage.getItem('eco-accepted-ids');
        return saved ? JSON.parse(saved) : [];
    });

    // Persistent State: Completed Quest IDs (Current Batch)
    const [completedIds, setCompletedIds] = useState(() => {
        const saved = localStorage.getItem('eco-completed-ids');
        return saved ? JSON.parse(saved) : [];
    });

    const [mana, setMana] = useState(() => {
        const saved = localStorage.getItem('eco-mana');
        return saved ? parseInt(saved) : 0;
    });

    const [showFireworks, setShowFireworks] = useState(false);

    // Persistence Effects
    useEffect(() => { localStorage.setItem('eco-total-xp', totalXP.toString()); }, [totalXP]);
    useEffect(() => { localStorage.setItem('eco-active-quests', JSON.stringify(activeQuests)); }, [activeQuests]);
    useEffect(() => { localStorage.setItem('eco-accepted-ids', JSON.stringify(acceptedIds)); }, [acceptedIds]);
    useEffect(() => { localStorage.setItem('eco-completed-ids', JSON.stringify(completedIds)); }, [completedIds]);
    useEffect(() => { localStorage.setItem('eco-mana', mana.toString()); }, [mana]);

    const acceptQuest = (questId) => {
        if (!acceptedIds.includes(questId)) {
            setAcceptedIds([...acceptedIds, questId]);
        }
    };

    const completeQuest = (questId) => {
        const quest = activeQuests.find(q => q.id === questId);
        if (!quest) return;

        setAcceptedIds(acceptedIds.filter(id => id !== questId));
        setCompletedIds([...completedIds, questId]);

        // Add Rewards
        setTotalXP(prev => prev + quest.xp);

        const newMana = Math.min(MAX_MANA, mana + quest.manaReward);
        setMana(newMana);

        if (newMana >= MAX_MANA && mana < MAX_MANA) {
            setShowFireworks(true);
            // Reset mana after fireworks (4 seconds)
            setTimeout(() => {
                setMana(0);
            }, 4000);
        }
    };

    const refreshQuests = () => {
        const newQuests = generateQuestBatch(8);
        setActiveQuests(newQuests);
        setAcceptedIds([]);
        setCompletedIds([]);
    };

    const level = getLevel(totalXP);
    const xpProgress = getXPProgress(totalXP);
    const nextLevelXP = getXPForNextLevel(totalXP);

    return (
        <div className="quest-container">
            {showFireworks && <Fireworks onComplete={() => setShowFireworks(false)} />}

            {/* Vertical Mana Tower */}
            <div className="mana-tower">
                <div className="mana-crystal">🔮</div>
                <div className="mana-tube">
                    <div className="mana-liquid" style={{ height: `${(mana / MAX_MANA) * 100}%` }}>
                        <div className="mana-bubbles">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="bubble" style={{ '--delay': `${i * 0.3}s` }} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mana-base">✨</div>
            </div>

            <div className="quest-main">
                <div className="quest-header">
                    <div className="quest-title-section">
                        <span className="quest-icon">📜</span>
                        <h2 className="quest-title">Quest Board</h2>
                        <p className="quest-subtitle">Accept daily challenges to earn XP and charge your mana!</p>
                    </div>

                    <div className="quest-actions">
                        <div className="xp-section">
                            <div className="level-badge">
                                <span className="level-icon">⭐</span>
                                <span className="level-number">Lvl {level}</span>
                            </div>
                            <div className="xp-bar-container">
                                <div className="xp-bar">
                                    <div className="xp-fill" style={{ width: `${xpProgress}%` }}></div>
                                </div>
                                <span className="xp-text">{totalXP} / {nextLevelXP} XP</span>
                            </div>
                        </div>

                        <button className="refresh-btn" onClick={refreshQuests}>
                            🔄 New Quests
                        </button>
                    </div>
                </div>

                <div className="quests-grid">
                    {activeQuests.map((quest) => {
                        const isAccepted = acceptedIds.includes(quest.id);
                        const isCompleted = completedIds.includes(quest.id);

                        // Don't hide completed quests, show them as completed
                        return (
                            <div
                                key={quest.id}
                                className={`quest-card glass-card ${isCompleted ? 'completed' : ''} ${isAccepted ? 'accepted' : ''}`}
                            >
                                <div className="quest-card-header">
                                    <span className="quest-card-icon">{quest.icon}</span>
                                    <div
                                        className="quest-difficulty"
                                        style={{ '--diff-color': difficultyColors[quest.difficulty] }}
                                    >
                                        {quest.difficulty}
                                    </div>
                                </div>

                                <h3 className="quest-card-title">{quest.title}</h3>
                                <p className="quest-card-desc">{quest.description}</p>

                                <div className="quest-card-footer">
                                    <div className="quest-rewards">
                                        <span className="xp-badge">+{quest.xp} XP</span>
                                        <span className="mana-reward">+{quest.manaReward} 🔮</span>
                                    </div>

                                    {isCompleted ? (
                                        <div className="quest-complete-badge">✓ Complete</div>
                                    ) : isAccepted ? (
                                        <button className="quest-btn complete-btn" onClick={() => completeQuest(quest.id)}>
                                            ✓ Mark Complete
                                        </button>
                                    ) : (
                                        <button className="quest-btn accept-btn" onClick={() => acceptQuest(quest.id)}>
                                            Accept Quest
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default QuestBoard;
