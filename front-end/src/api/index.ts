import { getMockProfileBundle } from "@/api/mock";
import { supabase } from "@/lib/supabase";
import type { ProfileBundle } from "@/api/types";

// Fetch real profile data by ID from Supabase
export const fetchProfileBundleById = async (
  profileId: string
): Promise<ProfileBundle | null> => {
  try {
    // Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", profileId)
      .single();

    if (profileError || !profile) {
      return null;
    }

    // Fetch experiences
    const { data: experiences, error: expError } = await supabase
      .from("experiences")
      .select("*")
      .eq("profile_id", profileId)
      .order("start_date", { ascending: false });

    if (expError) {
      console.error("Error fetching experiences:", expError);
    }

    // Fetch skills
    const { data: skills, error: skillsError } = await supabase
      .from("skills")
      .select("*")
      .eq("profile_id", profileId);

    if (skillsError) {
      console.error("Error fetching skills:", skillsError);
    }

    // Fetch social links
    const { data: socials, error: socialsError } = await supabase
      .from("social_links")
      .select("*")
      .eq("profile_id", profileId);

    if (socialsError) {
      console.error("Error fetching social links:", socialsError);
    }

    // Fetch endorsements
    const { data: endorsements, error: endorsementsError } = await supabase
      .from("endorsements")
      .select("*")
      .eq("profile_id", profileId);

    if (endorsementsError) {
      console.error("Error fetching endorsements:", endorsementsError);
    }

    // Fetch epics
    const { data: epics, error: epicsError } = await supabase
      .from("epics")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false });

    if (epicsError) {
      console.error("Error fetching epics:", epicsError);
    }

    // Fetch highlights
    const { data: highlights, error: highlightsError } = await supabase
      .from("highlights")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false });

    if (highlightsError) {
      console.error("Error fetching highlights:", highlightsError);
    }

    // Fetch interests
    const { data: interests, error: interestsError } = await supabase
      .from("interests")
      .select("*")
      .eq("profile_id", profileId);

    if (interestsError) {
      console.error("Error fetching interests:", interestsError);
    }

    // Transform data to match ProfileBundle type
    const profileBundle: ProfileBundle = {
      profile: {
        id: profile.id,
        name: profile.name,
        college: profile.college,
        headline: profile.headline,
        bio: profile.bio,
        coverImageUrl: profile.cover_image_url,
        avatarUrl: profile.avatar_url,
        socials:
          socials?.map((s) => ({
            id: s.id,
            platform: s.platform,
            url: s.url,
          })) || [],
      },
      experiences:
        experiences?.map((exp) => ({
          id: exp.id,
          title: exp.title,
          organization: exp.organization,
          location: exp.location,
          start: exp.start_date,
          end: exp.end_date,
          logoUrl: exp.logo_url,
          summary: exp.summary,
        })) || [],
      skills:
        skills?.map((skill) => ({
          id: skill.id,
          name: skill.name,
          value: skill.value,
        })) || [],
      endorsements:
        endorsements?.map((end) => ({
          id: end.id,
          name: end.name,
          title: end.title,
          avatarUrl: end.avatar_url,
          text: end.text,
          keywords: end.keywords || [],
        })) || [],
      interests: interests?.map((interest) => interest.name) || [],
      summary: {
        endorsements: endorsements?.length || 0,
        feedbacks: 0, // These would need separate tables
        placements: 0,
        topRated: 0,
      },
      epics:
        epics?.map((epic) => ({
          id: epic.id,
          title: epic.title,
          organization: epic.organization,
          dateRange: epic.date_range,
          theme: epic.theme,
          teams: epic.teams,
          rounds: epic.rounds,
          judges: epic.judges,
          badge: epic.badge,
          color: epic.color,
        })) || [],
      highlights:
        highlights?.map((highlight) => ({
          id: highlight.id,
          title: highlight.title,
          description: highlight.description,
          type: highlight.type,
          date: highlight.date,
          icon: highlight.icon,
        })) || [],
    };

    return profileBundle;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

// Swappable data source. Replace implementations with real HTTP later.
export const fetchProfileBundle = async (): Promise<ProfileBundle> => {
  return getMockProfileBundle();
};

export * from "@/api/types";
