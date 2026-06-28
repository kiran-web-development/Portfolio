import React, { useEffect, useRef } from 'react';
import { FileDown, Linkedin, Instagram, Github } from 'lucide-react';
import { motion } from 'framer-motion';

// const IMAGES = [
//   'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
//   'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
//   'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
//   'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
//   'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
//   'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
//   'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
//   'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
//   'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
//   'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
//   'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
//   'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
//   'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
//   'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
//   'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
//   'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
//   'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
//   'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
//   'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
//   'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
//   'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
// ];

interface MarqueeSectionProps {
  resumeFileUrl?: string;
}

export const MarqueeSection: React.FC<MarqueeSectionProps> = ({ resumeFileUrl }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Row 1: first 11 images (tripled)
  // const row1Images = React.useMemo(() => {
  //   const slice = IMAGES.slice(0, 11);
  //   return [...slice, ...slice, ...slice];
  // }, []);

  // Row 2: remaining 10 images (tripled)
  // const row2Images = React.useMemo(() => {
  //   const slice = IMAGES.slice(11);
  //   return [...slice, ...slice, ...slice];
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      // Calculate absolute top position of the section
      const sectionTop = rect.top + window.scrollY;
      
      // Calculate scroll offset based on window scroll and viewport height
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      // Update row positions directly via style refs for maximum scroll performance
      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${offset - 400}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-(offset - 400)}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call once initially to set correct positioning
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="links"
      className="bg-[#0C0C0C] w-full pt-16 sm:pt-20 md:pt-24 pb-16 overflow-hidden border-t border-[#D7E2EA]/5"
    >
      <div className="flex flex-col gap-12 w-full">
        {/* Row 1 (Moves Right)
        <div className="w-full overflow-hidden">
          <div
            ref={row1Ref}
            style={{ willChange: 'transform' }}
            className="flex gap-3 transition-transform duration-75 ease-out select-none"
          >
            {row1Images.map((src, i) => (
              <img
                key={`row1-${i}`}
                src={src}
                alt={`Marquee tile 1-${i}`}
                loading="lazy"
                className="w-[280px] h-[180px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl object-cover flex-shrink-0 pointer-events-none"
              />
            ))}
          </div>
        </div> */}

        {/* Row 2 (Moves Left) 
        <div className="w-full overflow-hidden">
          <div
            ref={row2Ref}
            style={{ willChange: 'transform' }}
            className="flex gap-3 transition-transform duration-75 ease-out select-none"
          >
            {row2Images.map((src, i) => (
              <img
                key={`row2-${i}`}
                src={src}
                alt={`Marquee tile 2-${i}`}
                loading="lazy"
                className="w-[280px] h-[180px] sm:w-[360px] sm:h-[230px] md:w-[420px] md:h-[270px] rounded-2xl object-cover flex-shrink-0 pointer-events-none"
              />
            ))}
          </div>
        </div>*/}

        {/* Social & Resume Links Hub */}
        <div className="max-w-6xl mx-auto px-6 w-full flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-[#D7E2EA]/50 font-medium uppercase tracking-widest text-xs sm:text-sm mb-3">
              Connect & Resources
            </h2>
            <p className="text-[#D7E2EA] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-sans">
              Access My Profiles & Materials
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
            {/* Resume Button */}
            <motion.a
              href={resumeFileUrl || "/Menni Kiran Kumar Resume.pdf"}
              download="Menni_Kiran_Kumar_Resume.pdf"
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden bg-white/[0.01] hover:bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl p-6 flex flex-col justify-between h-48 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-white/[0.02]"
            >
              {/* Top border glowing line */}
              <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7E2EA]/40 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#D7E2EA]/10 transition-colors duration-300">
                  <FileDown className="text-[#D7E2EA] group-hover:scale-110 transition-transform duration-300" size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 group-hover:text-[#D7E2EA]/60 font-semibold transition-colors">
                  PDF DOC
                </span>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-bold text-white group-hover:text-[#D7E2EA] transition-colors">
                  Download Resume
                </h3>
                <p className="text-xs text-[#D7E2EA]/50 mt-1 font-light leading-relaxed">
                  Get a copy of my curriculum vitae detailing my experience & skills.
                </p>
              </div>
            </motion.a>

            {/* LinkedIn Button */}
            <motion.a
              href="https://www.linkedin.com/in/mennikiran"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden bg-white/[0.01] hover:bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl p-6 flex flex-col justify-between h-48 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#0077B5]/[0.05]"
            >
              {/* Top border glowing line */}
              <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0077B5] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#0077B5]/15 transition-colors duration-300">
                  <Linkedin className="text-[#D7E2EA] group-hover:text-[#0077B5] group-hover:scale-110 transition-all duration-300" size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 group-hover:text-[#0077B5]/80 font-semibold transition-colors">
                  PROFESSIONAL
                </span>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-bold text-white group-hover:text-[#0077B5] transition-colors">
                  LinkedIn Profile
                </h3>
                <p className="text-xs text-[#D7E2EA]/50 mt-1 font-light leading-relaxed">
                  Connect with me professionally, view recommendations & updates.
                </p>
              </div>
            </motion.a>

            {/* Instagram Button */}
            <motion.a
              href="https://www.instagram.com/mennitechtips/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden bg-white/[0.01] hover:bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl p-6 flex flex-col justify-between h-48 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#e6683c]/[0.05]"
            >
              {/* Top border glowing line */}
              <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#e6683c] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#e6683c]/15 transition-colors duration-300">
                  <Instagram className="text-[#D7E2EA] group-hover:text-[#e6683c] group-hover:scale-110 transition-all duration-300" size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 group-hover:text-[#e6683c]/80 font-semibold transition-colors">
                  CREATIVE
                </span>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-bold text-white group-hover:text-[#e6683c] transition-colors">
                  Instagram ID
                </h3>
                <p className="text-xs text-[#D7E2EA]/50 mt-1 font-light leading-relaxed">
                  Follow my photography, creative design, & behind-the-scenes content.
                </p>
              </div>
            </motion.a>

            {/* GitHub Button */}
            <motion.a
              href="https://github.com/kiran-web-development"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden bg-white/[0.01] hover:bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl p-6 flex flex-col justify-between h-48 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-white/[0.04]"
            >
              {/* Top border glowing line */}
              <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7E2EA] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
                  <Github className="text-[#D7E2EA] group-hover:text-white group-hover:scale-110 transition-all duration-300" size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 group-hover:text-white/80 font-semibold transition-colors">
                  CODEBASE
                </span>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
                  GitHub Profile
                </h3>
                <p className="text-xs text-[#D7E2EA]/50 mt-1 font-light leading-relaxed">
                  Explore my projects, source code, repositories, & contributions.
                </p>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
