"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

const partners = [
  { name: "Google", src: "/logos/google.png", visualScale: 0.8 },
  { name: "Nvidia", src: "/logos/nvidia.png", visualScale: 2.6 },
  { name: "Perplexity", src: "/logos/perplexity.png", visualScale: 1.08 },
  { name: "OpenAI", src: "/logos/openai.png", visualScale: 2.3 },
  { name: "Microsoft", src: "/logos/microsoft.png", visualScale: 1.6 },
  { name: "Intel", src: "/logos/intel.png", visualScale: 0.88 },
  { name: "Eleven Labs", src: "/logos/eleven.png", visualScale: 1.25 },
  { name: "Amplitude", src: "/logos/amplitude.png", visualScale: 1.05 },
  { name: "Polkadot Blockchain Academy", src: "/logos/pba.png", visualScale: 0.8 },
  { name: "Uniswap", src: "/logos/uniswap.png", visualScale: 0.86 },
  { name: "Sarvam", src: "/logos/sarvam.svg", visualScale: 0.92 },
  { name: "Cloudflare", src: "/logos/cloudflare.svg", visualScale: 0.8 },
];
const partnerLoopDurationSeconds = 36;

export function EcosystemPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "200px" });

  return (
    <section
      ref={sectionRef}
      aria-label="Technology programmes, grants and infrastructure support"
      className="relative z-10 overflow-hidden py-3 sm:py-4"
      style={{
        background: "rgba(4, 4, 12, 0.98)",
      }}
    >
      <div className="mx-auto mb-3 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-base font-medium uppercase tracking-wide text-white/50 sm:text-lg">
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

        <div className="overflow-hidden py-3">
          <div
            className="ecosystem-marquee focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4920c]"
            aria-label="Programme and infrastructure partner logos"
            tabIndex={0}
          >
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className={`ecosystem-marquee__item group flex items-center justify-center grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 ${
                  partner.name === "OpenAI" ? "invert opacity-80" : ""
                }`}
                style={{
                  animationDelay: `${-(partnerLoopDurationSeconds / partners.length) * index}s`,
                  animationPlayState: !isInView ? "paused" : undefined,
                }}
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={144}
                  height={40}
                  sizes="144px"
                  className="h-10 w-36 object-contain"
                  style={{ transform: `scale(${partner.visualScale})` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
