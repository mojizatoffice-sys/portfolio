// src/components/HeroBillboard.tsx
import React from "react";
import { Info, Play, FileText } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { PERSONAL_INFO } from "../data/portfolioData";
import type { MediaItem } from "../data/portfolioData";

interface HeroBillboardProps {
  item: MediaItem;
  onOpenModal: (item: MediaItem) => void;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  item,
  onOpenModal,
}) => {
  return (
    <section className="relative h-[75vh] md:h-[85vh] w-full flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
        src={item.thumbnailUrl}
        alt={item.title}
        loading="eager"
          className="w-full h-full object-cover object-center brightness-50"
        />
        {/* Netflix Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-[#141414]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#B20710]/25" />
      </div>

      {/* Hero Content — top padding clears the fixed navbar */}
      <div className="relative z-10 px-4 md:px-12 max-w-2xl pt-24 md:pt-28">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {item.badge}
          </span>
          <span className="text-xs md:text-sm text-gray-300 font-medium">
            {PERSONAL_INFO.shortName} · {PERSONAL_INFO.title}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          {item.title}
        </h1>

        <p className="mt-3 text-sm md:text-base text-gray-200 line-clamp-3 md:line-clamp-4">
          {item.tagline} {item.description.split(". ")[0]}.
        </p>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-xs md:text-sm">
          <span className="text-[#E50914] font-bold">{item.matchScore}</span>
          <span className="text-gray-400">{item.year}</span>
          <span className="border border-gray-500 px-1.5 py-0.5 text-[11px] rounded text-gray-300">
            {item.badge}
          </span>
          <span className="text-gray-300 font-medium">
            {item.durationOrMetric}
          </span>
        </div>

        {/* Action Buttons — Resume/More Info are secondary, so they sit on their own row */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button
            onClick={() => onOpenModal(item)}
            className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black font-bold px-5 py-2.5 rounded text-sm md:text-base transition cursor-pointer"
          >
            <Play className="w-5 h-5 fill-black" />
            View Architecture
          </button>

          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#E50914] hover:bg-[#F6121D] text-white font-semibold px-5 py-2.5 rounded text-sm md:text-base transition"
            >
              <GithubIcon className="w-5 h-5" />
              Source Code
            </a>
          )}

          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gray-600/70 hover:bg-gray-600/90 text-white font-semibold px-5 py-2.5 rounded text-sm md:text-base backdrop-blur-sm transition"
          >
            <FileText className="w-5 h-5" />
            Resume
          </a>
        </div>

        <button
          onClick={() => onOpenModal(item)}
          className="flex items-center gap-1.5 mt-3 text-xs md:text-sm text-gray-300 hover:text-white transition cursor-pointer"
        >
          <Info className="w-4 h-4" />
          More info
        </button>
      </div>
    </section>
  );
};
