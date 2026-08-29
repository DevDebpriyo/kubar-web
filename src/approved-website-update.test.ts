import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path);
const readText = (path: string) => readFileSync(path, "utf8");
const sha256 = (value: Buffer | string) =>
  createHash("sha256").update(value).digest("hex");

const protectedFileHashes: Record<string, string> = {
  "src/components/home/FloatingCards.tsx": "510371e05c817b8d32d2e3eab45d759c7919af0e7f3a566a81ff7353e7943076",
  "src/components/home/HeroBackground.tsx": "9d43ba8bdc464ecfd14029886fb74a79c2fe43dc70dde23aaa905c6584d6ee07",
  "src/components/home/VisualStorySection.tsx": "b98e7165fe81c50931bc97449a1d1228ae690b27e53a657f682aeaeb1b467e33",
  // User-authorized Agentation exception: tighten NavDhan section spacing.
  "src/components/home/VisualStorySection.css": "82dfa9d1b466895d181dc529ab1382cfeddc18471c619d63d3846bd7ddb01f64",
  // User-authorized exception: revise marquee items and remove its pause control.
  "src/components/home/PartnerMarquee.tsx": "ddfff892932312fc87a9c939d4e0cef8f4057d86e576ee4f39112748cf06aa66",
  // User-authorized Agentation exception: rebalance partner logo sizing and spacing.
  "src/components/home/EcosystemPartners.tsx": "c9ed7ef899868bdca15827642f47b950aca01d2b0fe9abac9856db183376c850",
  "src/components/home/BuiltForTrustSection.tsx": "c8e00b7eb3a8f801450ac4ab50b22918247144d4d5c970776886c6f2fe5b9d5b",
  // User-authorized Agentation exception: tighten the trust section spacing.
  "src/components/home/BuiltForTrustSection.css": "de77b4640410394b8a7b92a75bd778ee74e45067982fc7f5bd8806099b9bd762",
  // User-authorized Agentation exceptions: remove Recognition/Traction and tighten Work with us cards.
  "src/app/about/page.tsx": "c3d317b9e34fc13660ce6b5d5f107729f5656b847fbe4e59beb56f62cba5b2f6",
  "src/app/about/layout.tsx": "c76cab8755a8e063fa9c32d1bde364be69d6b22cd27055c0aec24b278b9dbd5d",
  "src/app/about/about.css": "5504ae1f49d8d65d53fd65d1b4bbca7b8abeadf08bf32299d8f6ee4ed0826c1f",
  "src/components/about/AboutHeroIllustration.tsx": "6b3daad72784dcf8a51c3e8ac431681ab0bbfcce239ecaf835ebef26e2361342",
  "src/components/about/RoadmapSection.tsx": "c01e4d5ced0444520f582776af05de5f39bfa74f63ae00f42ea47640924f4211",
  // User-authorized Agentation exception: remove the Privacy Legal overline.
  "src/app/privacy/page.tsx": "19dda40b6e35916d3c189fde990638a75e63f0dd1146b0ead526965d20e40184",
  "src/app/api/contact/route.ts": "65eb84750ee9ba1fbed594a79ff81cc750d8347e2b0acf61e70721ca2b617b3e",
  "src/lib/contact-queue.ts": "cb97e66ee4ab7843b993acb43bf876ceeb0bf18647e136de768a2902fcd1c1eb",
  "workers/contact-email/src/index.ts": "2a8d54b1c516e242b6087ac982c4f3134200bf05ebfe5be435ecc6b55eb26800",
  "workers/contact-email/wrangler.jsonc": "7b4dfedcbb6f3965d3b56570663680a8562f1134d215c2e6201a3ef66f452d7c",
  "src/app/fonts/plus-jakarta-sans-latin.woff2": "cd8db90cd950e26bc8761f65d323588bd5cd112d326d6d322bc7c8ea86771215",
  "public/advisors/amit.png": "a2b6d72037008150826f70707590ec65e7ce67d2ccf3fc2793222636a5e84f36",
  "public/advisors/debayan.png": "3b08958f1944f38046b3c247d81ec200e924e0e3a9e41b2415048731ea7b98f9",
  "public/advisors/shridhar.png": "70ff8138b294e5049252f392559dc44bd9df491935c02b38b276d23ee6461cb9",
  "public/advisors/tushar.png": "7d0e05ba23405bb9c82b550f849701eaa149e2be770c35ac9a092e43e4e4a0af",
  "public/bft_logos/dpdp.png": "7e9d6fb21b090cee0d9d1c9ce63ae9b0618d85ffc9596395223185cd97f0bcf6",
  "public/bft_logos/face.png": "9c85273d39ec299164472b8a0db9041dca80c0521f512b731081343c048684de",
  "public/bft_logos/finglobe.png": "59d53b330897da03ecfc53474fa802d263f8440f639cc554f89b249b49d7b73b",
  "public/bft_logos/finvision.png": "4a9dd770bc5321c5475cc4a5cccf2624b49196e3cebc7afcf0d53339fa7cb1de",
  "public/bft_logos/rbi.png": "262a9fdfe3288ade193077399782336c8fab461b713da126d69c57d8a2deb6b1",
  "public/logo.png": "43331820d8efb9e73195af6b034a336f70bfdc82598c5a6a6e70e64a50bb3b5b",
  "public/logos/amplitude.png": "ddb95b4fe60da39df92d8096c11085bef215ec237ec02f88efb01630f44def51",
  "public/logos/cloudflare.svg": "c9ec1d5d5e4b0924666756a70179395c26b010372f8d7eec3539575281cebf1b",
  "public/logos/eleven.png": "0c9a10a561d241f03fc10403d89aa14c354a27fd35ca560e2bbcf41f66a8db93",
  "public/logos/google.png": "ea62323dd811a2ad1e5281b6e856bb24a9826fcfa9995ec5ed1e0ed5c20bf32c",
  "public/logos/intel.png": "b3c04e11ddf60b34474b975dfe65ddcf19efef6a72fdfa4dc192400c1d2debc2",
  "public/logos/microsoft.png": "1367a599e6a27c0b8e94e47a3d44e24a7f42b9b253dc77e4bf29966f13e64107",
  "public/logos/nvidia.png": "55dff92d52373ac7c462861dc1e1687f1eb77061ec33c900286956b0ff823801",
  "public/logos/openai.png": "44fb1d54db00a32e064266f5a9ce46e6a08b4d0d5bba2c174db40b617b543530",
  "public/logos/pba.png": "08cbd97ec9cb3c3baa9a24c7127c2a132ff97d9ee42374388c2ef8ef36f7c11c",
  "public/logos/perplexity.png": "786b32ae798a6f4d37842ae88d225e5eb5c536d5138a0799b2c2496ecaff845a",
  "public/logos/sarvam.svg": "93aacfbd08114a111f0508a2507518be8deaac7b7cd4071b1c0fcd751a97e80a",
  "public/logos/uniswap.png": "355fa67b4ffdcdd7ab165b1b070313f88d645a6fc7cf1b9e0bee9b98d74b5326",
  "public/nd_logo.png": "41407e29eb5fa1478a75052ac3d561557a9ee2d5d6544d605f1a1532b23b75ee",
  "public/team/divyesh.png": "2e9863552140e7c94a45858c3277eaa0b739740afc27c5b5b80ee8a4c01e56f7",
  "public/team/kavish.png": "32830e1c0913b76aea2ba8eb89c615294dec596a1a85372c967b9027a16bc183",
  "public/team/keshav.png": "8419ae4e6e3f1712da2f786a87e1605291d489c9b9d12a764fd0d57f1389696d",
  "public/team/manchit.png": "0cecc070fa271c27c51a56c47da348e83048c6bfcad0df440bb3f96545ec8911",
  "public/team/rayansh.png": "5bab4b77be817eb345b71512071d28ef779869276efa1f70347f78eb6b52cc36",
  "public/team/vaibhav.jpg": "c54d8a21833851b010e2aeb1f66e3bab04f91a95b2d69080a462f14088b175de",
};

