import type { Profile } from "@/api";

type Props = {
  profile: Profile;
};

export default function CoverImage({ profile }: Props) {
  return (
    <section className="w-full -mb-8">
      <div className="w-full h-48 md:h-56 lg:h-64 overflow-hidden bg-muted">
        {profile.coverImageUrl ? (
          <img
            src={profile.coverImageUrl}
            alt="cover"
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>
    </section>
  );
}
