import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  fetchProfileBundle,
  fetchProfileBundleById,
  type ProfileBundle,
} from "@/api";
import { Button } from "@/components/ui/button";
import CoverImage from "../components/profile/CoverImage";
import ProfileInfo from "../components/profile/ProfileInfo";
import Experiences from "../components/profile/Experiences";
import SkillsRadar from "../components/profile/SkillsRadar";
import Interests from "../components/profile/Interests";
import Endorsements from "../components/profile/Endorsements";
import StatsSummary from "../components/profile/StatsSummary";
import TabsPills from "../components/profile/TabsPills";
import EpicsList from "../components/profile/EpicsList";
import CompetitionsList from "../components/profile/CompetitionsList";
import Navbar from "../components/profile/Navbar";
import Highlights from "../components/profile/Highlights";

export default function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState<ProfileBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"epics" | "competitions">("epics");
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        let bundle: ProfileBundle | null = null;

        if (userId) {
          // Try to fetch real profile data by ID
          bundle = await fetchProfileBundleById(userId);
          if (!bundle) {
            setError("Profile not found");
            return;
          }
        } else {
          // Fall back to mock data if no user ID provided
          bundle = await fetchProfileBundle();
        }

        if (active) {
          setData(bundle);
          console.log("Profile loaded:", bundle);
        }
      } catch (e) {
        if (active) {
          setError("Failed to load profile");
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [userId]);

  if (loading) {
    return <div className="p-4">Loading…</div>;
  }
  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }
  if (!data) {
    // Show welcome page when no profile ID is provided
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to LitSchoolDash
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover and showcase student profiles, achievements, and experiences
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/profiles")}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Browse All Profiles
                </Button>
                <Button
                  onClick={() => navigate("/add-profile")}
                  variant="outline"
                  size="lg"
                >
                  Create Your Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <CoverImage profile={data.profile} />
      <div className="mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-18 mt-8">
          <div className="lg:col-span-2">
            <ProfileInfo profile={data.profile} />
            <Experiences experiences={data.experiences} />
            <Interests interests={data.interests} />
            {data.summary ? (
              <StatsSummary
                endorsements={data.summary.endorsements}
                feedbacks={data.summary.feedbacks}
                placements={data.summary.placements}
                topRated={data.summary.topRated}
              />
            ) : null}
            <TabsPills
              epicsCount={data.epics?.length ?? 0}
              competitionsCount={data.competitions?.length ?? 0}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            {activeTab === "epics" ? (
              <EpicsList epics={data.epics ?? []} />
            ) : (
              <CompetitionsList competitions={data.competitions ?? []} />
            )}
            <Highlights highlights={data.highlights ?? []} />
          </div>
          <div className="lg:col-span-1">
            <SkillsRadar skills={data.skills} />
            <Endorsements endorsements={data.endorsements} />
          </div>
        </div>
      </div>
    </>
  );
}
