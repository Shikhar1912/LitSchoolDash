import type { ProfileBundle } from "@/api/types";

// Simple mock data generator. Swap with real fetches later.
export const getMockProfileBundle = async (): Promise<ProfileBundle> => {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 200));

  return {
    summary: {
      endorsements: 22,
      feedbacks: 12,
      placements: 4,
      topRated: 28,
    },
    epics: [
      {
        id: "epic-1",
        title: "Serial Storyteller",
        organization: "Watermelon",
        dateRange: "22 June, 2021 – 31 July, 2021",
        theme: "Management",
        teams: 35,
        rounds: 7,
        judges: 5,
        color: "#f97316",
      },
      {
        id: "epic-2",
        title: "Creator Architect",
        organization: "IIM_0064",
        dateRange: "22 June, 2021 – 31 July, 2021",
        theme: "Management",
        teams: 35,
        rounds: 7,
        judges: 5,
        badge: "1st Place",
        color: "#3b82f6",
      },
      {
        id: "epic-3",
        title: "Social Media Maverick",
        organization: "IIMS0212",
        dateRange: "22 June, 2021 – 31 July, 2021",
        theme: "Cultural",
        teams: 35,
        rounds: 7,
        judges: 5,
        badge: "Runner Up",
        color: "#10b981",
      },
    ],
    highlights: [
      {
        id: "hl-1",
        title: "1st Place Winner",
        description: "Serial Storyteller Epic - Management Theme",
        type: "achievement",
        date: "July 2021",
        icon: "🏆",
      },
      {
        id: "hl-2",
        title: "Top Performer",
        description: "Consistently rated 5 stars by peers",
        type: "endorsement",
        date: "2024",
        icon: "⭐",
      },
      {
        id: "hl-3",
        title: "Leadership Excellence",
        description: "Led 35 teams across 7 rounds",
        type: "experience",
        date: "2021",
        icon: "👑",
      },
      {
        id: "hl-4",
        title: "Communication Master",
        description: "Rated 95% in public speaking skills",
        type: "skill",
        date: "2024",
        icon: "🎤",
      },
    ],
    profile: {
      id: "user-1",
      name: "John Doe",
      college: "Symbiosis, Pune",
      headline: "Entrepreneurship & Innovation enthusiast",
      bio: "A proactive student passionate about entrepreneurship & innovation. I enjoy collaborating towards common goals and value strong communication and continuous learning.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
      avatarUrl:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=256&auto=format&fit=crop",
      socials: [
        { platform: "facebook", url: "https://facebook.com" },
        { platform: "instagram", url: "https://instagram.com" },
        { platform: "youtube", url: "https://youtube.com" },
        { platform: "x", url: "https://x.com" },
      ],
    },
    experiences: [
      {
        id: "exp-1",
        title: "Content Creator",
        organization: "Bridge Media",
        location: "Bangalore, India",
        start: "2024-02-01",
        logoUrl: "https://dummyimage.com/64x64/111827/ffffff.png&text=BM",
        summary:
          "Creating short-form content and managing brand collaborations.",
      },
      {
        id: "exp-2",
        title: "Product Management",
        organization: "IPL",
        location: "Bangalore, India",
        start: "2022-02-01",
        end: "2023-03-01",
        logoUrl: "https://dummyimage.com/64x64/1f2937/ffffff.png&text=PM",
        summary: "Coordinated roadmap and executed sprints for internal tools.",
      },
      {
        id: "exp-3",
        title: "Graphic Designer",
        organization: "The Gram",
        location: "Mumbai, India",
        start: "2021-12-01",
        end: "2021-12-31",
        logoUrl: "https://dummyimage.com/64x64/0f172a/ffffff.png&text=GD",
      },
      {
        id: "exp-4",
        title: "Copy Writer",
        organization: "Bridge Media",
        location: "Mumbai, India",
        start: "2020-02-01",
        end: "2020-09-01",
        logoUrl: "https://dummyimage.com/64x64/334155/ffffff.png&text=CW",
      },
    ],
    skills: [
      { name: "Public Speaking", value: 80 },
      { name: "Confidence", value: 70 },
      { name: "Analytical", value: 65 },
      { name: "Time Management", value: 75 },
      { name: "Application", value: 60 },
      { name: "Team Player", value: 85 },
    ],
    interests: [
      "Masterchef",
      "Baking",
      "Dessert",
      "Kathak",
      "Entrepreneurship",
    ],
    endorsements: [
      {
        id: "end-1",
        name: "Mansoor Masood",
        title:
          "Communication Coach | Helping individuals master communication and public speaking skills",
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128&auto=format&fit=crop",
        text: "An exceptional communicator who consistently uplifts the team and drives impact.",
        keywords: ["Communication", "Negotiation", "Marketing"],
      },
      {
        id: "end-2",
        name: "Arpit S",
        title: "Product Manager at LYNC",
        avatarUrl:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=128&auto=format&fit=crop",
        text: "Great ownership and clear documentation. Drove alignment across stakeholders.",
        keywords: ["Communication"],
      },
      {
        id: "end-3",
        name: "Mansoor Masood",
        title: "Financial due diligence analyst @KPMG India",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=128&auto=format&fit=crop",
        text: "Strong strategic thinking and reliable execution under pressure.",
        keywords: ["Communication", "Negotiation", "Strategy", "Long Criteria"],
      },
    ],
  };
};

export type Fetcher<T> = () => Promise<T>;
