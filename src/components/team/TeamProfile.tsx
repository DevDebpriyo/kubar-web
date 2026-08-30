import Image from "next/image";

export type TeamProfileData = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
};

export function TeamProfile({
  profile,
  variant = "team",
}: {
  profile: TeamProfileData;
  variant?: "team" | "advisor";
}) {
  return (
    <article className={`editorial-profile editorial-profile--${variant}`}>
      <div className="editorial-profile__portrait">
        <Image
          src={profile.image}
          alt={`${profile.name}, ${profile.role}`}
          width={192}
          height={192}
          loading="eager"
          sizes={
            variant === "team"
              ? "(max-width: 767px) 104px, 176px"
              : "(max-width: 767px) 88px, 112px"
          }
        />
      </div>
      <div className="editorial-profile__copy">
        <p className="editorial-profile__role">{profile.role}</p>
        <h3>{profile.name}</h3>
        <p className="editorial-profile__bio">{profile.bio}</p>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${profile.name} on LinkedIn (opens in a new tab)`}
        >
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
