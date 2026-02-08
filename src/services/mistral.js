const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;

const MOCK_RESPONSES = [
    "The ancient scrolls are silent... (Missing API Key)",
    "My crystal ball is cloudy. I cannot reach the Mistral realm without a key.",
    "The spirits of the forest are whispering, but I need a key to understand them.",
    "Please provide a VITE_MISTRAL_API_KEY in your .env file to awaken my true power!"
];

export async function getWizardResponse(userMessage) {
    if (!API_KEY) {
        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        return {
            content: MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)],
            isMock: true
        };
    }

    try {
        const response = await fetch(MISTRAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "mistral-tiny",
                messages: [
                    { role: "system", content: "You are Sage, a wise and magical Sustainability Wizard. You speak in a mystical, old-timey yet helpful tone. You provide practical eco-friendly advice but wrap it in magical metaphors. Keep responses concise (under 3 sentences)." },
                    { role: "user", content: userMessage }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`WizardFizzle: ${response.status}`);
        }

        const data = await response.json();
        return {
            content: data.choices[0].message.content,
            isMock: false
        };

    } catch (error) {
        console.error("Mistral Summoning Failed:", error);
        return {
            content: "The magical ley lines are disrupted! I cannot consult the archives right now. 🧙‍♂️💥",
            isMock: true
        };
    }
}
