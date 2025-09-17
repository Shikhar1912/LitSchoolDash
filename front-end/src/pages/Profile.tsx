import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  fetchProfileBundle,
  fetchProfileBundleById,
  type ProfileBundle,
} from "@/api";
import CoverImage from "../components/profile/CoverImage";
import ProfileInfo from "../components/profile/ProfileInfo";
import Experiences from "../components/profile/Experiences";
import SkillsRadar from "../components/profile/SkillsRadar";
import Interests from "../components/profile/Interests";
import Endorsements from "../components/profile/Endorsements";
import StatsSummary from "../components/profile/StatsSummary";
import TabsPills from "../components/profile/TabsPills";
import EpicsList from "../components/profile/EpicsList";
import Navbar from "../components/profile/Navbar";
import Highlights from "../components/profile/Highlights";

export default function Profile() {
  const [data, setData] = useState<ProfileBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
  if (!data) return null;

  return (
    <>
      <Navbar />
      <CoverImage profile={data.profile} />
      <div className="mx-auto px-12 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-18 mt-8">
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
            <TabsPills epicsCount={8} competitionsCount={11} />
            <EpicsList epics={data.epics ?? []} />
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
