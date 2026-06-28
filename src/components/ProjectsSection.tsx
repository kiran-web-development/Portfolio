import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Heart } from 'lucide-react';
import FadeIn from './FadeIn';

interface Project {
  num: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  img: string;
  githubUrl: string;
  liveUrl: string;
  initialLikes: number;
}

const PROJECTS: Project[] = [
  {
    num: '01',
    name: 'AI Medical Image System',
    category: 'AI & React',
    description: 'An advanced web-based DICOM viewer and computer vision application. Integrates client-side ONNX Runtime Web for real-time AI-powered diagnostic predictions directly in the browser.',
    tags: ['#React', '#TypeScript', '#ONNX', '#DICOM', '#AI', '#ComputerVision'],
    img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    githubUrl: 'https://github.com/kiran-web-development',
    liveUrl: 'https://menni.in',
    initialLikes: 142,
  },
  {
    num: '02',
    name: 'KMG Photography Gallery',
    category: 'Web & Supabase',
    description: 'A responsive collaborative sharing gallery powered by Supabase. Supports secure user authentication, client-side image compression, and high-speed storage caching with RLS policies.',
    tags: ['#React', '#Supabase', '#Auth', '#RLS', '#TailwindCSS', '#WebDev'],
    img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    githubUrl: 'https://github.com/kiran-web-development',
    liveUrl: 'https://menni.in',
    initialLikes: 98,
  },
  {
    num: '03',
    name: 'Cynosure Hackathon Project',
    category: 'Team Lead',
    description: 'An award-winning hackathon submission optimized for visual impact and user experience. Employs a stunning high-contrast dark theme, custom typography grids, and rich interactive transitions.',
    tags: ['#UIUX', '#FramerMotion', '#Leadership', '#Hackathon', '#WebDesign'],
    img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    githubUrl: 'https://github.com/kiran-web-development/Btech-Memories',
    liveUrl: 'https://github.com/kiran-web-development/Btech-Memories',
    initialLikes: 256,
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const localStorageKey = `project-likes-${project.num}`;
  const [likes, setLikes] = React.useState<number>(() => {
    const saved = localStorage.getItem(localStorageKey);
    return saved ? parseInt(saved, 10) : project.initialLikes;
  });
  const [isLiked, setIsLiked] = React.useState<boolean>(() => {
    return localStorage.getItem(`${localStorageKey}-liked`) === 'true';
  });

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
      localStorage.setItem(localStorageKey, (likes - 1).toString());
      localStorage.setItem(`${localStorageKey}-liked`, 'false');
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      localStorage.setItem(localStorageKey, (likes + 1).toString());
      localStorage.setItem(`${localStorageKey}-liked`, 'true');
    }
  };

  return (
    <FadeIn delay={index * 0.1} y={35}>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group bg-white/[0.01] hover:bg-white/[0.03] border border-white/10 hover:border-[#D7E2EA]/30 rounded-[40px] p-6 sm:p-8 flex flex-col justify-between h-[590px] transition-colors duration-300 relative shadow-xl overflow-hidden"
      >
        {/* Glow Line Animation */}
        <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7E2EA]/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

        <div className="flex flex-col gap-4">
          {/* Image Container with Zoom effect */}
          <div className="w-full h-60 rounded-[28px] overflow-hidden relative select-none">
            <img
              src={project.img}
              alt={project.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
            />
            {/* Project number badge */}
            <span className="absolute top-3 left-3 bg-[#0C0C0C]/85 backdrop-blur-md text-[#D7E2EA] text-sm font-black px-3 py-1 rounded-full border border-white/10">
              {project.num}
            </span>

            {/* Like Button Chip */}
            <button
              onClick={handleLike}
              className={`absolute top-3 right-3 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border ${isLiked
                ? 'bg-[#ff4757] border-[#ff4757] text-white animate-pulse'
                : 'bg-[#0C0C0C]/75 border-white/10 text-[#D7E2EA] hover:text-[#ff4757] hover:bg-white/15'
                }`}
            >
              <Heart
                size={13}
                className={isLiked ? 'fill-current stroke-current' : 'stroke-current'}
              />
              <span className="text-[11px] font-bold">{likes}</span>
            </button>
          </div>

          {/* Info & Description Stack */}
          <div className="flex flex-col gap-2 select-none">
            <span className="uppercase tracking-widest text-[#D7E2EA]/50 text-[10px] sm:text-[11px] font-extrabold">
              {project.category}
            </span>
            <h3 className="uppercase tracking-tight font-black text-lg sm:text-xl md:text-2xl text-[#D7E2EA] group-hover:text-white transition-colors duration-300 line-clamp-1">
              {project.name}
            </h3>
            <p className="text-xs sm:text-[13px] text-[#D7E2EA]/60 font-light leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Hashtags container */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold text-[#D7E2EA]/50 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded-md hover:text-[#D7E2EA] hover:bg-white/[0.07] transition-all cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons Group */}
        <div className="flex gap-3 mt-6">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-1.5 border border-white/20 hover:border-[#D7E2EA] text-[#D7E2EA]/80 hover:text-white px-3 py-2.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold bg-[#0C0C0C]/50 hover:bg-[#D7E2EA]/10 transition-all duration-300 cursor-pointer select-none"
          >
            <Github size={13} />
            <span>View Project</span>
          </motion.a>

          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] px-3 py-2.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer select-none"
          >
            <ExternalLink size={13} />
            <span>Live View</span>
          </motion.a>
        </div>
      </motion.div>
    </FadeIn>
  );
};

interface ProjectsSectionProps {
  projects?: any[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const projectsToRender = projects && projects.length > 0
    ? projects.map((p, idx) => ({
        num: p.num || `0${idx + 1}`,
        name: p.name,
        category: p.category,
        description: p.description,
        tags: p.tags || [],
        img: p.imageUrl || '',
        githubUrl: p.githubUrl || '#',
        liveUrl: p.liveUrl || '#',
        initialLikes: p.initialLikes || 0,
      }))
    : PROJECTS;

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 pb-28 relative z-10 -mt-10 sm:-mt-12 md:-mt-14"
    >
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Title */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[3.5rem] sm:text-[12vw] md:text-[160px] leading-none mb-14 sm:mb-20 select-none pointer-events-none">
            Projects
          </h2>
        </FadeIn>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {projectsToRender.map((project, index) => (
            <ProjectCard
              key={project.num}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
