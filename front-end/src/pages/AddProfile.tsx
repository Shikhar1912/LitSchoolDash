import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type {
  Profile,
  Experience,
  SkillStat,
  SocialLink,
  Endorsement,
} from "@/api/types";

interface FormData {
  profile: Omit<Profile, "id">;
  experiences: Omit<Experience, "id">[];
  skills: Omit<SkillStat, "id">[];
  socials: Omit<SocialLink, "id">[];
  endorsements: Omit<Endorsement, "id">[];
  interests: string[];
  epics: Array<{
    title: string;
    organization: string;
    dateRange: string;
    theme: string;
    teams: number;
    rounds: number;
    judges: number;
    badge?: string;
    color: string;
  }>;
  competitions: Array<{
    title: string;
    organization: string;
    dateRange: string;
    category: string;
    participants: number;
    rounds: number;
    judges: number;
    prize?: string;
    position?: string;
    color: string;
  }>;
  highlights: Array<{
    title: string;
    description: string;
    type: string;
    date: string;
    icon: string;
  }>;
}

const initialFormData: FormData = {
  profile: {
    name: "",
    college: "",
    headline: "",
    bio: "",
    coverImageUrl: "",
    avatarUrl: "",
  },
  experiences: [],
  skills: [],
  socials: [],
  endorsements: [],
  interests: [],
  epics: [],
  competitions: [],
  highlights: [],
};

