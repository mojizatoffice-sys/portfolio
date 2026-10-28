// src/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { NAV_RAILS, PERSONAL_INFO } from "../data/portfolioData";
import type { ViewerProfile } from "../data/portfolioData";

interface NavbarProps {
  activeProfile: ViewerProfile;
  onSwitchProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeProfile,
  onSwitchProfile,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only link to rails this viewer can actually see.
  const navLinks = NAV_RAILS.filter(
    (link) => !activeProfile.hiddenRailIds?.includes(link.id)
  );

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-colors duration-300 px-4 md:px-12 py-4 flex items-center justify-between ${
        isScrolled
          ? "bg-[#141414]/95 backdrop-blur-sm shadow-lg border-b border-[#3A1416]"
          : "bg-gradient-to-b from-[#0B0B0B]/90 via-[#B20710]/15 to-transparent"
      }`}
    >
      {/* Left: Brand & Navigation Links */}
      <div className="flex items-center gap-8">
        <a
          href="#top"
          className="text-[#E50914] font-extrabold text-2xl md:text-3xl tracking-wider"
        >
          {PERSONAL_INFO.brandName}
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-200">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="hover:text-[#E50914] transition"
            >
              {link.label}
            </a>
          ))}
          <a href="#footer-contact" className="hover:text-[#E50914] transition">
            About & Contact
          </a>
        </nav>
      </div>

      {/* Right: Quick Action Links & Profile Switcher */}
      <div className="flex items-center gap-4">
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 hover:text-white transition"
          aria-label="GitHub profile"
          title="GitHub"
        >
          <GithubIcon className="w-5 h-5" />
        </a>
        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-gray-300 hover:text-white transition"
          aria-label="LinkedIn profile"
          title="LinkedIn"
        >
          <LinkedinIcon className="w-5 h-5" />
        </a>
        <a
          href={PERSONAL_INFO.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-1.5 bg-[#E50914] hover:bg-[#F6121D] text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded transition"
        >
          <FileText className="w-4 h-4" />
          Resume
        </a>

        <button
          type="button"
          onClick={onSwitchProfile}
          className="flex items-center gap-2 text-xs text-gray-300 hover:text-white cursor-pointer"
          title={`Switch profile (current: ${activeProfile.name})`}
          aria-label={`Switch profile, currently ${activeProfile.name}`}
        >
          <span className="hidden lg:inline text-[#B3B3B3]">{activeProfile.name}</span>
          <span
            className="w-8 h-8 rounded flex items-center justify-center font-bold text-white text-sm border border-[#E50914]/70"
            style={{ backgroundColor: activeProfile.accent }}
          >
            {activeProfile.name.charAt(0)}
          </span>
        </button>
      </div>
    </header>
  );
};
