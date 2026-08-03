"use client";

import Image from "next/image";

const partners = [
  { name: "Google", src: "/logos/google.png" },
  { name: "Nvidia", src: "/logos/nvidia.png" },
  { name: "Perplexity", src: "/logos/perplexity.png" },
  { name: "OpenAI", src: "/logos/openai.png" },
  { name: "Microsoft", src: "/logos/microsoft.png" },
  { name: "Intel", src: "/logos/intel.png" },
  { name: "Eleven Labs", src: "/logos/eleven.png" },
  { name: "Amplitude", src: "/logos/amplitude.png" },
  { name: "Polkadot Blockchain Academy", src: "/logos/pba.png" },
  { name: "Uniswap", src: "/logos/uniswap.png" },
];

export function EcosystemPartners() {
  const loopedPartners = [...partners, ...partners];

  return (
    <section
      aria-label="Ecosystem Partners"
      className="relative z-10 overflow-hidden pt-4 pb-16 sm:pt-8 sm:pb-24 bg-background transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="text-xl font-medium tracking-wide text-foreground/50 dark:text-white/50 uppercase">
          Our Ecosystem Partners
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,146,12,0.2) 28%, rgba(26,79,163,0.3) 52%, rgba(19,136,8,0.2) 74%, transparent 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(19,136,8,0.2) 28%, rgba(26,79,163,0.3) 52%, rgba(212,146,12,0.2) 74%, transparent 100%)",
          }}
        />
        
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="overflow-hidden py-10 sm:py-12">
          <div className="marquee-track flex w-max items-center gap-16 sm:gap-24">
            {loopedPartners.map((partner, index) => {
              const isWhiteAsset = [
                "Nvidia",
                "OpenAI",
                "Eleven Labs",
                "Perplexity",
                "Polkadot Blockchain Academy",
              ].includes(partner.name);

              return (
                <div
                  key={`${partner.name}-${index}`}
                  className={`group relative flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 ${
                    partner.name === "Microsoft" ? "-ml-6 -mr-2" : ""
                  } ${
                    isWhiteAsset
                      ? "brightness-0 dark:brightness-100 dark:invert-0"
                      : ""
                  }`}
                >
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={140}
                    height={60}
                    className={`w-auto object-contain ${
                      partner.name === "Microsoft"
                        ? "max-h-12 scale-[1.6]"
                        : partner.name === "OpenAI" || partner.name === "Nvidia"
                        ? "max-h-12 scale-[1.5]"
                        : "max-h-12"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
