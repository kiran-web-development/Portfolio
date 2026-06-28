import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import { Code, Layout, Brain, Wrench, Camera } from 'lucide-react';

interface SkillCategory {
  num: string;
  title: string;
  icon: React.ReactNode;
  skills: string[];
  description: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    num: '01',
    title: 'Programming',
    icon: <Code className="w-5 h-5 sm:w-6 sm:h-6 text-[#0C0C0C]" />,
    skills: ['Python', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'MongoDB'],
    description: 'Writing clean, optimized code and managing database structures for full-stack applications.',
  },
  {
    num: '02',
    title: 'Development',
    icon: <Layout className="w-5 h-5 sm:w-6 sm:h-6 text-[#0C0C0C]" />,
    skills: ['Full-Stack Development', 'API Integration', 'Frontend & Backend', 'Git/GitHub'],
    description: 'Designing end-to-end web architectures, APIs, and version control workflows.',
  },
  {
    num: '03',
    title: 'AI / ML',
    icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-[#0C0C0C]" />,
    skills: ['Machine Learning', 'Computer Vision', 'Google Cloud', 'Vertex AI', 'Generative AI'],
    description: 'Integrating intelligent features, training CV models, and utilizing cloud AI platforms.',
  },
  {
    num: '04',
    title: 'AI Tools',
    icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-[#0C0C0C]" />,
    skills: ['Data Analysis', 'Power BI', 'Testing', 'Prompt Engineering'],
    description: 'Analyzing data, engineering high-performing LLM prompts, and visualizing insights with modern BI tools.',
  },
  {
    num: '05',
    title: 'Creative & Media',
    icon: <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-[#0C0C0C]" />,
    skills: ['Photography', 'Videography', 'Video/Photo Editing'],
    description: 'Capturing moments, directing video production, and editing high-quality multimedia content.',
  },
];

interface SkillsSectionProps {
  skills?: any[];
}

const getIconElement = (iconName?: string) => {
  const normalized = iconName?.toLowerCase() || '';
  const className = "w-5 h-5 sm:w-6 sm:h-6 text-[#0C0C0C]";
  switch (normalized) {
    case 'code':
      return <Code className={className} />;
    case 'layout':
      return <Layout className={className} />;
    case 'brain':
      return <Brain className={className} />;
    case 'wrench':
      return <Wrench className={className} />;
    case 'camera':
      return <Camera className={className} />;
    default:
      return <Code className={className} />;
  }
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const categoriesToRender = skills && skills.length > 0 
    ? skills.map((item, idx) => ({
        num: item.num || `0${idx + 1}`,
        title: item.title,
        icon: getIconElement(item.icon),
        skills: item.skills || [],
        description: item.description,
      }))
    : SKILL_CATEGORIES;

  return (
    <section
      id="skills"
      className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20"
    >
      <div className="max-w-5xl mx-auto flex flex-col">
        {/* Section Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[3.5rem] sm:text-[12vw] md:text-[160px] leading-none mb-16 sm:mb-20 md:mb-28 select-none pointer-events-none">
            Skills
          </h2>
        </FadeIn>

        {/* Skills Categories List */}
        <div className="flex flex-col border-t border-[#0C0C0C]/15">
          {categoriesToRender.map((category, i) => (
            <FadeIn
              key={category.num}
              delay={i * 0.1}
              y={30}
              className="border-b border-[#0C0C0C]/15"
            >
              <div className="grid grid-cols-[60px_1fr] sm:grid-cols-[100px_1fr] md:grid-cols-[160px_1fr] items-start gap-6 sm:gap-10 md:gap-16 py-8 sm:py-10 md:py-12 select-none">
                {/* Left Number & Icon */}
                <div className="font-black leading-none text-[#0C0C0C] flex flex-col gap-2">
                  <span style={{ fontSize: 'clamp(2.5rem, 8vw, 140px)' }}>{category.num}</span>
                  <div className="flex items-center gap-2 text-[#0C0C0C]/60 mt-1 pl-1">
                    {category.icon}
                  </div>
                </div>

                {/* Right Content Stack */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3
                      className="font-semibold uppercase text-[#0C0C0C] tracking-wide"
                      style={{ fontSize: 'clamp(1.2rem, 2.4vw, 2.3rem)' }}
                    >
                      {category.title}
                    </h3>
                  </div>

                  <p
                    className="font-light leading-relaxed text-[#0C0C0C]/70 max-w-2xl text-left"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.15rem)' }}
                  >
                    {category.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2.5 mt-3">
                    {category.skills.map((skill: string, sIdx: number) => (
                      <motion.span
                        key={sIdx}
                        whileHover={{ scale: 1.05, y: -2, backgroundColor: '#0C0C0C', color: '#FFFFFF' }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="px-4 py-2 text-xs sm:text-sm font-medium uppercase tracking-wider rounded-full border border-[#0C0C0C]/20 text-[#0C0C0C] bg-[#0C0C0C]/5 hover:border-transparent transition-colors duration-200 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
