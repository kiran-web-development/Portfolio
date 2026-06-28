import React, { useState } from 'react';
import { Mail, Instagram, Github, Linkedin, MessageCircle, Send } from 'lucide-react';
import FadeIn from './FadeIn';
import Footer from './Footer';

interface ContactSectionProps {
  onNavClick?: (sectionId: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavClick }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };



  const githubLink = 'https://github.com/mennikiran';

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-6 sm:px-10 md:px-16 pt-24 pb-10 relative z-20 -mt-10 sm:-mt-12 md:-mt-14 border-t border-[#D7E2EA]/10"
    >
      <div className="max-w-5xl mx-auto flex flex-col">
        {/* Section Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center text-[3rem] sm:text-[10vw] md:text-[130px] leading-none mb-16 select-none pointer-events-none">
            Get In Touch
          </h2>
        </FadeIn>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 mb-20">
          {/* Left Side: Info & Socials */}
          <FadeIn delay={0.15} y={30} className="flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl sm:text-2xl font-semibold uppercase tracking-wider text-[#D7E2EA]">
                Let&apos;s Connect
              </h3>
              <p className="text-[#D7E2EA]/70 font-light leading-relaxed max-w-md">
                Have a project in mind, want to discuss software development opportunities, or just say hello? Feel free to reach out!
              </p>

              {/* Direct Info */}
              <div className="flex flex-col gap-4 mt-4">
                <a
                  href="mailto:mennikiran@gmail.com"
                  className="flex items-center gap-3 text-[#D7E2EA]/85 hover:text-white transition-colors duration-200"
                >
                  <Mail size={20} className="text-[#BBCCD7]" />
                  <span>mennikiran@gmail.com</span>
                </a>
                {/*<a
                  href="tel:+919390227632"
                  className="flex items-center gap-3 text-[#D7E2EA]/85 hover:text-white transition-colors duration-200"
                >
                  <Phone size={20} className="text-[#BBCCD7]" />
                  <span>+91 9390227632</span>
                </a>
                <div className="flex items-center gap-3 text-[#D7E2EA]/85 select-none">
                  <MapPin size={20} className="text-[#BBCCD7]" />
                  <span>Chittoor, India</span>
                </div>*/}
              </div>
            </div>

            {/* Social Media Link Array */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                Follow Me
              </h4>
              <div className="flex flex-wrap gap-4">
                {/* Instagram */}
                <a
                  href="https://instagram.com/mennikiran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>

                {/* WhatsApp Channel */}
                <a
                  href="https://wa.me/919390227632"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
                  aria-label="WhatsApp Channel"
                >
                  <MessageCircle size={20} />
                </a>

                {/* GitHub */}
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/mennikiran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right Side: Form */}
          <FadeIn delay={0.3} y={30}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full bg-[#0C0C0C] border border-[#D7E2EA]/10 p-6 sm:p-8 rounded-[30px]">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#BBCCD7] transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#BBCCD7] transition-colors duration-200"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-medium">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can Menni Kiran Kumar help you?"
                  className="w-full bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] focus:outline-none focus:border-[#BBCCD7] transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                  outline: '2px solid white',
                  outlineOffset: '-3px',
                }}
                className="w-full rounded-full text-white font-medium uppercase tracking-widest py-3.5 mt-2 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                {submitted ? 'Message Sent!' : 'Send Message'}
                {!submitted && <Send size={16} />}
              </button>
            </form>
          </FadeIn>
        </div>

        {/* Shared Footer Section */}
        <Footer onNavClick={onNavClick} />
      </div>
    </section>
  );
};

export default ContactSection;
