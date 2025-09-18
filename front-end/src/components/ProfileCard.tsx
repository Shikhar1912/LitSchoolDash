import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, MapPin, GraduationCap } from "lucide-react";
import type { Profile } from "@/api/types";

interface ProfileCardProps {
  profile: Profile;
  onViewProfile: (profileId: string) => void;
}

export default function ProfileCard({ profile, onViewProfile }: ProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback className="text-lg font-semibold">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {profile.name}
            </h3>
            {profile.headline && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {profile.headline}
              </p>
            )}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              {profile.college && (
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  <span className="truncate">{profile.college}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {profile.bio && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {profile.bio}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Profile ID: {profile.id.slice(0, 8)}...
            </Badge>
          </div>
          <Button
            onClick={() => onViewProfile(profile.id)}
            size="sm"
            className="group-hover:bg-blue-600 group-hover:text-white transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
