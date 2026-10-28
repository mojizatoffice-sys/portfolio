import React, { useState } from "react";
import { motion } from "framer-motion";
import { VIEWER_PROFILES, PERSONAL_INFO } from "../data/portfolioData";
import type { ViewerProfile } from "../data/portfolioData";

interface ProfileGateProps {
  onSelectProfile: (profile: ViewerProfile) => void;
}

/** Avatar tile that falls back to the profile's initial when no image is set. */
const ProfileAvatar: React.FC<{ profile: ViewerProfile }> = ({ profile }) => {
  const [failed, setFailed] = useState(false);
  const showInitial = !profile.avatar || failed;

  return (
    <div
      className="w-24 h-24 md:w-36 md:h-36 rounded-md overflow-hidden border-2 border-transparent group-hover:border-[#E50914] group-hover:shadow-[0_0_28px_rgba(229,9,20,0.55)] transition-all duration-200 bg-[#1F1F1F] flex items-center justify-center"
      style={{ boxShadow: `inset 0 -3px 0 0 ${profile.accent}` }}
    >
      {showInitial ? (
        <span
          className="text-4xl md:text-6xl font-extrabold text-white/90 group-hover:text-[#E50914] transition-colors"
          aria-hidden="true"
        >
          {profile.name.charAt(0)}
        </span>
      ) : (
        <img
          src={profile.avatar}
          alt=""
          onError={() => setFailed(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      )}
    </div>
  );
};

export const ProfileGate: React.FC<ProfileGateProps> = ({ onSelectProfile }) => {
  return (
    <div className="relative z-10 min-h-screen bg-transparent flex flex-col items-center justify-center px-4 py-12">
      {/* Netflix wordmark */}
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[#E50914] font-black tracking-[0.18em] text-xl md:text-2xl mb-10"
      >
        {PERSONAL_INFO.brandName}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-semibold text-white mb-3 text-center"
      >
        Who's watching?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-sm md:text-base text-[#8C8C8C] mb-10 text-center max-w-md"
      >
        Pick a lens to browse this portfolio.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {VIEWER_PROFILES.map((profile, idx) => (
          <motion.button
            key={profile.id}
            type="button"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelectProfile(profile)}
            aria-label={`Enter portfolio as ${profile.name}`}
            className="group flex flex-col items-center max-w-[10rem] md:max-w-[11rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] rounded-md cursor-pointer"
          >
            <ProfileAvatar profile={profile} />
            <span className="mt-3 text-sm md:text-lg text-[#B3B3B3] group-hover:text-white transition-colors">
              {profile.name}
            </span>
            <span className="mt-1 text-[11px] md:text-xs text-[#7A7A7A] group-hover:text-[#E5E5E5] transition-colors text-center leading-snug">
              {profile.description}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
