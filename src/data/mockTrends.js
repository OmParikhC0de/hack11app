export const mockTrends = [
  {
    id: 1,
    name: "Refill Revolution",
    description: "Local refill stations for household products gaining massive traction. Communities sharing locations of zero-waste shops and DIY refill solutions.",
    sources: [
      { name: "r/ZeroWaste", icon: "🔴", type: "reddit" },
      { name: "@EcoWarriors", icon: "𝕏", type: "twitter" },
      { name: "TreeHugger", icon: "📰", type: "news" }
    ],
    sentiment: "positive",
    strength: 92,
    mentions: 847,
    growth: "+156%",
    tags: ["plastic-free", "local-business", "DIY"]
  },
  {
    id: 2,
    name: "Carbon Tracking Apps",
    description: "Rising interest in personal carbon footprint calculators and gamified sustainability apps. Users competing for lowest monthly emissions.",
    sources: [
      { name: "r/sustainability", icon: "🔴", type: "reddit" },
      { name: "@ClimateAction", icon: "𝕏", type: "twitter" },
      { name: "Grist", icon: "📰", type: "news" }
    ],
    sentiment: "positive",
    strength: 88,
    mentions: 623,
    growth: "+89%",
    tags: ["tech", "gamification", "tracking"]
  },
  {
    id: 3,
    name: "Thrift Flip Culture",
    description: "Gen-Z driving secondhand fashion transformation. Before/after thrift hauls and upcycling tutorials dominating discussions.",
    sources: [
      { name: "r/ThriftStoreHauls", icon: "🔴", type: "reddit" },
      { name: "@ThriftTok", icon: "🎵", type: "tiktok" },
      { name: "Vogue", icon: "📰", type: "news" }
    ],
    sentiment: "positive",
    strength: 95,
    mentions: 1203,
    growth: "+234%",
    tags: ["fashion", "upcycling", "gen-z"]
  },
  {
    id: 4,
    name: "Right to Repair Movement",
    description: "Growing frustration with planned obsolescence. Communities sharing repair guides and advocating for legislation changes.",
    sources: [
      { name: "r/repair_tutorials", icon: "🔴", type: "reddit" },
      { name: "@iFixit", icon: "𝕏", type: "twitter" },
      { name: "Wired", icon: "📰", type: "news" }
    ],
    sentiment: "neutral",
    strength: 76,
    mentions: 412,
    growth: "+67%",
    tags: ["electronics", "policy", "DIY"]
  },
  {
    id: 5,
    name: "Microplastic Awareness",
    description: "Increasing concern about microplastics in everyday products. Discussions about alternatives and filtration solutions trending.",
    sources: [
      { name: "r/environment", icon: "🔴", type: "reddit" },
      { name: "@PlasticPollution", icon: "𝕏", type: "twitter" },
      { name: "The Guardian", icon: "📰", type: "news" }
    ],
    sentiment: "negative",
    strength: 84,
    mentions: 956,
    growth: "+112%",
    tags: ["health", "awareness", "solutions"]
  },
  {
    id: 6,
    name: "Community Gardens 2.0",
    description: "Urban farming initiatives integrating tech solutions. Smart irrigation, companion planting apps, and seed-sharing networks emerging.",
    sources: [
      { name: "r/UrbanGardening", icon: "🔴", type: "reddit" },
      { name: "@GreenCities", icon: "𝕏", type: "twitter" },
      { name: "Modern Farmer", icon: "📰", type: "news" }
    ],
    sentiment: "positive",
    strength: 79,
    mentions: 534,
    growth: "+78%",
    tags: ["urban", "food", "community"]
  },
  {
    id: 7,
    name: "Eco-Anxiety Support",
    description: "Mental health discussions around climate anxiety growing. Communities forming support networks and action-oriented coping strategies.",
    sources: [
      { name: "r/climatechange", icon: "🔴", type: "reddit" },
      { name: "@EcoMindful", icon: "𝕏", type: "twitter" },
      { name: "Psychology Today", icon: "📰", type: "news" }
    ],
    sentiment: "neutral",
    strength: 71,
    mentions: 389,
    growth: "+45%",
    tags: ["mental-health", "community", "support"]
  },
  {
    id: 8,
    name: "Bamboo Everything",
    description: "Bamboo products replacing plastic in unexpected categories. From toothbrushes to laptop stands, the material is having a moment.",
    sources: [
      { name: "r/BuyItForLife", icon: "🔴", type: "reddit" },
      { name: "@SustainableSwaps", icon: "𝕏", type: "twitter" },
      { name: "Dezeen", icon: "📰", type: "news" }
    ],
    sentiment: "positive",
    strength: 82,
    mentions: 678,
    growth: "+91%",
    tags: ["materials", "plastic-free", "durable"]
  }
];

export const getRandomTrends = (count = 5) => {
  const shuffled = [...mockTrends].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const fetchTrends = () => {
  return new Promise((resolve) => {
    // Simulate API delay for magical effect
    const delay = 2000 + Math.random() * 1500;
    setTimeout(() => {
      resolve(getRandomTrends(5));
    }, delay);
  });
};
