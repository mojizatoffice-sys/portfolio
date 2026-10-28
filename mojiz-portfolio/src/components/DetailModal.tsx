// src/components/DetailModal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { MediaItem } from "../data/portfolioData";

interface DetailModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-[#150809] rounded-xl overflow-hidden shadow-2xl border border-[#3A1416] my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#141414]/80 hover:bg-[#E50914] text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner Header */}
            <div className="relative h-56 sm:h-72 w-full">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#150809] via-[#150809]/40 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-[#E50914] text-white text-xs font-bold px-2.5 py-0.5 rounded uppercase">
                  {item.badge}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-300 mt-1">{item.tagline}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Metadata & Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3A1416] pb-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[#E50914] font-bold">
                    {item.matchScore}
                  </span>
                  <span className="text-gray-400">{item.year}</span>
                  <span className="text-gray-300 font-medium">
                    • {item.durationOrMetric}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black font-bold px-4 py-2 rounded text-xs sm:text-sm transition"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-[#E50914] hover:bg-[#F6121D] text-white font-bold px-4 py-2 rounded text-xs sm:text-sm transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Overview Description */}
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>

              {item.status && (
                <p className="text-xs text-gray-400 border-l-2 border-[#E50914] pl-3 -mt-2">
                  <span className="text-gray-500 uppercase tracking-wider">Status · </span>
                  {item.status}
                </p>
              )}

              {/* System Architecture Highlights */}
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-3">
                  How It's Built
                </h3>
                <ul className="space-y-2.5">
                  {item.architectureBullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-gray-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Tech Stack */}
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-2.5">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-[#3A1416] text-white px-3 py-1 rounded-full border border-[#4A1A1D]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
