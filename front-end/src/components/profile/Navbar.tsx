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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      <div className="mx-auto h-12 flex items-center justify-between px-4 sm:px-6">
        <div className="bg-black h-full flex items-center px-3 sm:px-6 py-2">
          <img src={logo} alt="Lit" className="h-6 sm:h-8 w-auto" />
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link to="/profiles" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Browse Profiles
            </Button>
          </Link>
          <Link to="/add-profile">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
              <span className="hidden sm:inline">Add Profile</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </Link>
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2">
              <Avatar className="w-6 h-6 sm:w-7 sm:h-7">
                {loading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></div>
                  </div>
                ) : (
                  <>
                    <AvatarImage
                      src={
                        profile?.avatarUrl || "https://i.pravatar.cc/80?img=5"
                      }
                      alt={profile?.name || "User"}
                    />
                    <AvatarFallback className="text-xs sm:text-sm">{profile?.name?.[0] || "U"}</AvatarFallback>
                  </>
                )}
              </Avatar>
              <span className="text-xs sm:text-sm hidden sm:inline">
                {loading ? (
                  <div className="w-12 sm:w-16 h-3 sm:h-4 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  profile?.name || "Account"
                )}
              </span>
            </Button>
            {isDropdownOpen && (
              <div className="absolute right-0 top-full pt-1 w-40 sm:w-44 rounded-md border bg-popover p-1 shadow-md">
                <Button variant="ghost" className="w-full justify-start text-xs sm:text-sm">
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start text-xs sm:text-sm">
                  Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start text-xs sm:text-sm">
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
