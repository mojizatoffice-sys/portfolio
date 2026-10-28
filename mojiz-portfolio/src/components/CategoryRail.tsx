// src/components/CategoryRail.tsx
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type {
  CategoryRail as CategoryRailType,
  MediaItem,
} from "../data/portfolioData";

interface CategoryRailProps {
  rail: CategoryRailType;
  onSelectItem: (item: MediaItem) => void;
}

export const CategoryRail: React.FC<CategoryRailProps> = ({
  rail,
  onSelectItem,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollAmount =
      direction === "left"
        ? scrollLeft - clientWidth * 0.75
        : scrollLeft + clientWidth * 0.75;
    rowRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id={rail.id} className="py-4 px-4 md:px-12 relative group">
      <h2 className="text-lg md:text-2xl font-bold text-white mb-3 tracking-wide">
        {rail.title}
      </h2>

      {/* Left Scroll Chevron (Desktop) */}
      <button
        onClick={() => handleScroll("left")}
        aria-label="Scroll Left"
        className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/4 z-20 w-10 h-32 bg-black/70 hover:bg-[#E50914] text-white rounded-r opacity-0 group-hover:opacity-100 transition cursor-pointer"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Scrollable Card Container */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {rail.items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="snap-start shrink-0 w-64 sm:w-72 md:w-80 bg-[#1A0A0B] rounded-md overflow-hidden border border-[#3A1416] hover:border-[#E50914] hover:shadow-[0_8px_30px_rgba(229,9,20,0.28)] hover:scale-[1.03] transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Card Image Wrapper */}
            <div className="relative h-40 w-full bg-[#2F2F2F]">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0B] via-transparent to-transparent" />

              <span className="absolute top-2 left-2 bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                {item.badge}
              </span>

              <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-black shadow">
                <Play className="w-4 h-4 fill-black ml-0.5" />
              </div>
            </div>

            {/* Card Info */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs mb-1">
                  <span className="text-[#E50914] font-bold">
                    {item.matchScore}
                  </span>
                  <span className="text-gray-400">• {item.year}</span>
                </div>

                <h3 className="text-white font-bold text-base line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                  {item.tagline}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] bg-[#3A1416] text-[#F5D6D8] border border-[#4A1A1D] px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {item.techStack.length > 4 && (
                  <span className="text-[10px] text-gray-400 px-1 py-0.5">
                    +{item.techStack.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Scroll Chevron (Desktop) */}
      <button
        onClick={() => handleScroll("right")}
        aria-label="Scroll Right"
        className="hidden md:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/4 z-20 w-10 h-32 bg-black/70 hover:bg-[#E50914] text-white rounded-l opacity-0 group-hover:opacity-100 transition cursor-pointer"
      >
        <ChevronRight className="w-7 h-7" />
      </button>
    </section>
  );
};