import { ApprovedFooter } from "@/components/layout/ApprovedFooter";
import { Navbar } from "@/components/layout/Navbar";
import {
  OperatingPrinciple,
  type OperatingPrincipleData,
} from "@/components/team/OperatingPrinciple";
import {
  TeamProfile,
  type TeamProfileData,
} from "@/components/team/TeamProfile";
import "./team.css";

const disciplines = [
  "PRODUCT",
  "ENGINEERING",
  "APPLIED ML",
  "COMPLIANCE",
  "PARTNERSHIPS",
  "DESIGN",
] as const;

const principles: OperatingPrincipleData[] = [
  {
    number: "01",
    title: "Work from real commercial context.",
    body: "Start with orders, documents and operating data, not an abstract credit request.",
  },
  {
    number: "02",
    title: "Keep institutional authority explicit.",
    body: "Lenders, banks and regulated institutions retain their decisions, controls and settlement responsibilities.",
  },
  {
    number: "03",
    title: "Design the lifecycle, not a point solution.",
    body: "Connect financing intent to execution, repayment and settlement without replacing existing institutional systems.",
  },
];

const team: TeamProfileData[] = [
  {
    id: "vaibhav-sharma",
    name: "Vaibhav Sharma",
    role: "Founder",
    bio: "Built across digital assets, institutional tokenisation and financial infrastructure, informed by first-hand experience with family-run SMEs.",
    image: "/team/editorial/vaibhav.webp",
    linkedin: "https://www.linkedin.com/in/fenestbuc/",
  },
  {
    id: "rayansh-srivastava",
    name: "Rayansh Srivastava",
    role: "CTO",
    bio: "Builds Kubar’s AI and ML systems after wealth-tech work for European family offices and ML research at Samsung.",
    image: "/team/editorial/rayansh.webp",
    linkedin: "https://www.linkedin.com/in/rayansh-srivastava-419951219/",
  },
  {
    id: "keshav-dudani",
    name: "Keshav Dudani",
    role: "Founding ML Engineer",
    bio: "Builds backend and applied-ML systems across prediction and financial NLP, after commodity-trading deployments at five enterprises.",
    image: "/team/editorial/keshav.webp",
    linkedin: "https://www.linkedin.com/in/keshav-dudani-617295251/",
  },
  {
    id: "manchit-sanan",
    name: "Manchit Sanan",
    role: "Compliance Lead",
    bio: "Leads compliance and regulatory infrastructure, bringing 17+ years across enterprise IT, APIs and US healthcare.",
    image: "/team/editorial/manchit.webp",
    linkedin: "https://www.linkedin.com/in/manchit-sanan-6b9705158/",
  },
  {
    id: "divyesh-reddy",
    name: "Divyesh Reddy",
    role: "Partnerships Lead",
    bio: "Leads lender and ecosystem partnerships, with experience in buyer-risk intelligence and MSME credit analytics.",
    image: "/team/editorial/divyesh.webp",
    linkedin: "https://www.linkedin.com/in/divyesh-reddy/",
  },
  {
    id: "kavish-mahajan",
    name: "Kavish Mahajan",
    role: "Creative Director",
    bio: "Leads brand, product design and Kubar’s design systems after founding and scaling a design agency.",
    image: "/team/editorial/kavish.webp",
    linkedin: "https://www.linkedin.com/in/koverner/",
  },
];

const advisors: TeamProfileData[] = [
  {
    id: "debayan-gupta",
    name: "Debayan Gupta",
    role: "Professor, CS – MIT, Ashoka University",
    bio: "Advises on research-led technology choices and academic partnerships.",
    image: "/team/editorial/debayan.webp",
    linkedin: "https://www.linkedin.com/in/debayang/",
  },
  {
    id: "amit-sagar",
    name: "Amit Sagar",
    role: "Lead System Architect at Bank of England",
    bio: "Contributes system architecture and CBDC insight for secure infrastructure.",
    image: "/team/editorial/amit.webp",
    linkedin: "https://www.linkedin.com/in/amit-sagar-59286768/",
  },
  {
    id: "shridhar-sethuram",
    name: "Shridhar Sethuram",
    role: "Finance veteran, 25+ years in Private Equity",
    bio: "Brings long-term capital markets perspective to growth strategy.",
    image: "/team/editorial/shridhar.webp",
    linkedin: "https://www.linkedin.com/in/shridharsethuram/",
  },
  {
    id: "tushar-jaruhar",
    name: "Tushar Jaruhar",
    role: "Ex-Pricing Actuary at Zurich Insurance Co.",
    bio: "Advises on pricing discipline and insurance-linked risk thinking.",
    image: "/team/editorial/tushar.webp",
    linkedin: "https://www.linkedin.com/in/tushar-jaruhar-9362959/",
  },
];