const protectedTranslationHashes: Record<string, string> = {
  cards: "ba9ffeb1c1de8460a87f11c0f829c65a5bef918a66adf7cebca297e237d741e1",
  visual_story: "bdaed167dbdd40958942bf0b91ab2dad753418d901c6660ce9bdb89ef74b337f",
  // User-authorized exception: revise the awards marquee copy.
  marquee: "c084e45fbc54a9e169b6a235c7a87c6de951cc76af2053772e04b57ead9349ba",
  built_for_trust: "80d3b12686e0df6989f1079d9680047b143968d40ddcab723d7c07816433635b",
  "built_by.tagline": "09dd389197be718e641e83f710210f9f05f47d51cd2fbda839dfcf222139d8f4",
  about: "c21583bb0a90d9580c24fa76d41fdb11322bd54035df039d75496494350b6655",
  team: "35ae6a299613bd3c58922b3dcf001b7585dbfbbd3d6e1ad55deea8e3a7b6ae12",
  "contact.form": "80339b06e9a78a58e49709ee302e7ca41c216979fc93d55558c9440164b36a84",
  "contact.contact_info": "538690c893a2f69ffce5728cb5754993d4906d634333d877ed6402c5bff96105",
};

function getPath(value: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[key];
  }, value);
}

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

describe("approved website source preservation", () => {
  it("keeps every protected source file and asset byte-for-byte intact", () => {
    for (const [path, expectedHash] of Object.entries(protectedFileHashes)) {
      expect(sha256(read(path)), path).toBe(expectedHash);
    }
  });

  it("keeps every protected translation subtree intact", () => {
    const messages = JSON.parse(readText("messages/en.json")) as unknown;

    for (const [path, expectedHash] of Object.entries(protectedTranslationHashes)) {
      expect(sha256(stableJson(getPath(messages, path))), path).toBe(expectedHash);
    }
  });
});

