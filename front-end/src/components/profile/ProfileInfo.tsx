import type { Profile, SocialLink } from "@/api";
import { Badge } from "@/components/ui/badge";

type Props = {
  profile: Profile;
};

const iconFor = (platform: SocialLink["platform"]) => {
  const common = "w-5 h-5";
  console.log("Icon for platform:", platform); // Debug log
  switch (platform) {
    case "facebook":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12.06C22 6.477 17.523 2 11.94 2 6.356 2 1.88 6.477 1.88 12.06c0 4.992 3.657 9.136 8.436 9.94v-7.03H7.898v-2.91h2.418V9.845c0-2.39 1.425-3.708 3.607-3.708 1.044 0 2.136.186 2.136.186v2.348h-1.203c-1.186 0-1.556.737-1.556 1.49v1.787h2.648l-.423 2.91h-2.225v7.03c4.78-.804 8.436-4.948 8.436-9.94Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm6.5-.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.499 6.203a3.003 3.003 0 0 0-2.115-2.128C19.633 3.5 12 3.5 12 3.5s-7.633 0-9.384.575A3.003 3.003 0 0 0 .501 6.203C0 7.962 0 12 0 12s0 4.038.501 5.797a3.003 3.003 0 0 0 2.115 2.128C4.367 20.5 12 20.5 12 20.5s7.633 0 9.384-.575a3.003 3.003 0 0 0 2.115-2.128C24 16.038 24 12 24 12s0-4.038-.501-5.797ZM9.75 15.568V8.432L15.818 12 9.75 15.568Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "github":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "website":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      );
    case "twitter":
    case "x":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2H21L14.18 10.77 22 22h-6.4l-4.99-6.88L4.8 22H2l7.37-9.66L2 2h6.48l4.55 6.24L18.244 2Z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ProfileInfo({ profile }: Props) {
  return (
    <section className="flex flex-col gap-4 mt-12 md:mt-16 mb-6 pl-0">
      <div>
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <div className="hidden sm:block">
            {profile.college ? (
              <Badge className="mt-0.5">{profile.college}</Badge>
            ) : null}
          </div>

          {profile.socials && profile.socials.length > 0 ? (
            <div className="flex gap-3">
              {profile.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-foreground hover:bg-accent transition"
                >
                  {iconFor(s.platform)}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {profile.bio ? (
          <p className="text-sm mt-2 max-w-3xl">{profile.bio}</p>
        ) : null}
      </div>
    </section>
  );
}
