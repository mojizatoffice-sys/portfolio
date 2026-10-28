// src/App.tsx
import { useMemo, useState } from "react";
import {
  HERO_FEATURED,
  PERSONAL_INFO,
  PROFILE_STORAGE_KEY,
  getRailsForProfile,
} from "./data/portfolioData";
import type { ViewerProfile } from "./data/portfolioData";
import type { MediaItem } from "./data/portfolioData";
import { ProfileGate } from "./components/ProfileGate";
import { Navbar } from "./components/Navbar";
import { HeroBillboard } from "./components/HeroBillBoard";
import { CategoryRail } from "./components/CategoryRail";
import { DetailModal } from "./components/DetailModal";
import { Mail, MapPin, GraduationCap, Phone, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./components/BrandIcons";

const CURRENT_YEAR = new Date().getFullYear();

const readStoredProfile = (): ViewerProfile | null => {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ViewerProfile) : null;
  } catch {
    return null;
  }
};

export function App() {
  const [activeProfile, setActiveProfile] = useState<ViewerProfile | null>(readStoredProfile);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const rails = useMemo(() => getRailsForProfile(activeProfile), [activeProfile]);

  const selectProfile = (profile: ViewerProfile) => {
    setActiveProfile(profile);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch {
      /* storage unavailable (private mode) — in-memory state is enough */
    }
  };

  const switchProfile = () => {
    setActiveProfile(null);
    try {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  // Show "Who's Watching?" screen until a profile is selected
  if (!activeProfile) {
    return <ProfileGate onSelectProfile={selectProfile} />;
  }

  return (
    <div className="relative min-h-screen bg-transparent text-white">
      {/* Top Navbar */}
      <Navbar activeProfile={activeProfile} onSwitchProfile={switchProfile} />

      {/* Featured Hero Banner */}
      <HeroBillboard
        item={HERO_FEATURED}
        onOpenModal={(item) => setSelectedItem(item)}
      />

      {/* Horizontal Content Rails */}
      <main className="-mt-12 md:-mt-20 relative z-20 space-y-4 pb-16">
        {rails.map((rail) => (
          <CategoryRail
            key={rail.id}
            rail={rail}
            onSelectItem={(item) => setSelectedItem(item)}
          />
        ))}
      </main>

      {/* Detail Popup Modal */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* Footer / Contact & Education Info */}
      <footer
        id="footer-contact"
        className="relative z-10 border-t border-[#3A1416] bg-[#0B0B0B] px-4 md:px-12 py-12 text-sm text-gray-400"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-[#E50914] font-extrabold text-xl tracking-wider mb-2">
              {PERSONAL_INFO.brandName}
            </h3>
            <p className="text-gray-300 font-medium">{PERSONAL_INFO.name}</p>
            <p className="mt-1">{PERSONAL_INFO.title}</p>
            <p className="mt-3 text-gray-400 leading-relaxed">{PERSONAL_INFO.bio}</p>

            <div className="flex items-center gap-4 mt-4">
              <a
                href={PERSONAL_INFO.githubAlt}
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white transition"
                title="GitHub — Ayanabbas2006"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white transition text-xs"
                title="GitHub — mojizatoffice-sys"
              >
                mojizatoffice-sys
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-white transition"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              Education
            </h4>
            <p className="flex items-center gap-2 text-gray-300">
              <GraduationCap className="w-4 h-4 text-[#E50914] shrink-0" />
              {PERSONAL_INFO.education.degree}
            </p>
            <p>
              {PERSONAL_INFO.education.college} &middot; {PERSONAL_INFO.education.batch}
            </p>
            <p className="text-xs text-gray-500">
              {PERSONAL_INFO.education.status}
            </p>
            <p className="text-xs text-gray-500">
              CGPA: {PERSONAL_INFO.education.cgpa} &middot; Recent SGPA:{" "}
              {PERSONAL_INFO.education.recentSgpa}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs">
              Direct Contact
            </h4>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E50914]" />
              {PERSONAL_INFO.location}
            </p>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 text-gray-200 hover:text-white transition"
            >
              <Mail className="w-4 h-4 text-[#E50914] shrink-0" />
              {PERSONAL_INFO.email}
            </a>
            <a
              href={`tel:${PERSONAL_INFO.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-2 text-gray-200 hover:text-white transition"
            >
              <Phone className="w-4 h-4 text-[#E50914] shrink-0" />
              {PERSONAL_INFO.phone}
            </a>
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#F6121D] px-3 py-1.5 rounded transition"
            >
              <FileText className="w-3.5 h-3.5" />
              Open Resume
            </a>
          </div>
        </div>

        <p className="max-w-5xl mx-auto mt-10 text-xs text-gray-600">
          © {CURRENT_YEAR} {PERSONAL_INFO.name}. Built with React,
          TypeScript and Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}

export default App;