describe("approved website information architecture", () => {
  const home = readText("src/app/page.tsx");
  const navdhan = readText("src/app/products/navdhan/page.tsx");
  const protocol = readText("src/app/products/kubar-protocol/page.tsx");
  const navbar = readText("src/components/layout/Navbar.tsx");
  const sitemap = readText("src/app/sitemap.ts");
  const allImplementationCopy = [
    readText("messages/en.json"),
    home,
    navdhan,
    protocol,
  ].join("\n");

  it("keeps the source Home hero and credibility components without the rejected artwork", () => {
    for (const component of [
      "HeroSection",
      "PartnerMarquee",
      "EcosystemPartners",
      "BuiltForTrustSection",
    ]) {
      expect(home).toContain(`<${component}`);
    }
    expect(home).not.toContain("VisualStorySection");
    expect(allImplementationCopy).not.toMatch(/One business context\. Two financing paths/i);
    expect(allImplementationCopy).not.toMatch(/How NavDhan is designed to work/i);
    expect(home.indexOf("<BuiltForTrustSection />")).toBeLessThan(
      home.indexOf("<NewBharatTagline />"),
    );
    expect(home.indexOf("<NewBharatTagline />")).toBeLessThan(
      home.indexOf("<EcosystemPartners />"),
    );
  });

  it("mounts the locked NavDhan journey once on NavDhan and preserves its anchor", () => {
    expect(navdhan.match(/<VisualStorySection\s*\/>/g)).toHaveLength(1);
    expect(readText("src/components/home/VisualStorySection.tsx")).toContain('id="story"');
    expect(readText("src/components/home/LegacyStoryRedirect.tsx")).toContain(
      'router.replace("/products/navdhan#story")',
    );
  });

  it("keeps the approved Protocol stages, route metadata, and sitemap entry", () => {
    const messages = JSON.parse(readText("messages/en.json")) as {
      protocol: { workflow: { stages: Record<string, { title: string; description: string }> } };
    };
    const expectedStages = [
      ["Begin with the trade commitment.", "Connect the order, counterparties and letter-of-credit context into a permissioned trade record."],
      ["Connect pre-shipment finance.", "A bank may provide packing credit in foreign currency (PCFC), subject to its assessment and requirements."],
      ["Link shipment evidence.", "Bring shipment events and external electronic bill-of-lading references into the record without assuming control of those documents."],
      ["Identify the accepted receivable.", "Documentary evidence alone is not an accepted receivable. Authoritative issuing-bank acceptance establishes the Accepted LC Receivable."],
      ["Connect eligible financing.", "Carry the accepted receivable and its verified context into an eligible funding workflow through the relevant regulated venue."],
      ["Settle through the bank.", "The bank executes the settlement waterfall: PCFC repayment and the exporter’s balance. Payment to the financier at maturity is a separate, later event."],
    ];

    expect(Object.values(messages.protocol.workflow.stages).map(({ title, description }) => [title, description])).toEqual(expectedStages);
    expect(readText("src/app/products/kubar-protocol/layout.tsx")).toContain(
      'path: "/products/kubar-protocol"',
    );
    expect(sitemap).toContain('"/products/kubar-protocol"');
    expect(protocol).toContain("<ProtocolJourney />");
  });

  it("links both sibling products in approved desktop and mobile menus", () => {
    expect(navbar).toContain('variant = "approved"');
    expect(navbar.match(/href: "\/products\/navdhan"/g)).toHaveLength(2);
    expect(navbar.match(/href: "\/products\/kubar-protocol"/g)).toHaveLength(2);
  });
});

