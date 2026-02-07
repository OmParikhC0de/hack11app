import { useState, useEffect } from 'react';
import './QuestBoard.css';

const questsData = [
    {
        id: 1,
        title: "The Zero-Waste Lunch",
        description: "Pack a completely plastic-free lunch today. Use reusable containers, cloth napkins, and metal utensils.",
        difficulty: "Easy",
        xp: 50,
        manaReward: 15,
        icon: "🥗",
        category: "waste"
    },
    {
        id: 2,
        title: "Phantom Energy Hunt",
        description: "Unplug 5 devices that are consuming standby power. Slay these energy vampires!",
        difficulty: "Easy",
        xp: 40,
        manaReward: 12,
        icon: "🔌",
        category: "energy"
    },
    {
        id: 3,
        title: "The Meat-Free Feast",
        description: "Prepare a delicious plant-based dinner. Discover new recipes and reduce your carbon footprint.",
        difficulty: "Medium",
        xp: 75,
        manaReward: 25,
        icon: "🥬",
        category: "food"
    },
    {
        id: 4,
        title: "The Great Declutter",
        description: "Find 10 items to donate or recycle. Give old possessions a new life elsewhere.",
        difficulty: "Medium",
        xp: 80,
        manaReward: 28,
        icon: "📦",
        category: "waste"
    },
    {
        id: 5,
        title: "Hydration Guardian",
        description: "Use only your reusable water bottle today. Refuse all single-use plastic bottles.",
        difficulty: "Easy",
        xp: 35,
        manaReward: 10,
        icon: "💧",
        category: "water"
    },
    {
        id: 6,
        title: "The Green Commute",
        description: "Walk, bike, or use public transit for all travel today. Leave the car behind!",
        difficulty: "Hard",
        xp: 100,
        manaReward: 40,
        icon: "🚲",
        category: "transport"
    },
    {
        id: 7,
        title: "Digital Cleanup",
        description: "Delete 100 old emails and unsubscribe from 5 newsletters. Reduce digital carbon footprint.",
        difficulty: "Easy",
        xp: 45,
        manaReward: 14,
        icon: "📧",
        category: "energy"
    },
    {
        id: 8,
        title: "Nature's Healer",
        description: "Plant something today - a tree, flower, or herb. Even a small pot counts!",
        difficulty: "Medium",
        xp: 90,
        manaReward: 30,
        icon: "🌳",
        category: "nature"
    }
];

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
    const [acceptedQuests, setAcceptedQuests] = useState(() => {
        const saved = localStorage.getItem('eco-accepted-quests');
        return saved ? JSON.parse(saved) : [];
    });

    const [completedQuests, setCompletedQuests] = useState(() => {
        const saved = localStorage.getItem('eco-completed-quests');
        return saved ? JSON.parse(saved) : [];
    });

    const [mana, setMana] = useState(() => {
        const saved = localStorage.getItem('eco-mana');
        return saved ? parseInt(saved) : 0; // Start at 0
    });

    const [showFireworks, setShowFireworks] = useState(false);
    const [availableQuests, setAvailableQuests] = useState(() => {
        const saved = localStorage.getItem('eco-available-quests');
        return saved ? JSON.parse(saved) : questsData.map(q => q.id);
    });

    useEffect(() => {
        localStorage.setItem('eco-accepted-quests', JSON.stringify(acceptedQuests));
    }, [acceptedQuests]);

    useEffect(() => {
        localStorage.setItem('eco-completed-quests', JSON.stringify(completedQuests));
    }, [completedQuests]);

    useEffect(() => {
        localStorage.setItem('eco-mana', mana.toString());
    }, [mana]);

    useEffect(() => {
        localStorage.setItem('eco-available-quests', JSON.stringify(availableQuests));
    }, [availableQuests]);

    const acceptQuest = (questId) => {
        if (!acceptedQuests.includes(questId)) {
            setAcceptedQuests([...acceptedQuests, questId]);
        }
    };

    const completeQuest = (questId) => {
        const quest = questsData.find(q => q.id === questId);
        setAcceptedQuests(acceptedQuests.filter(id => id !== questId));
        setCompletedQuests([...completedQuests, questId]);
        setAvailableQuests(availableQuests.filter(id => id !== questId));

        // Add mana reward
        const newMana = Math.min(MAX_MANA, mana + (quest?.manaReward || 20));
        setMana(newMana);

        // Check for fireworks
        if (newMana >= MAX_MANA && mana < MAX_MANA) {
            setShowFireworks(true);
        }
    };

    const refreshQuests = () => {
        // Reset available quests (keeping completed ones marked)
        setAvailableQuests(questsData.map(q => q.id));
        setAcceptedQuests([]);
        // Clear completed for fresh start
        setCompletedQuests([]);
    };

    const totalXP = completedQuests.reduce((sum, id) => {
        const quest = questsData.find(q => q.id === id);
        return sum + (quest?.xp || 0);
    }, 0);

    const level = getLevel(totalXP);
    const xpProgress = getXPProgress(totalXP);
    const nextLevelXP = getXPForNextLevel(totalXP);

    const displayQuests = questsData.filter(q => availableQuests.includes(q.id));

    return (
        <div className="quest-container">
            {showFireworks && <Fireworks onComplete={() => setShowFireworks(false)} />}

            {/* Vertical Mana Bar */}
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
                    {displayQuests.length === 0 ? (
                        <div className="no-quests">
                            <span className="no-quests-icon">✨</span>
                            <p>All quests completed! Click "New Quests" to refresh.</p>
                        </div>
                    ) : (
                        displayQuests.map((quest) => {
                            const isAccepted = acceptedQuests.includes(quest.id);
                            const isCompleted = completedQuests.includes(quest.id);

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
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuestBoard;
