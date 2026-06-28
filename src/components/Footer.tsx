import React from 'react';
import { Instagram, Github, Linkedin, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavClick?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
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

  const githubLink = 'https://github.com/mennikiran';

  return (
    <div className="w-full">
      {/* Divider line for Footer */}
      <div className="w-full h-[1px] bg-[#D7E2EA]/10 my-8"></div>

      <footer className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-6 select-none text-[#D7E2EA]">
        {/* Logo & Socials Stack */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D7E2EA] text-xl font-bold uppercase tracking-wider hover:opacity-75 transition-opacity"
          >
            kiran
          </a>
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com/mennikiran"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D7E2EA]/60 hover:text-white transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://wa.me/919390227632"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D7E2EA]/60 hover:text-[#25D366] transition-colors duration-200"
              aria-label="WhatsApp Channel"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D7E2EA]/60 hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/mennikiran"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D7E2EA]/60 hover:text-[#0077B5] transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          <a
            href="#about"
            onClick={(e) => handleLinkClick(e, 'about')}
            className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] text-sm uppercase tracking-widest font-medium transition-colors"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={(e) => handleLinkClick(e, 'skills')}
            className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] text-sm uppercase tracking-widest font-medium transition-colors"
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={(e) => handleLinkClick(e, 'projects')}
            className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] text-sm uppercase tracking-widest font-medium transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] text-sm uppercase tracking-widest font-medium transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Copyright Deck */}
        <div className="text-sm text-[#D7E2EA]/40 font-light text-center sm:text-right">
          with love{' '}
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D7E2EA] font-semibold underline hover:text-white transition-colors"
          >
            kiran
          </a>{' '}
          &copy; 2026 All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