describe("approved website source data contracts", () => {
  it("uses exactly the current Team roster, portraits, and available profile links", () => {
    const team = readText("src/app/team/page.tsx");
    const names = [...team.matchAll(/\n\s+name: "([^"]+)",/g)].map((match) => match[1]);
    expect(names).toEqual([
      "Vaibhav Sharma",
      "Rayansh Srivastava",
      "Keshav Dudani",
      "Manchit Sanan",
      "Divyesh Reddy",
      "Kavish Mahajan",
      "Debayan Gupta",
      "Amit Sagar",
      "Shridhar Sethuram",
      "Tushar Jaruhar",
    ]);

    for (const expected of [
      "/team/vaibhav.jpg",
      "/team/rayansh.png",
      "/team/keshav.png",
      "/team/manchit.png",
      "/team/divyesh.png",
      "/team/kavish.png",
      "/advisors/debayan.png",
      "/advisors/amit.png",
      "/advisors/shridhar.png",
      "/advisors/tushar.png",
      "https://www.linkedin.com/in/fenestbuc/",
      "https://www.linkedin.com/in/rayansh-srivastava-419951219/",
      "https://www.linkedin.com/in/keshav-dudani-617295251/",
      "https://www.linkedin.com/in/manchit-sanan-6b9705158/",
      "https://www.linkedin.com/in/divyesh-reddy/?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      "https://www.linkedin.com/in/koverner/",
    ]) {
      expect(team).toContain(expected);
    }
  });

  it("preserves the Contact form field, option, honeypot, and API contracts", () => {
    const contact = readText("src/app/contact/page.tsx");
    const fieldNames = [...contact.matchAll(/name="([^"]+)"/g)].map((match) => match[1]);
    const optionValues = [...contact.matchAll(/<option value="([^"]*)"/g)].map((match) => match[1]);

    expect(fieldNames).toEqual(["website", "fullName", "email", "phone", "companyName", "category"]);
    expect(optionValues).toEqual(["", "bank", "fintech", "nbfc", "b2b_marketplace", "b2b_platform", "erp", "other"]);
    expect(contact).toContain('fetch("/api/contact"');
    expect(contact).toContain('tabIndex={-1}');
    expect(contact).toContain('aria-hidden="true"');
  });

  it("retains the bounded Contact success cleanup without changing modal behavior", () => {
    const modal = readText("src/components/contact/ContactSuccessModal.tsx");
    expect(modal).toContain('event.key === "Escape"');
    expect(modal).toContain("previouslyFocused?.focus()");
    expect(modal).toContain('document.body.style.overflow = "hidden"');
    expect(modal).toContain("senderName ?");
    expect(modal).not.toContain("FloatingParticle");
    expect(modal).not.toContain("Sparkles");
  });
});
