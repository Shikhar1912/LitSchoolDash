import logo from "@/assets/litlogo.avif";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProfileBundleById } from "@/api";
import type { Profile } from "@/api/types";

export default function Navbar() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchProfileBundleById(userId)
        .then((bundle) => {
          if (bundle) {
            setProfile(bundle.profile);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [userId]);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto h-12 flex items-center justify-between">
        <div className="bg-black h-full flex items-center px-6 py-2">
          <img src={logo} alt="Lit" className="h-full w-auto" />
        </div>
        <div className="flex items-center gap-2">
          <Link to="/profiles">
            <Button variant="ghost" size="sm">
              Browse Profiles
            </Button>
          </Link>
          <Link to="/add-profile">
            <Button variant="outline" size="sm">
              Add Profile
            </Button>
          </Link>
          <div className="relative group">
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="w-7 h-7">
                {loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  </div>
                ) : (
                  <>
                    <AvatarImage
                      src={
                        profile?.avatarUrl || "https://i.pravatar.cc/80?img=5"
                      }
                      alt={profile?.name || "User"}
                    />
                    <AvatarFallback>{profile?.name?.[0] || "U"}</AvatarFallback>
                  </>
                )}
              </Avatar>
              <span className="text-sm">
                {loading ? (
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  profile?.name || "Account"
                )}
              </span>
            </Button>
            <div className="absolute right-0 mt-2 hidden w-44 rounded-md border bg-popover p-1 shadow-md group-hover:block">
              <Button variant="ghost" className="w-full justify-start">
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
