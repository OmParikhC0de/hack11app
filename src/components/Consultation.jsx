import { useState, useRef, useEffect } from 'react';
import './Consultation.css';

// Wizard responses for sustainability topics
const wizardResponses = {
    greetings: [
        "Greetings, young eco-seeker! 🌿 I am Sage the Sustainability Wizard. What wisdom do you seek about protecting our realm?",
        "Ah, a visitor! ✨ Welcome to my mystical consultation chamber. How may I guide you on your sustainability journey?",
        "The crystal ball swirls with green energy! 🔮 I sense you seek knowledge about living in harmony with nature. Ask away!"
    ],
    plastic: [
        "Ah, the curse of plastic! 🧙‍♂️ A wise question indeed. Here's my counsel:\n\n• Start with reusable bags and water bottles - small spells with great power!\n• Seek out refill stations for cleaning products\n• Choose products with minimal packaging\n• Remember: Every piece of plastic refused is a victory for nature!",
        "The ancient scrolls speak of a world before plastic... 📜 To reduce your plastic footprint:\n\n• Embrace glass and metal containers\n• Support local farmers markets (less packaging!)\n• Carry a sustainability kit: reusable utensils, straw, and bag\n• Look for the magical symbols of recycling - but reducing is the true spell!"
    ],
    energy: [
        "Energy conservation - the lifeblood of a sustainable realm! ⚡ My wisdom:\n\n• LED enchantments (bulbs) use 75% less energy than traditional ones\n• Unplug idle devices - they drain power like vampires!\n• Embrace natural light and the warmth of the sun\n• Consider renewable energy sources - harness the power of wind and sun!",
        "The energy flows of our world are precious! 🌟 Here's how to be a wise steward:\n\n• Seal drafts around windows and doors\n• Use smart power strips to vanquish phantom energy drain\n• Wash clothes in cold water - equally effective, far less energy\n• Support clean energy initiatives in your community"
    ],
    food: [
        "Ah, the sacred matter of sustenance! 🥗 Listen well:\n\n• Local and seasonal foods carry less transportation burden\n• Reduce meat consumption - even one plant-based day helps!\n• Compost your food scraps - return nutrients to the earth\n• Plan meals to reduce food waste - a sin against nature!",
        "Food wisdom from the ancient gardens! 🌱 Consider these practices:\n\n• Grow your own herbs and vegetables if possible\n• Support regenerative farming practices\n• Choose organic when you can - fewer harmful potions in our soil\n• Embrace ugly produce - they taste just as magical!"
    ],
    water: [
        "Water - the essence of life itself! 💧 Guard it wisely:\n\n• Fix leaky faucets - they waste gallons over time\n• Take shorter showers - even 2 minutes less saves much\n• Collect rainwater for your garden\n• Choose drought-resistant plants for landscaping",
        "The rivers and oceans speak to those who listen! 🌊 Here's their message:\n\n• Never pour harmful potions down the drain\n• Use phosphate-free cleaning products\n• Water plants in early morning to reduce evaporation\n• Support ocean cleanup initiatives - our waters need healing"
    ],
    climate: [
        "The climate crisis - our greatest challenge! 🌍 But do not despair:\n\n• Your individual actions create ripples of change\n• Advocate for climate policies in your community\n• Calculate your carbon footprint and work to reduce it\n• Support reforestation efforts - trees are nature's healers",
        "The climate scrolls reveal both warning and hope! 📜 Take heart:\n\n• Transportation choices matter - walk, bike, or use transit when possible\n• Support businesses with strong sustainability commitments\n• Educate others - knowledge spreads like seeds in the wind\n• Vote for leaders who prioritize our planet's future"
    ],
    default: [
        "Hmm, an interesting query! 🤔 While my crystal ball ponders this, here are general eco-tips:\n\n• Reduce, Reuse, Recycle - the three sacred R's\n• Every sustainable choice matters, no matter how small\n• Connect with local environmental groups for community action\n• Stay curious and keep learning about our natural world!",
        "The mists are unclear on this specific matter... 🌫️ But remember:\n\n• Sustainability is a journey, not a destination\n• Small daily choices compound into great change\n• Share your knowledge with others\n• Nature rewards those who respect her balance!"
    ]
};

function getWizardResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('greetings')) {
        return wizardResponses.greetings[Math.floor(Math.random() * wizardResponses.greetings.length)];
    }
    if (lowerMessage.includes('plastic') || lowerMessage.includes('packaging') || lowerMessage.includes('waste')) {
        return wizardResponses.plastic[Math.floor(Math.random() * wizardResponses.plastic.length)];
    }
    if (lowerMessage.includes('energy') || lowerMessage.includes('electricity') || lowerMessage.includes('power') || lowerMessage.includes('solar')) {
        return wizardResponses.energy[Math.floor(Math.random() * wizardResponses.energy.length)];
    }
    if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('diet') || lowerMessage.includes('meat')) {
        return wizardResponses.food[Math.floor(Math.random() * wizardResponses.food.length)];
    }
    if (lowerMessage.includes('water') || lowerMessage.includes('ocean') || lowerMessage.includes('river') || lowerMessage.includes('rain')) {
        return wizardResponses.water[Math.floor(Math.random() * wizardResponses.water.length)];
    }
    if (lowerMessage.includes('climate') || lowerMessage.includes('carbon') || lowerMessage.includes('emission') || lowerMessage.includes('global warming')) {
        return wizardResponses.climate[Math.floor(Math.random() * wizardResponses.climate.length)];
    }

    return wizardResponses.default[Math.floor(Math.random() * wizardResponses.default.length)];
}

function Consultation() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'wizard',
            text: "Greetings, eco-seeker! 🧙‍♂️ I am Sage, the Sustainability Wizard. Ask me about plastic reduction, energy saving, sustainable food, water conservation, climate action, or any environmental topic. My crystal ball awaits your questions! ✨"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: inputValue.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate wizard thinking
        setTimeout(() => {
            const wizardMessage = {
                id: Date.now() + 1,
                type: 'wizard',
                text: getWizardResponse(userMessage.text)
            };
            setMessages(prev => [...prev, wizardMessage]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000);
    };

    const suggestedTopics = [
        "How can I reduce plastic use?",
        "Tips for saving energy at home",
        "What's a sustainable diet?",
        "How to conserve water?"
    ];

    const handleSuggestionClick = (topic) => {
        setInputValue(topic);
        inputRef.current?.focus();
    };

    return (
        <div className="consultation-container">
            <div className="chat-wrapper">
                {/* Chat Header */}
                <div className="chat-header">
                    <div className="wizard-avatar">🧙‍♂️</div>
                    <div className="wizard-info">
                        <h2 className="wizard-name">Sage the Sustainability Wizard</h2>
                        <span className="wizard-status">
                            <span className="status-dot"></span>
                            Ready to guide you
                        </span>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="chat-messages">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.type === 'wizard' ? 'wizard-message' : 'user-message'}`}
                        >
                            {message.type === 'wizard' && (
                                <div className="message-avatar">🧙‍♂️</div>
                            )}
                            <div className="message-content">
                                <p className="message-text">{message.text}</p>
                            </div>
                            {message.type === 'user' && (
                                <div className="message-avatar user-avatar">🌱</div>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="message wizard-message">
                            <div className="message-avatar">🧙‍♂️</div>
                            <div className="message-content typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Topics */}
                {messages.length <= 2 && (
                    <div className="suggested-topics">
                        <span className="topics-label">✨ Suggested topics:</span>
                        <div className="topics-list">
                            {suggestedTopics.map((topic, index) => (
                                <button
                                    key={index}
                                    className="topic-button"
                                    onClick={() => handleSuggestionClick(topic)}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Chat Input */}
                <form className="chat-input-form" onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        type="text"
                        className="chat-input"
                        placeholder="Ask about sustainability..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isTyping}
                    />
                    <button
                        type="submit"
                        className="send-button"
                        disabled={!inputValue.trim() || isTyping}
                    >
                        <span className="send-icon">✨</span>
                        <span className="send-text">Send</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Consultation;
