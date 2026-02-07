import { useState } from 'react';
import './FAQ.css';

const faqData = [
    {
        id: 1,
        question: "What is the Eco-Trend Wizard?",
        answer: "The Eco-Trend Wizard is your magical guide to discovering the latest sustainability trends across the digital realm. We analyze discussions from Reddit, Twitter, and news sources to reveal emerging eco-movements and help you stay informed about environmental topics.",
        icon: "🔮"
    },
    {
        id: 2,
        question: "How are the trends calculated?",
        answer: "Our ancient algorithms scan eco-communities across multiple platforms, measuring mention frequency, sentiment, and growth rates. Each trend is ranked by its 'strength' - a magical formula combining engagement, positive sentiment, and momentum.",
        icon: "📊"
    },
    {
        id: 3,
        question: "What's the easiest way to start living sustainably?",
        answer: "Begin with the three R's: Reduce, Reuse, Recycle! Start small - carry a reusable water bottle, bring your own bags shopping, and say no to single-use plastics. Small daily choices compound into massive positive impact over time.",
        icon: "🌱"
    },
    {
        id: 4,
        question: "How can I reduce my carbon footprint?",
        answer: "Focus on the big three: transportation (walk, bike, or use public transit), diet (reduce meat consumption, especially beef), and energy (switch to renewable sources, use LED bulbs). Even one change in each area makes a significant difference!",
        icon: "👣"
    },
    {
        id: 5,
        question: "Is recycling actually effective?",
        answer: "Yes, but with caveats! Clean, properly sorted recycling is very effective. However, reducing consumption and reusing items is even better. Remember: recycling is the last resort, not the first solution. Focus on refusing unnecessary items first.",
        icon: "♻️"
    },
    {
        id: 6,
        question: "What sustainability certifications should I look for?",
        answer: "Look for: B Corp (ethical business), Fair Trade (worker rights), FSC (sustainable forestry), Energy Star (efficient appliances), USDA Organic (farming), and Rainforest Alliance (environmental protection). Each tells a different part of the sustainability story.",
        icon: "✅"
    },
    {
        id: 7,
        question: "How do I talk to others about sustainability?",
        answer: "Lead by example rather than lecturing. Share your journey, not judgments. Focus on positive changes and benefits rather than doom. Ask questions to understand their perspective. Remember: progress over perfection - celebrate small wins!",
        icon: "💬"
    },
    {
        id: 8,
        question: "Can one person really make a difference?",
        answer: "Absolutely! Individual actions create ripples. Your choices influence friends, family, and businesses. Consumer demand drives corporate change. Plus, collective action starts with individuals. You're part of a growing movement of millions making conscious choices.",
        icon: "✨"
    }
];

function FAQ() {
    const [openId, setOpenId] = useState(null);

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="faq-container">
            <div className="faq-header">
                <span className="faq-icon">📖</span>
                <h2 className="faq-title">The Scroll of Knowledge</h2>
                <p className="faq-subtitle">Answers to the most pondered questions of the eco-realm</p>
            </div>

            <div className="faq-list">
                {faqData.map((faq) => (
                    <div
                        key={faq.id}
                        className={`faq-item glass-card ${openId === faq.id ? 'open' : ''}`}
                    >
                        <button
                            className="faq-question"
                            onClick={() => toggleFaq(faq.id)}
                        >
                            <span className="faq-q-icon">{faq.icon}</span>
                            <span className="faq-q-text">{faq.question}</span>
                            <span className="faq-toggle">{openId === faq.id ? '−' : '+'}</span>
                        </button>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FAQ;
