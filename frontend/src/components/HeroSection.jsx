import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code, Database, Brain, Sparkles, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import portfolioData from '../mock';

const HeroSection = ({ darkMode = true }) => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`relative min-h-screen flex items-center overflow-hidden transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orbs and sparkles... */}
        <motion.div 
          className={`absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 ${
            darkMode ? 'bg-blue-600' : 'bg-blue-200'
          }`}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className={`absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 ${
            darkMode ? 'bg-purple-600' : 'bg-purple-200'
          }`}
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className={`absolute -bottom-32 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 ${
            darkMode ? 'bg-pink-600' : 'bg-pink-200'
          }`}
          animate={{ scale: [1, 1.3, 1], x: [-50, 50, -50] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {darkMode && (
          <>
            <motion.div className="absolute top-1/4 left-1/4 text-blue-400" variants={sparkleVariants} animate="animate">
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <motion.div className="absolute top-1/3 right-1/4 text-purple-400" variants={sparkleVariants} animate="animate" transition={{ delay: 1 }}>
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <motion.div className="absolute bottom-1/3 left-1/3 text-pink-400" variants={sparkleVariants} animate="animate" transition={{ delay: 2 }}>
              <Sparkles className="w-3 h-3" />
            </motion.div>
          </>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Content */}
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                {portfolioData.personal.name}
              </span>
            </h1>
            <p className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed px-4 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {portfolioData.personal.title} passionate about building scalable, 
              high-performance systems to solve real-world problems.
            </p>
            
            {/* Social Links - NEWLY ADDED */}
            <motion.div variants={itemVariants} className="flex justify-center items-center gap-4">
                <a href = "https://github.com/Veeresh-hp" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className={`transition-colors ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        <Github className="w-5 h-5 mr-2" />
                        GitHub
                    </Button>
                </a>
                <a href="https://www.linkedin.com/in/veereshhp" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className={`transition-colors ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn
                    </Button>
                </a>
            </motion.div>

          </motion.div>

          {/* Skills Icons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 my-12 px-4">
            <motion.div className={`flex flex-col items-center p-4 rounded-xl shadow-lg transition-colors ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`} variants={floatingVariants} animate="animate">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mb-2" />
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Stack</span>
            </motion.div>
            <motion.div className={`flex flex-col items-center p-4 rounded-xl shadow-lg transition-colors ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`} variants={floatingVariants} animate="animate" transition={{ delay: 0.5 }}>
              <Database className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mb-2" />
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Databases</span>
            </motion.div>
            <motion.div className={`flex flex-col items-center p-4 rounded-xl shadow-lg transition-colors ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`} variants={floatingVariants} animate="animate" transition={{ delay: 1 }}>
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mb-2" />
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>AI/ML</span>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg" onClick={scrollToProjects}>
              View My Work
            </Button>
            <Button variant="outline" size="lg" className={`px-6 sm:px-8 py-3 text-base sm:text-lg transition-colors ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} onClick={scrollToContact}>
              Get In Touch
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block" variants={itemVariants}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="cursor-pointer" onClick={scrollToProjects}>
              <ArrowDown className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