export default function AddProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<{
    avatar: boolean;
    cover: boolean;
    [key: string]: boolean;
  }>({ avatar: false, cover: false });

  const fillSampleData = () => {
    setFormData({
      profile: {
        name: "John Doe",
        college: "Stanford University",
        headline: "Full Stack Developer & AI Enthusiast",
        bio: "Passionate developer with 3+ years of experience in building scalable web applications. Love working with React, Node.js, and cloud technologies.",
        coverImageUrl: "",
        avatarUrl: "",
      },
      experiences: [
        {
          title: "Senior Software Engineer",
          organization: "Tech Corp",
          location: "San Francisco, CA",
          start: "2022-01-01",
          end: undefined,
          logoUrl: "",
          summary:
            "Led development of microservices architecture and cloud-native applications. Managed a team of 5 developers and collaborated with cross-functional teams to deliver high-impact features. Improved system performance by 40%, reduced deployment time by 60%, mentored 3 junior developers who were promoted. Technologies: React, Node.js, AWS, Docker, Kubernetes, PostgreSQL, Redis",
        },
        {
          title: "Frontend Developer",
          organization: "StartupXYZ",
          location: "Remote",
          start: "2021-06-01",
          end: "2022-12-31",
          logoUrl: "",
          summary:
            "Built responsive web applications and mobile-first interfaces. Implemented modern React patterns and optimized for performance and accessibility. Reduced page load time by 50%, increased user engagement by 30%, implemented automated testing reducing bugs by 80%. Technologies: React, TypeScript, Tailwind CSS, Jest, Cypress, Webpack",
        },
        {
          title: "Full Stack Developer",
          organization: "Freelance",
          location: "Remote",
          start: "2020-03-01",
          end: "2021-05-31",
          logoUrl: "",
          summary:
            "Developed custom web solutions for small businesses. Worked directly with clients to understand requirements and deliver tailored solutions. Completed 15+ projects with 100% client satisfaction, built 3 e-commerce platforms generating $500K+ in sales. Technologies: Vue.js, Express.js, MongoDB, Stripe, PayPal, Firebase",
        },
      ],
      skills: [
        { name: "JavaScript", value: 90 },
        { name: "React", value: 85 },
        { name: "Node.js", value: 80 },
        { name: "Python", value: 75 },
        { name: "AWS", value: 70 },
      ],
      socials: [
        { platform: "linkedin", url: "https://linkedin.com/in/johndoe" },
        { platform: "github", url: "https://github.com/johndoe" },
        { platform: "x", url: "https://x.com/johndoe" },
      ],
      endorsements: [
        {
          name: "Jane Smith",
          title: "Engineering Manager",
          text: "John is an exceptional developer with outstanding problem-solving skills and leadership qualities. He consistently delivers high-quality code and has been instrumental in mentoring junior developers. His expertise in React and cloud technologies has significantly improved our team's productivity.",
          avatarUrl: "",
          keywords: ["Leadership", "React", "Cloud Technologies", "Mentoring"],
        },
        {
          name: "Mike Johnson",
          title: "Senior Developer",
          text: "I had the pleasure of working with John on multiple complex projects. His attention to detail, collaborative spirit, and technical expertise make him an invaluable team member. He's always willing to help and share knowledge with others.",
          avatarUrl: "",
          keywords: ["Collaboration", "Technical Expertise", "Problem Solving"],
        },
        {
          name: "Sarah Wilson",
          title: "Product Manager",
          text: "John's ability to translate business requirements into technical solutions is remarkable. He's proactive, communicates clearly, and always meets deadlines. His full-stack expertise and understanding of user experience make him a key asset to any development team.",
          avatarUrl: "",
          keywords: ["Business Analysis", "Communication", "Full-Stack", "UX"],
        },
        {
          name: "David Chen",
          title: "CTO",
          text: "John's technical skills and work ethic are exemplary. He led the migration of our legacy system to a modern microservices architecture, resulting in 40% performance improvement. His leadership and mentoring abilities are equally impressive.",
          avatarUrl: "",
          keywords: ["Architecture", "Leadership", "Performance", "Mentoring"],
        },
        {
          name: "Lisa Rodriguez",
          title: "Client",
          text: "John developed our e-commerce platform from scratch and exceeded all expectations. His communication throughout the project was excellent, and he delivered on time and within budget. The platform has generated over $200K in sales in just 6 months.",
          avatarUrl: "",
          keywords: [
            "E-commerce",
            "Communication",
            "Project Management",
            "Results",
          ],
        },
      ],
      interests: [
        "Web Development",
        "Machine Learning",
        "Open Source",
        "Photography",
      ],
      epics: [
        {
          title: "Hackathon 2023",
          organization: "Tech University",
          dateRange: "15 March, 2023 – 17 March, 2023",
          theme: "AI/ML",
          teams: 50,
          rounds: 3,
          judges: 8,
          badge: "1st Place",
          color: "#10b981",
        },
        {
          title: "CodeFest 2022",
          organization: "Developer Community",
          dateRange: "10 June, 2022 – 12 June, 2022",
          theme: "Web Development",
          teams: 30,
          rounds: 2,
          judges: 5,
          badge: "Runner Up",
          color: "#3b82f6",
        },
      ],
      competitions: [
        {
          title: "Hackathon 2023",
          organization: "Tech University",
          dateRange: "15 March, 2023 – 17 March, 2023",
          category: "Coding",
          participants: 150,
          rounds: 3,
          judges: 8,
          prize: "$5,000",
          position: "1st Place",
          color: "#10b981",
        },
        {
          title: "Design Challenge",
          organization: "Creative Studio",
          dateRange: "10 June, 2023 – 12 June, 2023",
          category: "Design",
          participants: 80,
          rounds: 2,
          judges: 5,
          prize: "Trophy + $2,000",
          position: "Runner Up",
          color: "#3b82f6",
        },
        {
          title: "Business Plan Competition",
          organization: "Entrepreneurship Hub",
          dateRange: "5 September, 2023 – 7 September, 2023",
          category: "Business",
          participants: 60,
          rounds: 4,
          judges: 6,
          prize: "$10,000",
          position: "3rd Place",
          color: "#f59e0b",
        },
      ],
      highlights: [
        {
          title: "Published Research Paper",
          description:
            "Co-authored a paper on 'Machine Learning in Web Development' published in IEEE Conference 2023",
          type: "achievement",
          date: "March 2023",
          icon: "📄",
        },
        {
          title: "Open Source Contributor",
          description:
            "Contributed to 15+ open source projects with 500+ GitHub stars across repositories",
          type: "achievement",
          date: "2022 - Present",
          icon: "⭐",
        },
        {
          title: "Conference Speaker",
          description:
            "Spoke at ReactConf 2023 about 'Building Scalable React Applications'",
          type: "achievement",
          date: "October 2023",
          icon: "🎤",
        },
        {
          title: "AWS Certified",
          description:
            "Achieved AWS Solutions Architect Associate certification",
          type: "certification",
          date: "August 2023",
          icon: "🏆",
        },
      ],
    });
  };

  const handleProfileChange = (field: keyof Profile, value: string) => {
    setFormData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          title: "",
          organization: "",
          location: "",
          start: "",
          end: "",
          logoUrl: "",
          summary: "",
        },
      ],
    }));
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: "", value: 0 }],
    }));
  };

  const updateSkill = (
    index: number,
    field: keyof SkillStat,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { platform: "website", url: "" }],
    }));
  };

  const updateSocial = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.map((social, i) =>
        i === index ? { ...social, [field]: value } : social
      ),
    }));
  };

  const removeSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
  };

  const addEndorsement = () => {
    setFormData((prev) => ({
      ...prev,
      endorsements: [
        ...prev.endorsements,
        {
          name: "",
          title: "",
          avatarUrl: "",
          text: "",
          keywords: [],
        },
      ],
    }));
  };

  const updateEndorsement = (
    index: number,
    field: keyof Endorsement,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      endorsements: prev.endorsements.map((endorsement, i) =>
        i === index ? { ...endorsement, [field]: value } : endorsement
      ),
    }));
  };

  const removeEndorsement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      endorsements: prev.endorsements.filter((_, i) => i !== index),
    }));
  };

  const addInterest = (interest: string) => {
    if (interest.trim() && !formData.interests.includes(interest.trim())) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest.trim()],
      }));
    }
  };

  const removeInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-assets")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("profile-assets")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleFileUpload = async (
    file: File,
    type: "avatar" | "cover",
    experienceIndex?: number,
    endorsementIndex?: number
  ) => {
    try {
      // Create unique upload key for tracking
      const uploadKey =
        experienceIndex !== undefined
          ? `exp-${experienceIndex}`
          : endorsementIndex !== undefined
          ? `end-${endorsementIndex}`
          : type;

      setUploading((prev) => ({ ...prev, [uploadKey]: true }));

      let path = "profiles";
      if (experienceIndex !== undefined) {
        path = `experiences/${experienceIndex}`;
      } else if (endorsementIndex !== undefined) {
        path = `endorsements/${endorsementIndex}`;
      }

      const publicUrl = await uploadFile(file, path);

      if (type === "avatar") {
        if (experienceIndex !== undefined) {
          updateExperience(experienceIndex, "logoUrl", publicUrl);
        } else if (endorsementIndex !== undefined) {
          updateEndorsement(endorsementIndex, "avatarUrl", publicUrl);
        } else {
          handleProfileChange("avatarUrl", publicUrl);
        }
      } else if (type === "cover") {
        handleProfileChange("coverImageUrl", publicUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      const uploadKey =
        experienceIndex !== undefined
          ? `exp-${experienceIndex}`
          : endorsementIndex !== undefined
          ? `end-${endorsementIndex}`
          : type;
      setUploading((prev) => ({ ...prev, [uploadKey]: false }));
    }
  };

  const FileUploadButton = ({
    type,
    currentUrl,
    onUpload,
    experienceIndex,
    endorsementIndex,
    label,
  }: {
    type: "avatar" | "cover";
    currentUrl?: string;
    onUpload: (file: File) => void;
    experienceIndex?: number;
    endorsementIndex?: number;
    label: string;
  }) => {
    const uploadKey =
      experienceIndex !== undefined
        ? `exp-${experienceIndex}`
        : endorsementIndex !== undefined
        ? `end-${endorsementIndex}`
        : type;

    const isUploading = uploading[uploadKey];

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
            }}
            className="hidden"
            id={`file-upload-${uploadKey}`}
            disabled={isUploading}
          />
          <label
            htmlFor={`file-upload-${uploadKey}`}
            className={`flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Upload className="w-4 h-4" />
            {isUploading ? "Uploading..." : "Upload Image"}
          </label>
          {currentUrl && !isUploading && (
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">Uploaded</span>
            </div>
          )}
        </div>
        {currentUrl && (
          <div className="mt-2">
            <img
              src={currentUrl}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-md border"
            />
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            name: formData.profile.name,
            college: formData.profile.college,
            headline: formData.profile.headline,
            bio: formData.profile.bio,
            cover_image_url: formData.profile.coverImageUrl,
            avatar_url: formData.profile.avatarUrl,
          },
        ])
        .select()
        .single();

      if (profileError) throw profileError;

      const profileId = profile.id;

      // Create experiences
      if (formData.experiences.length > 0) {
        const { error: expError } = await supabase.from("experiences").insert(
          formData.experiences.map((exp) => ({
            profile_id: profileId,
            title: exp.title,
            organization: exp.organization,
            location: exp.location,
            start_date: exp.start,
            end_date: exp.end,
            logo_url: exp.logoUrl,
            summary: exp.summary,
          }))
        );

        if (expError) throw expError;
      }

      // Create skills
      if (formData.skills.length > 0) {
        const { error: skillsError } = await supabase.from("skills").insert(
          formData.skills.map((skill) => ({
            profile_id: profileId,
            name: skill.name,
            value: skill.value,
          }))
        );

        if (skillsError) throw skillsError;
      }

      // Create social links
      if (formData.socials.length > 0) {
        const { error: socialsError } = await supabase
          .from("social_links")
          .insert(
            formData.socials.map((social) => ({
              profile_id: profileId,
              platform: social.platform,
              url: social.url,
            }))
          );

        if (socialsError) throw socialsError;
      }

      // Create endorsements
      if (formData.endorsements.length > 0) {
        const { error: endorsementsError } = await supabase
          .from("endorsements")
          .insert(
            formData.endorsements.map((endorsement) => ({
              profile_id: profileId,
              name: endorsement.name,
              title: endorsement.title,
              avatar_url: endorsement.avatarUrl,
              text: endorsement.text,
              keywords: endorsement.keywords,
            }))
          );

        if (endorsementsError) throw endorsementsError;
      }

      // Create epics
      if (formData.epics.length > 0) {
        const { error: epicsError } = await supabase.from("epics").insert(
          formData.epics.map((epic) => ({
            profile_id: profileId,
            title: epic.title,
            organization: epic.organization,
            date_range: epic.dateRange,
            theme: epic.theme,
            teams: epic.teams,
            rounds: epic.rounds,
            judges: epic.judges,
            badge: epic.badge,
            color: epic.color,
          }))
        );

        if (epicsError) throw epicsError;
      }

      // Create competitions
      if (formData.competitions.length > 0) {
        const { error: competitionsError } = await supabase
          .from("competitions")
          .insert(
            formData.competitions.map((competition) => ({
              profile_id: profileId,
              title: competition.title,
              organization: competition.organization,
              date_range: competition.dateRange,
              category: competition.category,
              participants: competition.participants,
              rounds: competition.rounds,
              judges: competition.judges,
              prize: competition.prize,
              position: competition.position,
              color: competition.color,
            }))
          );

        if (competitionsError) throw competitionsError;
      }

      // Create highlights
      if (formData.highlights.length > 0) {
        const { error: highlightsError } = await supabase
          .from("highlights")
          .insert(
            formData.highlights.map((highlight) => ({
              profile_id: profileId,
              title: highlight.title,
              description: highlight.description,
              type: highlight.type,
              date: highlight.date,
              icon: highlight.icon,
            }))
          );

        if (highlightsError) throw highlightsError;
      }

      // Create interests
      if (formData.interests.length > 0) {
        const { error: interestsError } = await supabase
          .from("interests")
          .insert(
            formData.interests.map((interest) => ({
              profile_id: profileId,
              name: interest,
            }))
          );

        if (interestsError) throw interestsError;
      }

      // Show success message with profile URL
      const profileUrl = `${window.location.origin}/?id=${profileId}`;
      alert(`Profile created successfully! Your profile URL is: ${profileUrl}`);
      navigate(`/?id=${profileId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Add New Student Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center">
              <Button
                type="button"
                onClick={fillSampleData}
                variant="outline"
                className="mr-4"
              >
                🧪 Fill Sample Data
              </Button>
              <Button
                type="button"
                onClick={() => setFormData(initialFormData)}
                variant="ghost"
              >
                🗑️ Clear Form
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                  {error}
                </div>
              )}

              {/* Profile Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.profile.name}
                      onChange={(e) =>
                        handleProfileChange("name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="college">College</Label>
                    <Input
                      id="college"
                      value={formData.profile.college}
                      onChange={(e) =>
                        handleProfileChange("college", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="headline">Headline</Label>
                    <Input
                      id="headline"
                      value={formData.profile.headline}
                      onChange={(e) =>
                        handleProfileChange("headline", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <FileUploadButton
                      type="avatar"
                      currentUrl={formData.profile.avatarUrl}
                      onUpload={(file) => handleFileUpload(file, "avatar")}
                      label="Avatar Image"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FileUploadButton
                      type="cover"
                      currentUrl={formData.profile.coverImageUrl}
                      onUpload={(file) => handleFileUpload(file, "cover")}
                      label="Cover Image"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.profile.bio}
                      onChange={(e) =>
                        handleProfileChange("bio", e.target.value)
                      }
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Experiences */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Experiences</h3>
                  <Button
                    type="button"
                    onClick={addExperience}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
                {formData.experiences.map((exp, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Experience {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => removeExperience(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title *</Label>
                        <Input
                          value={exp.title}
                          onChange={(e) =>
                            updateExperience(index, "title", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Organization *</Label>
                        <Input
                          value={exp.organization}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "organization",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input
                          value={exp.location}
                          onChange={(e) =>
                            updateExperience(index, "location", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label>Start Date *</Label>
                        <Input
                          type="date"
                          value={exp.start}
                          onChange={(e) =>
                            updateExperience(index, "start", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={exp.end}
                          onChange={(e) =>
                            updateExperience(index, "end", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <FileUploadButton
                          type="avatar"
                          currentUrl={exp.logoUrl}
                          onUpload={(file) =>
                            handleFileUpload(file, "avatar", index)
                          }
                          experienceIndex={index}
                          label="Company Logo"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Summary</Label>
                        <Textarea
                          value={exp.summary}
                          onChange={(e) =>
                            updateExperience(index, "summary", e.target.value)
                          }
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  <Button
                    type="button"
                    onClick={addSkill}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </div>
                {formData.skills.map((skill, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Skill {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => removeSkill(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Skill Name *</Label>
                        <Input
                          value={skill.name}
                          onChange={(e) =>
                            updateSkill(index, "name", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Value (0-100) *</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={skill.value}
                          onChange={(e) =>
                            updateSkill(
                              index,
                              "value",
                              parseInt(e.target.value) || 0
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Social Links</h3>
                  <Button
                    type="button"
                    onClick={addSocial}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Social Link
                  </Button>
                </div>
                {formData.socials.map((social, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Social Link {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => removeSocial(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Platform *</Label>
                        <select
                          value={social.platform}
                          onChange={(e) =>
                            updateSocial(index, "platform", e.target.value)
                          }
                          className="w-full p-2 border border-input rounded-md"
                          required
                        >
                          <option value="website">Website</option>
                          <option value="facebook">Facebook</option>
                          <option value="twitter">Twitter</option>
                          <option value="instagram">Instagram</option>
                          <option value="youtube">YouTube</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="github">GitHub</option>
                          <option value="x">X (Twitter)</option>
                        </select>
                      </div>
                      <div>
                        <Label>URL *</Label>
                        <Input
                          type="url"
                          value={social.url}
                          onChange={(e) =>
                            updateSocial(index, "url", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Endorsements */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Endorsements</h3>
                  <Button
                    type="button"
                    onClick={addEndorsement}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Endorsement
                  </Button>
                </div>
                {formData.endorsements.map((endorsement, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Endorsement {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => removeEndorsement(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Name *</Label>
                        <Input
                          value={endorsement.name}
                          onChange={(e) =>
                            updateEndorsement(index, "name", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={endorsement.title}
                          onChange={(e) =>
                            updateEndorsement(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <FileUploadButton
                          type="avatar"
                          currentUrl={endorsement.avatarUrl}
                          onUpload={(file) =>
                            handleFileUpload(file, "avatar", undefined, index)
                          }
                          endorsementIndex={index}
                          label="Endorser Avatar"
                        />
                      </div>
                      <div>
                        <Label>Text *</Label>
                        <Textarea
                          value={endorsement.text}
                          onChange={(e) =>
                            updateEndorsement(index, "text", e.target.value)
                          }
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Epics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Epics</h3>
                  <Button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        epics: [
                          ...prev.epics,
                          {
                            title: "",
                            organization: "",
                            dateRange: "",
                            theme: "",
                            teams: 0,
                            rounds: 0,
                            judges: 0,
                            badge: "",
                            color: "#3b82f6",
                          },
                        ],
                      }));
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Epic
                  </Button>
                </div>
                {formData.epics.map((epic, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Epic {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            epics: prev.epics.filter((_, i) => i !== index),
                          }));
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title *</Label>
                        <Input
                          value={epic.title}
                          onChange={(e) => {
                            const newEpics = [...formData.epics];
                            newEpics[index] = {
                              ...epic,
                              title: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              epics: newEpics,
                            }));
                          }}
                          required
                        />
                      </div>
                      <div>
                        <Label>Organization *</Label>
                        <Input
                          value={epic.organization}
                          onChange={(e) => {
                            const newEpics = [...formData.epics];
                            newEpics[index] = {
                              ...epic,
                              organization: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              epics: newEpics,
                            }));
                          }}
                          required
                        />
                      </div>
                      <div>
                        <Label>Date Range *</Label>
                        <Input
                          value={epic.dateRange}
                          onChange={(e) => {
                            const newEpics = [...formData.epics];
                            newEpics[index] = {
                              ...epic,
                              dateRange: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              epics: newEpics,
                            }));
                          }}
                          placeholder="e.g., 22 June, 2021 – 31 July, 2021"
                          required
                        />
                      </div>
                      <div>
                        <Label>Theme *</Label>
                        <Input
                          value={epic.theme}
                          onChange={(e) => {
                            const newEpics = [...formData.epics];
                            newEpics[index] = {
                              ...epic,
                              theme: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              epics: newEpics,
                            }));
                          }}
                          placeholder="e.g., Management, Cultural"
                          required
                        />
                      </div>
                      <div>
                        <Label>Teams</Label>
                        <Input
                          type="number"
                          min="0"
                          value={epic.teams}
                          onChange={(e) => {
                            const newEpics = [...formData.epics];
                            newEpics[index] = {
                              ...epic,
                              teams: parseInt(e.target.value) || 0,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              epics: newEpics,
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Rounds</Label>
                        <Input
                          type="number"
                          min="0"
                          value={epic.rounds}
                          onChange={(e) => {
                            const newEpics = [...formData.epics];
                            newEpics[index] = {
                              ...epic,
                              rounds: parseInt(e.target.value) || 0,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              epics: newEpics,
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Judges</Label>
                        <Input
                          type="number"
                          min="0"
                          value={epic.judges}
                          onChange={(e) => {
                            const newEpics = [...formData.epics];
                            newEpics[index] = {
                              ...epic,
                              judges: parseInt(e.target.value) || 0,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              epics: newEpics,
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Badge (Optional)</Label>
                        <Input
                          value={epic.badge || ""}
                          onChange={(e) => {
                            const newEpics = [...formData.epics];
                            newEpics[index] = {
                              ...epic,
                              badge: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              epics: newEpics,
                            }));
                          }}
                          placeholder="e.g., 1st Place, Runner Up"
                        />
                      </div>
                      <div>
                        <Label>Color</Label>
                        <Input
                          type="color"
                          value={epic.color}
                          onChange={(e) => {
                            const newEpics = [...formData.epics];
                            newEpics[index] = {
                              ...epic,
                              color: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              epics: newEpics,
                            }));
                          }}
                          className="w-full h-10"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Competitions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Competitions</h3>
                  <Button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        competitions: [
                          ...prev.competitions,
                          {
                            title: "",
                            organization: "",
                            dateRange: "",
                            category: "",
                            participants: 0,
                            rounds: 0,
                            judges: 0,
                            prize: "",
                            position: "",
                            color: "#3b82f6",
                          },
                        ],
                      }));
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Competition
                  </Button>
                </div>
                {formData.competitions.map((competition, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Competition {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            competitions: prev.competitions.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title *</Label>
                        <Input
                          value={competition.title}
                          onChange={(e) => {
                            const newCompetitions = [...formData.competitions];
                            newCompetitions[index] = {
                              ...competition,
                              title: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              competitions: newCompetitions,
                            }));
                          }}
                          required
                        />
                      </div>
                      <div>
                        <Label>Organization *</Label>
                        <Input
                          value={competition.organization}
                          onChange={(e) => {
                            const newCompetitions = [...formData.competitions];
                            newCompetitions[index] = {
                              ...competition,
                              organization: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              competitions: newCompetitions,
                            }));
                          }}
                          required
                        />
                      </div>
                      <div>
                        <Label>Date Range *</Label>
                        <Input
                          value={competition.dateRange}
                          onChange={(e) => {
                            const newCompetitions = [...formData.competitions];
                            newCompetitions[index] = {
                              ...competition,
                              dateRange: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              competitions: newCompetitions,
                            }));
                          }}
                          placeholder="e.g., 15 March, 2023 – 17 March, 2023"
                          required
                        />
                      </div>
                      <div>
                        <Label>Category *</Label>
                        <Input
                          value={competition.category}
                          onChange={(e) => {
                            const newCompetitions = [...formData.competitions];
                            newCompetitions[index] = {
                              ...competition,
                              category: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              competitions: newCompetitions,
                            }));
                          }}
                          placeholder="e.g., Coding, Design, Business"
                          required
                        />
                      </div>
                      <div>
                        <Label>Participants</Label>
                        <Input
                          type="number"
                          min="0"
                          value={competition.participants}
                          onChange={(e) => {
                            const newCompetitions = [...formData.competitions];
                            newCompetitions[index] = {
                              ...competition,
                              participants: parseInt(e.target.value) || 0,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              competitions: newCompetitions,
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Rounds</Label>
                        <Input
                          type="number"
                          min="0"
                          value={competition.rounds}
                          onChange={(e) => {
                            const newCompetitions = [...formData.competitions];
                            newCompetitions[index] = {
                              ...competition,
                              rounds: parseInt(e.target.value) || 0,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              competitions: newCompetitions,
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Judges</Label>
                        <Input
                          type="number"
                          min="0"
                          value={competition.judges}
                          onChange={(e) => {
                            const newCompetitions = [...formData.competitions];
                            newCompetitions[index] = {
                              ...competition,
                              judges: parseInt(e.target.value) || 0,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              competitions: newCompetitions,
                            }));
                          }}
                        />
                      </div>
                      <div>
                        <Label>Prize (Optional)</Label>
                        <Input
                          value={competition.prize || ""}
                          onChange={(e) => {
                            const newCompetitions = [...formData.competitions];
                            newCompetitions[index] = {
                              ...competition,
                              prize: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              competitions: newCompetitions,
                            }));
                          }}
                          placeholder="e.g., $5,000, Trophy"
                        />
                      </div>
                      <div>
                        <Label>Position (Optional)</Label>
                        <Input
                          value={competition.position || ""}
                          onChange={(e) => {
                            const newCompetitions = [...formData.competitions];
                            newCompetitions[index] = {
                              ...competition,
                              position: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              competitions: newCompetitions,
                            }));
                          }}
                          placeholder="e.g., 1st Place, Runner Up"
                        />
                      </div>
                      <div>
                        <Label>Color</Label>
                        <Input
                          type="color"
                          value={competition.color}
                          onChange={(e) => {
                            const newCompetitions = [...formData.competitions];
                            newCompetitions[index] = {
                              ...competition,
                              color: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              competitions: newCompetitions,
                            }));
                          }}
                          className="w-full h-10"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Highlights</h3>
                  <Button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        highlights: [
                          ...prev.highlights,
                          {
                            title: "",
                            description: "",
                            type: "achievement",
                            date: "",
                            icon: "🏆",
                          },
                        ],
                      }));
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Highlight
                  </Button>
                </div>
                {formData.highlights.map((highlight, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Highlight {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            highlights: prev.highlights.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title *</Label>
                        <Input
                          value={highlight.title}
                          onChange={(e) => {
                            const newHighlights = [...formData.highlights];
                            newHighlights[index] = {
                              ...highlight,
                              title: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              highlights: newHighlights,
                            }));
                          }}
                          required
                        />
                      </div>
                      <div>
                        <Label>Type</Label>
                        <select
                          value={highlight.type}
                          onChange={(e) => {
                            const newHighlights = [...formData.highlights];
                            newHighlights[index] = {
                              ...highlight,
                              type: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              highlights: newHighlights,
                            }));
                          }}
                          className="w-full p-2 border border-input rounded-md"
                        >
                          <option value="achievement">Achievement</option>
                          <option value="endorsement">Endorsement</option>
                          <option value="experience">Experience</option>
                          <option value="skill">Skill</option>
                          <option value="award">Award</option>
                          <option value="certification">Certification</option>
                        </select>
                      </div>
                      <div>
                        <Label>Date</Label>
                        <Input
                          value={highlight.date}
                          onChange={(e) => {
                            const newHighlights = [...formData.highlights];
                            newHighlights[index] = {
                              ...highlight,
                              date: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              highlights: newHighlights,
                            }));
                          }}
                          placeholder="e.g., July 2021, 2024"
                        />
                      </div>
                      <div>
                        <Label>Icon</Label>
                        <Input
                          value={highlight.icon}
                          onChange={(e) => {
                            const newHighlights = [...formData.highlights];
                            newHighlights[index] = {
                              ...highlight,
                              icon: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              highlights: newHighlights,
                            }));
                          }}
                          placeholder="🏆, ⭐, 👑, 🎤"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Description *</Label>
                        <Textarea
                          value={highlight.description}
                          onChange={(e) => {
                            const newHighlights = [...formData.highlights];
                            newHighlights[index] = {
                              ...highlight,
                              description: e.target.value,
                            };
                            setFormData((prev) => ({
                              ...prev,
                              highlights: newHighlights,
                            }));
                          }}
                          rows={2}
                          placeholder="Describe this highlight and its significance"
                          required
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Interests</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.interests.map((interest, index) => (
                    <Badge
                      key={index}
                      className="flex items-center gap-1 bg-secondary text-secondary-foreground"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => removeInterest(interest)}
                        className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add interest"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addInterest(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector(
                        'input[placeholder="Add interest"]'
                      ) as HTMLInputElement;
                      if (input) {
                        addInterest(input.value);
                        input.value = "";
                      }
                    }}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating Profile..." : "Create Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
