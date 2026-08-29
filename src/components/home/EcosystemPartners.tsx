"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

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
  { name: "Sarvam", src: "/logos/sarvam.svg" },
  { name: "Cloudflare", src: "/logos/cloudflare.svg" },
];
const partnerLoopDurationSeconds = 36;

export function EcosystemPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "200px" });

  return (
    <section
      ref={sectionRef}
      aria-label="Technology programmes, grants and infrastructure support"
      className="relative z-10 overflow-hidden pt-4 pb-16 sm:pt-8 sm:pb-24"
      style={{
        background: "rgba(4, 4, 12, 0.98)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="text-xl font-medium tracking-wide text-white/50 uppercase">
          Technology Programmes, Grants &amp; Infrastructure Support
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
        
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[rgba(4,4,12,0.98)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[rgba(4,4,12,0.98)] to-transparent" />

        <div className="overflow-hidden py-10 sm:py-12">
          <div
            className="ecosystem-marquee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4920c]"
            aria-label="Programme and infrastructure partner logos"
            tabIndex={0}
          >
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className={`ecosystem-marquee__item group flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 opacity-60 hover:opacity-100 ${
                  partner.name === "Microsoft" ? "-ml-6 -mr-2" : ""
                } ${partner.name === "OpenAI" ? "invert opacity-80" : ""}`}
                style={{
                  animationDelay: `${-(partnerLoopDurationSeconds / partners.length) * index}s`,
                  animationPlayState: !isInView ? "paused" : undefined,
                }}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={140}
                  height={60}
                  sizes="140px"
                  className={`w-auto max-w-44 object-contain ${
                    partner.name === "Microsoft"
                      ? "max-h-12 scale-[1.6]"
                      : partner.name === "OpenAI" || partner.name === "Nvidia"
                      ? "max-h-12 scale-[1.5]"
                      : partner.name === "Cloudflare"
                      ? "h-12"
                      : "max-h-12"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
