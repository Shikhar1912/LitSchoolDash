export type SocialLink = {
  platform:
    | "facebook"
    | "twitter"
    | "instagram"
    | "youtube"
    | "linkedin"
    | "website"
    | "github"
    | "x";
  url: string;
};

export type Experience = {
  id: string;
  title: string;
  organization: string;
  location?: string;
  start: string; // ISO date
  end?: string; // ISO date or undefined for present
  logoUrl?: string;
  summary?: string;
};

export type SkillStat = {
  name: string;
  value: number; // 0..100
};

export type Endorsement = {
  id: string;
  name: string;
  title?: string;
  avatarUrl?: string;
  text: string;
  keywords?: string[];
};

export type Profile = {
  id: string;
  name: string;
  college?: string;
  headline?: string;
  bio?: string;
  coverImageUrl?: string;
  avatarUrl?: string;
  socials?: SocialLink[];
};

export type ProfileBundle = {
  profile: Profile;
  experiences: Experience[];
  skills: SkillStat[];
  interests: string[];
  endorsements: Endorsement[];
  summary?: {
    endorsements: number;
    feedbacks: number;
    placements: number;
    topRated: number;
  };
  epics?: Epic[];
  competitions?: Competition[];
  highlights?: Highlight[];
};

export type Epic = {
  id: string;
  title: string;
  organization: string;
  dateRange: string;
  theme: string; // e.g., management, cultural
  teams?: number;
  rounds?: number;
  judges?: number;
  badge?: string; // e.g., 1st Place, Runner Up
  color?: string; // left rail color
};

export type Competition = {
  id: string;
  title: string;
  organization: string;
  dateRange: string;
  category: string; // e.g., coding, design, business
  participants?: number;
  rounds?: number;
  judges?: number;
  prize?: string; // e.g., $10,000, Trophy
  position?: string; // e.g., 1st Place, Runner Up
  color?: string; // left rail color
};

export type Highlight = {
  id: string;
  title: string;
  description?: string;
  type: "achievement" | "skill" | "experience" | "endorsement";
  date?: string;
  icon?: string;
};
