import type { Profile } from "@/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  profile: Profile;
};

export default function CoverImage({ profile }: Props) {
  return (
    <section className="w-full -mb-8 relative">
      {/* Main Cover Image */}
      <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden bg-muted">
        {profile.coverImageUrl ? (
          <img
            src={profile.coverImageUrl}
            alt="cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-2xl font-bold opacity-50">
              {profile.name?.[0] || "P"}
            </span>
          </div>
        )}
      </div>

      {/* Circular Profile Inset - Overlapping the cover */}
      <div className="absolute -bottom-6 md:-bottom-12 left-16 md:left-24 z-10">
        <div className="relative">
          {/* Circular border */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg bg-white p-1">
            <Avatar className="w-full h-full">
              <AvatarImage
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full"
              />
              <AvatarFallback className="w-full h-full text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {profile.name?.[0] || "P"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </section>
  );
}