export default function TeamPage() {
  return (
    <main className="team-main">
      <Navbar variant="approved" />

      <section className="team-editorial-hero" aria-labelledby="team-page-title">
        <div className="team-editorial-container team-editorial-hero__layout">
          <div className="team-editorial-hero__copy">
            <p className="team-editorial-eyebrow">KUBAR LABS / TEAM</p>
            <h1 id="team-page-title">
              The people building the rails between commerce and regulated
              capital.
            </h1>
            <p className="team-editorial-hero__description">
              A multidisciplinary team working across product, credit,
              compliance, applied ML, partnerships and design to build NavDhan
              and Kubar Protocol.
            </p>
            <p className="team-editorial-hero__parent-note">
              Kubar Labs is the parent company of NavDhan and Kubar Protocol.
            </p>
          </div>

          <aside className="discipline-index" aria-label="Team disciplines">
            <p className="discipline-index__label">
              SIX DISCIPLINES. ONE COMPANY.
            </p>
            <ol>
              {disciplines.map((discipline, index) => (
                <li key={discipline}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {discipline}
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section
        className="operating-principles"
        aria-labelledby="operating-principles-title"
      >
        <div className="team-editorial-container">
          <header className="team-editorial-section-header">
            <p className="team-editorial-eyebrow">HOW WE BUILD</p>
            <h2 id="operating-principles-title">
              Built for systems where context, authority and execution all
              matter.
            </h2>
            <p>
              Three principles guide how Kubar Labs builds across domestic
              credit and cross-border trade finance.
            </p>
          </header>
          <ol className="operating-principles__grid">
            {principles.map((principle) => (
              <OperatingPrinciple key={principle.number} principle={principle} />
            ))}
          </ol>
        </div>
      </section>

      <section className="editorial-people" aria-labelledby="team-section-title">
        <div className="team-editorial-container">
          <header className="team-editorial-section-header">
            <p className="team-editorial-eyebrow">THE TEAM</p>
            <h2 id="team-section-title">The team behind the systems.</h2>
            <p>
              Six people working across the disciplines required to connect
              commerce workflows with regulated capital.
            </p>
          </header>
          <ul className="editorial-profile-grid" aria-label="Kubar Labs team">
            {team.map((profile) => (
              <li key={profile.id}>
                <TeamProfile profile={profile} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="editorial-people editorial-people--advisors"
        aria-labelledby="advisory-board-title"
      >
        <div className="team-editorial-container">
          <header className="team-editorial-section-header">
            <p className="team-editorial-eyebrow">ADVISORY BOARD</p>
            <h2 id="advisory-board-title">
              Guidance where the systems get difficult.
            </h2>
            <p>
              Supporting Kubar Labs across financial infrastructure,
              technology, capital markets and risk.
            </p>
          </header>
          <ul
            className="editorial-profile-grid editorial-profile-grid--advisors"
            aria-label="Kubar Labs advisory board"
          >
            {advisors.map((profile) => (
              <li key={profile.id}>
                <TeamProfile profile={profile} variant="advisor" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="team-footer-wrap">
        <ApprovedFooter
          animateOnView={false}
          eyebrow="FOR PLATFORMS AND FINANCIAL INSTITUTIONS"
          title="Build the next chapter with us."
          description="Talk to Kubar Labs about NavDhan, Kubar Protocol or working with our team."
        />
      </div>
    </main>
  );
}
