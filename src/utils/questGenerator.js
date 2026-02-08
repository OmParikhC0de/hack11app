export const QUEST_TEMPLATES = [
    { action: "Plant", targets: ["Tree", "Flower", "Herb Garden", "Vegetable Patch", "Bee-Friendly Plant"], icon: "🌱", category: "nature" },
    { action: "Recycle", targets: ["Plastic Bottles", "Cans", "Electronics", "Cardboard", "Glass Jars"], icon: "♻️", category: "waste" },
    { action: "Save", targets: ["Water", "Energy", "Heat", "Leftovers", "Paper"], icon: "💧", category: "resource" },
    { action: "Clean", targets: ["Park", "Beach", "Street", "Local Trail", "Riverbank"], icon: "🧹", category: "waste" },
    { action: "Donate", targets: ["Clothes", "Books", "Toys", "Furniture", "Canned Food"], icon: "🎁", category: "community" },
    { action: "Eat", targets: ["Vegan Meal", "Local Produce", "Organic Fruit", "Meat-Free Lunch", "Homemade Snack"], icon: "🍎", category: "food" },
    { action: "Walk", targets: ["To Work", "To School", "To Shop", "In Nature", "Instead of Driving"], icon: "🚶", category: "transport" },
    { action: "Unplug", targets: ["Chargers", "TV", "Computer", "Microwave", "Lamps"], icon: "🔌", category: "energy" },
    { action: "Reuse", targets: ["Shopping Bag", "Water Bottle", "Coffee Cup", "Container", "Straw"], icon: "🔄", category: "waste" },
    { action: "Fix", targets: ["Broken Toy", "Torn Shirt", "Leaky Faucet", "Loose Handle", "Old Gadget"], icon: "🔧", category: "waste" },
    { action: "Compost", targets: ["Banana Peels", "Coffee Grounds", "Eggshells", "Yard Waste", "Tea Bags"], icon: "🍂", category: "food" },
    { action: "Learn", targets: ["About Solar", "About Ocean", "About Bees", "Recycling Rules", "Native Plants"], icon: "📚", category: "education" },
    { action: "Share", targets: ["Eco-Tip", "Garden Harvest", "Carpool Ride", "Reusable Bag", "Knowledge"], icon: "🤝", category: "community" },
    { action: "Buy", targets: ["Secondhand", "Bulk Food", "Plastic-Free", "Local Art", "Eco-Soap"], icon: "🛍️", category: "consumption" },
    { action: "Watch", targets: ["Nature Doc", "Sunset", "Birds", "Stars", "Clouds"], icon: "👀", category: "nature" }
];

export const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export function generateQuest(id) {
    const template = QUEST_TEMPLATES[Math.floor(Math.random() * QUEST_TEMPLATES.length)];
    const target = template.targets[Math.floor(Math.random() * template.targets.length)];
    const difficulty = DIFFICULTIES[Math.floor(Math.random() * DIFFICULTIES.length)];

    let xp, manaReward;
    if (difficulty === "Easy") { xp = 30 + Math.floor(Math.random() * 20); manaReward = 10 + Math.floor(Math.random() * 5); }
    else if (difficulty === "Medium") { xp = 60 + Math.floor(Math.random() * 30); manaReward = 20 + Math.floor(Math.random() * 10); }
    else { xp = 100 + Math.floor(Math.random() * 50); manaReward = 40 + Math.floor(Math.random() * 15); }

    const descriptions = [
        `Time to ${template.action.toLowerCase()} ${target.toLowerCase()}! Every small step helps.`,
        `Can you ${template.action.toLowerCase()} ${target.toLowerCase()} today? The realm needs your help!`,
        `A wizard's challenge: ${template.action} ${target} to earn magical rewards.`,
        `Nature calls for aid: ${template.action.toLowerCase()} ${target.toLowerCase()} immediately!`,
        `Boost your mana by deciding to ${template.action.toLowerCase()} ${target.toLowerCase()}.`
    ];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];

    return {
        id: id || Date.now() + Math.random(),
        title: `${template.action} ${target}`,
        description,
        difficulty,
        xp,
        manaReward,
        icon: template.icon,
        category: template.category
    };
}

export function generateQuestBatch(count = 8) {
    return Array.from({ length: count }, (_, i) => generateQuest(Date.now() + i));
}
