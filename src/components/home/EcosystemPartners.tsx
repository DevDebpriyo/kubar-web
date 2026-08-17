"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
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
  const [isPaused, setIsPaused] = useState(false);
  const loopedPartners = [...partners, ...partners];

  return (
    <section
      aria-label="Technology programmes, grants and infrastructure support"
      className="relative z-10 overflow-hidden pt-4 pb-16 sm:pt-8 sm:pb-24"
      style={{
        background: "rgba(4, 4, 12, 0.98)",
      }}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#0c0c18]/95 text-white shadow-lg transition-colors hover:border-white/40 hover:bg-[#151526] sm:right-8 sm:top-8"
        onClick={() => setIsPaused((paused) => !paused)}
        aria-label={isPaused ? "Resume partner logo carousel" : "Pause partner logo carousel"}
        aria-pressed={isPaused}
      >
        {isPaused ? (
          <Play className="h-4 w-4 fill-current" aria-hidden="true" />
        ) : (
          <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
        )}
      </button>

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
            className="marquee-track flex w-max items-center gap-16 sm:gap-24"
            style={{ animationPlayState: isPaused ? "paused" : undefined }}
          >
            {loopedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                aria-hidden={index >= partners.length}
                className={`group relative flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 opacity-60 hover:opacity-100 ${
                  partner.name === "Microsoft" ? "-ml-6 -mr-2" : ""
                } ${partner.name === "OpenAI" ? "invert opacity-80" : ""}`}
              >
                <Image
                  src={partner.src}
                  alt={index < partners.length ? partner.name : ""}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
