import { useState, useRef, useEffect } from 'react';
import { getWizardResponse } from '../services/mistral';
import './Consultation.css';

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
        const text = inputValue.trim();
        if (!text || isTyping) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: text
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Call Mistral Service
        try {
            const response = await getWizardResponse(text);

            const wizardMessage = {
                id: Date.now() + 1,
                type: 'wizard',
                text: response.content
            };
            setMessages(prev => [...prev, wizardMessage]);
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                type: 'wizard',
                text: "My magical connection is weak... please try again later. 🔮"
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const suggestedTopics = [
        "How can I reduce plastic use?",
        "Tips for saving energy at home",
        "What's a sustainable diet?",
        "How to conserve water?",
        "Tell me a nature fact!"
    ];

    const handleSuggestionClick = (topic) => {
        // Automatically send the suggestion
        // This requires a slight refactor or just setting input and calling submit manually logic
        // For simplicity, we'll just set it and focus, user presses send.
        // OR better: emulate user typing. 
        // Let's just set the input for now to match previous behavior but maybe trigger send?
        // Previous behavior: setInputValue(topic); inputRef.current?.focus();
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
                            Powered by Mistral AI
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
                                <p className="message-text" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
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
