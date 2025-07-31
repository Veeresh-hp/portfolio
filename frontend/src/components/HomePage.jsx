import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Download, Menu, X, Moon, Sun, Eye } from 'lucide-react'; // Import Eye icon
import { Button } from './ui/button';
import portfolioData from '../mock';
import HeroSection from './HeroSection';
import ProjectCard from './ProjectCard';
import SkillsSection from './SkillsSection';
import EducationSection from './EducationSection';
import CertificationsSection from './CertificationsSection';
import ContactSection from './ContactSection';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'education', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const navItems = ['About', 'Projects', 'Skills', 'Education', 'Contact'];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className={`text-xl font-bold transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Veeresh H P
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.toLowerCase()
                        ? darkMode 
                          ? 'text-blue-400 bg-blue-900/30' 
                          : 'text-blue-600 bg-blue-50'
                        : darkMode
                          ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className={`ml-4 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`md:hidden py-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-4 py-2 text-left rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.toLowerCase()
                        ? darkMode 
                          ? 'text-blue-400 bg-blue-900/30' 
                          : 'text-blue-600 bg-blue-50'
                        : darkMode
                          ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-16">
        <HeroSection darkMode={darkMode} />
      </section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className={`py-12 md:py-20 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              About Me
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="space-y-6 text-center">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {portfolioData.personal.title}
              </h3>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {portfolioData.personal.description}
              </p>
              
              <div className="flex justify-center pt-4">
                {/* --- CORRECTED FILE PATH --- */}
                <a href="/resume/Veeresh_H_P_Resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className={`${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        View Resume
                    </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className={`py-12 md:py-20 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
          </motion.div>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={containerVariants}
          >
            {portfolioData.projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} darkMode={darkMode} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Other Sections... */}
      <section id="skills" className={`py-12 md:py-20 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <SkillsSection darkMode={darkMode} />
      </section>
      <section id="education" className={`py-12 md:py-20 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <EducationSection darkMode={darkMode} />
      </section>
      <section id="certifications" className={`py-12 md:py-20 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <CertificationsSection darkMode={darkMode} />
      </section>
      <section id="contact" className={`py-12 md:py-20 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <ContactSection darkMode={darkMode} />
      </section>

      {/* --- SIMPLIFIED FOOTER --- */}
      <footer className={`py-6 transition-colors ${darkMode ? 'bg-black/50 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 Veeresh H P. All rights reserved.
            </p>
            <div className="flex items-center space-x-5">
              <a href="mailto:veereshhp2004@gmail.com" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-blue-600'} transition-colors`}>
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://github.com/Veeresh-hp" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-blue-600'} transition-colors`}>
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/veereshhp/" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-blue-600'} transition-colors`}>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
