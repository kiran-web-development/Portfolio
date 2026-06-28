import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';
import profileFallback from '../assets/profile.png';

interface HeroSectionProps {
  heroData?: any;
  onContactClick?: () => void;
  onNavClick?: (sectionId: string) => void;
  onBlogClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroData, onContactClick, onNavClick, onBlogClick }) => {
  const title = heroData?.title || "Hi, i'm Kiran";
  const description = heroData?.description || "a web developer & AI Prompt Engineer and Content Creator | Photographer";
  const profileImage = heroData?.profileImageUrl || profileFallback;

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick(target);
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="h-screen w-full flex flex-col justify-between relative overflow-hidden bg-[#0C0C0C]">
      {/* 1. Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="w-full z-20">
        <div className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          <a
            href="#about"
            onClick={(e) => handleLinkClick(e, 'about')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={(e) => handleLinkClick(e, 'skills')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={(e) => handleLinkClick(e, 'projects')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
          >
            Contact
          </a>
        </div>
      </FadeIn>

      {/* 2. Hero Heading (Middle layer, behind Portrait) */}
      <div className="flex-grow flex items-center justify-center relative w-full overflow-hidden select-none">
        <div className="w-full overflow-hidden">
          <FadeIn delay={0.15} y={40} className="w-full">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none pointer-events-none">
              {title}
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* 3. Hero Portrait (Centered absolutely, in front of Heading) */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="w-full"
        >
          <img
            src={profileImage}
            alt="kiran Portrait"
            className="w-full h-auto object-cover select-none pointer-events-none"
            draggable="false"
          />
        </Magnet>
      </FadeIn>

      {/* 4. Bottom bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-20">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-left max-w-[200px] sm:max-w-[260px] md:max-w-[320px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
            {description}
          </p>
        </FadeIn>

        <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
          <FadeIn delay={0.5} y={20}>
            <ContactButton onClick={onContactClick} />
          </FadeIn>

          <FadeIn delay={0.6} y={20} className="flex flex-wrap gap-3 max-w-lg md:justify-end">
            <motion.a
              href="#links"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 15px rgba(215, 226, 234, 0.25)' }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 border border-[#D7E2EA]/20 hover:border-[#D7E2EA] rounded-full text-[11px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/85 hover:text-white transition-all bg-[#0C0C0C]/60 hover:bg-[#D7E2EA]/15 font-semibold cursor-pointer select-none"
            >
              Links
            </motion.a>
            <motion.a
              href="https://menni.in"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 15px rgba(215, 226, 234, 0.25)' }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 border border-[#D7E2EA]/20 hover:border-[#D7E2EA] rounded-full text-[11px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/85 hover:text-white transition-all bg-[#0C0C0C]/60 hover:bg-[#D7E2EA]/15 font-semibold cursor-pointer select-none"
            >
              Kiran Moments Gallery
            </motion.a>
            <motion.a
              href="https://github.com/mennikiran/Btech-Memories"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 15px rgba(215, 226, 234, 0.25)' }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 border border-[#D7E2EA]/20 hover:border-[#D7E2EA] rounded-full text-[11px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/85 hover:text-white transition-all bg-[#0C0C0C]/60 hover:bg-[#D7E2EA]/15 font-semibold cursor-pointer select-none"
            >
              2022-26 Btech Memories
            </motion.a>
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                if (onBlogClick) onBlogClick();
              }}
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 0 15px rgba(215, 226, 234, 0.25)' }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 sm:px-6 sm:py-3 border border-[#D7E2EA]/20 hover:border-[#D7E2EA] rounded-full text-[11px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/85 hover:text-white transition-all bg-[#0C0C0C]/60 hover:bg-[#D7E2EA]/15 font-semibold cursor-pointer select-none"
            >
              Blog
            </motion.button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
