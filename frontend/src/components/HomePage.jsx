import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Github, Linkedin, Download, Menu, X, Eye, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import portfolioData from '../mock';
import HeroSection from './HeroSection';
import ProjectCard from './ProjectCard';
import SkillsSection from './SkillsSection';
import EducationSection from './EducationSection';
import CertificationsSection from './CertificationsSection';
import ContactSection from './ContactSection';
import SectionWrapper from './SectionWrapper';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const mainRef = useRef(null);

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const topBarVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 }
    }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const navItems = ['hero', 'projects', 'skills', 'education', 'certifications', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      const mainElement = mainRef.current;
      if (!mainElement) return;

      const sections = ['hero', 'projects', 'skills', 'education', 'certifications', 'contact'];
      // Trigger update when 1/3 of the screen enters
      const scrollPosition = mainElement.scrollTop + (window.innerHeight / 3); 

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      });
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      // Check initial position
      handleScroll();
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30 scroll-smooth overflow-x-hidden">
      
      {/* Top Navigation Bar */}
      <motion.nav 
        variants={topBarVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex items-center pointer-events-none xl:hidden"
      >
        <div 
          className="pointer-events-auto cursor-pointer hover:text-primary transition-colors bg-black/50 p-2 rounded-full backdrop-blur-md"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center xl:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-3xl font-bold tracking-tight capitalize transition-colors ${
                    activeSection === item ? 'text-primary' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Sidebar Navigation */}
      <motion.aside 
        variants={sidebarVariants}
        initial="hidden"
        animate={isSidebarVisible ? "visible" : "hidden"}
        className="fixed left-0 top-0 bottom-0 z-40 w-64 hidden xl:flex flex-col justify-center px-12 pointer-events-none"
      >
        <div className="flex flex-col gap-6 pointer-events-auto">
          {navItems.map((item) => {
            const isActive = activeSection === item;
            return (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-left text-4xl font-bold tracking-tight transition-all duration-300 group flex items-center gap-4 ${
                  isActive ? 'text-primary scale-110 origin-left' : 'text-gray-500 hover:text-white'
                }`}
              >
                {/* Dot for Home or Active */}
                <span className={`w-2 h-2 rounded-full bg-primary transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></span>
                <span className="capitalize">{item}</span>
              </button>
            );
          })}
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main 
        ref={mainRef}
        className="relative z-10 xl:pl-64 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        
        <SectionWrapper id="hero" containerRef={mainRef}>
          <HeroSection />
        </SectionWrapper>

        {/* Featured Works */}
        <SectionWrapper id="projects" containerRef={mainRef}>
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 w-full">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Featured Works</h2>
              <div className="w-12 h-1.5 bg-primary rounded-full mb-6"></div>
              <p className="text-gray-400 font-medium max-w-xl mx-auto text-sm sm:text-base">A collection of systems and interfaces built with precision.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 w-full">
              {portfolioData.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="skills" containerRef={mainRef}>
          <SkillsSection />
        </SectionWrapper>

        <SectionWrapper id="education" containerRef={mainRef}>
          <EducationSection />
        </SectionWrapper>

        <SectionWrapper id="certifications" containerRef={mainRef}>
          <CertificationsSection />
        </SectionWrapper>

        <SectionWrapper id="contact" containerRef={mainRef}>
          <ContactSection />
        </SectionWrapper>
        
         {/* Compact Footer - Now inside the scroll container or at the end */}
        {/* Modern Footer */}
        {/* Modern Footer */}
        <motion.footer 
          onViewportEnter={() => setIsSidebarVisible(false)}
          onViewportLeave={() => setIsSidebarVisible(true)}
          className="bg-black border-t border-white/10 py-16 snap-start xl:-ml-64 xl:w-[calc(100%+16rem)] relative z-20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
              <div className="col-span-1 md:col-span-2 space-y-4">
                <div className="text-2xl font-bold tracking-tight text-white">
                  {portfolioData.personal.name}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  {portfolioData.personal.description}
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-white font-semibold tracking-wide">Connect</h3>
                <div className="flex flex-col gap-2">
                  <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <a href={`mailto:${portfolioData.personal.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-semibold tracking-wide">Status</h3>
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-green-500 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Open to opportunities
                  </span>
                  <p className="text-gray-500 text-xs">
                    Located in {portfolioData.personal.location}
                    <br />Available for remote work
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-xs">
                © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs font-mono">
                Built with React & Tailwind CSS
              </p>
            </div>
          </div>
        </motion.footer>
      </main>



    </div>
  );
};

export default HomePage;