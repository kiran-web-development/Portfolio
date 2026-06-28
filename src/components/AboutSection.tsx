import React from 'react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

interface AboutSectionProps {
  aboutData?: any;
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ aboutData, onContactClick }) => {
  const aboutText = aboutData?.aboutText ||
    "I am Menni Kiran Kumar, a B.Tech Computer Science student specializing in AI & Data Science. I focus on UI/UX design, frontend development, and backend systems, crafting striking and unforgettable digital solutions. Let's build something incredible together!";

  const title = aboutData?.title || "About me";
  const moonImage = aboutData?.moonImageUrl || "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png";
  const legoImage = aboutData?.legoImageUrl || "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png";
  const decorObject1 = aboutData?.decorObject1Url || "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png";
  const decorObject2 = aboutData?.decorObject2Url || "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-[#0C0C0C] z-10 px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Decorative 3D Corner Images */}
      {/* Top Left: Moon Icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0"
      >
        <img
          src={moonImage}
          alt="Moon icon decor"
          className="w-full h-auto object-contain"
          draggable="false"
        />
      </FadeIn>

      {/* Bottom Left: 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none select-none z-0"
      >
        <img
          src={decorObject1}
          alt="3D object decor"
          className="w-full h-auto object-contain"
          draggable="false"
        />
      </FadeIn>

      {/* Top Right: Lego Icon */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0"
      >
        <img
          src={legoImage}
          alt="Lego icon decor"
          className="w-full h-auto object-contain"
          draggable="false"
        />
      </FadeIn>

      {/* Bottom Right: 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none select-none z-0"
      >
        <img
          src={decorObject2}
          alt="3D group decor"
          className="w-full h-auto object-contain"
          draggable="false"
        />
      </FadeIn>
     

      {/* Main Content Layout */}
      <div className="flex flex-col items-center max-w-4xl text-center z-10 select-none">
        {/* Title */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[3.5rem] sm:text-[12vw] md:text-[160px] mb-0 pointer-events-none">
            {title}
          </h2>
        </FadeIn>

        {/* Scroll Character Animation Block */}
        <div className="mt-10 sm:mt-14 md:mt-16 w-full flex justify-center px-4">
          <AnimatedText
            text={aboutText}
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] text-[1.1rem] sm:text-[1.2rem] md:text-[1.35rem]"
          />
        </div>

        {/* Action Button */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.1} y={20}>
            <ContactButton onClick={onContactClick} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
