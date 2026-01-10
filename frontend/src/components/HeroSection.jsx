import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Code, Database, Brain, Sparkles, Github, Linkedin, ArrowRight, FileText } from 'lucide-react';
import { Button } from './ui/button';
import portfolioData from '../mock';

const HeroSection = () => {
  const [ctaUrl, setCtaUrl] = useState('https://www.myalltools.shop/');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const checkUrl = async () => {
      try {
        await fetch('https://www.myalltools.shop/', { mode: 'no-cors', cache: 'no-store' });
        setCtaUrl('https://www.myalltools.shop/');
      } catch (error) {
        console.warn('Primary URL unreachable, using fallback');
        setCtaUrl('https://myalltools.vercel.app/');
      }
    };
    checkUrl();
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12">
      
      {/* Text Content */}
      <motion.div 
        className="flex-1 text-center md:text-left z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Announcement Badge with Preview */}
        <div 
          className="relative inline-block mt-24 md:mt-0"
          onMouseEnter={() => setShowPreview(true)} 
          onMouseLeave={() => setShowPreview(false)}
        >
          <motion.a 
            href={ctaUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            variants={itemVariants} 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300 group mb-6 cursor-pointer"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600">
              <Sparkles className="w-3 h-3 text-white" />
            </span>
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              Check out my AI Tools Hub
            </span>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
          </motion.a>

          {/* Website Preview Tooltip */}
          <AnimatePresence>
            {showPreview && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-4 z-50 w-[300px] sm:w-[400px] aspect-[16/9] rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-gray-900"
              >
                 {/* Loading Placeholder */}
                <div className="absolute inset-0 bg-gray-800 animate-pulse z-0"></div>
                
                {/* Iframe Preview - Scaled */}
                <div className="w-full h-full relative z-10">
                   {/* Interaction Blocker to prevent mouse trapping */}
                  <div className="absolute inset-0 z-20"></div> 
                  <iframe 
                    src="https://myalltools.vercel.app/" 
                    title="Website Preview"
                    className="w-[200%] h-[200%] transform scale-[0.5] origin-top-left border-0 bg-white"
                    loading="lazy"
                  />
                </div>
                
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 z-30 flex items-center justify-between border-t border-white/10">
                   <span className="text-xs text-white font-medium pl-1">Live Preview</span>
                   <span className="text-[10px] text-gray-400">{ctaUrl.replace('https://', '')}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
           <div className="h-[1px] w-8 bg-gray-500"></div>
           <span className="text-gray-400 text-sm uppercase tracking-widest">Hello</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          I'm <span className="text-white">{portfolioData.personal.name}</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
          {portfolioData.personal.title}. {portfolioData.personal.description}
        </motion.p>
 
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <Button 
            size="lg" 
            className="rounded-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300" 
            onClick={scrollToProjects}
          >
            Learn more
          </Button>
          
          <a href="/resume/veeresh_H_P_RESUME.pdf" target="_blank" rel="noopener noreferrer">
             <Button 
                size="lg" 
                variant="outline"
                className="rounded-lg px-8 py-6 border-white/10 bg-white/5 hover:bg-white/10 text-white text-base font-semibold transition-all duration-300 backdrop-blur-sm"
             >
                <FileText className="w-5 h-5 mr-2" />
                View Resume
             </Button>
          </a>
        </motion.div>
      </motion.div>

      {/* Image Content */}
      <motion.div 
        className="flex-1 relative w-full flex justify-center md:justify-end"
        initial="hidden"
        animate="visible"
      >
        {/* Decorative Floating Elements (Simulating the cubes in the reference) */}
        <motion.div 
          variants={floatingVariants} 
          animate="animate"
          className="absolute top-0 right-10 w-16 h-16 bg-primary/80 rotate-12 blur-sm rounded-xl opacity-80 z-0"
        ></motion.div>
        <motion.div 
          variants={floatingVariants} 
          animate="animate"
          className="absolute bottom-10 left-10 w-12 h-12 bg-primary/60 -rotate-12 blur-sm rounded-lg opacity-60 z-0"
          style={{ animationDelay: '1s' }}
        ></motion.div>

         <motion.div variants={imageVariants} className="relative z-10 w-full max-w-lg">
            <img 
              src="/hero-character.png" 
              alt="3D Character" 
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
         </motion.div>
      </motion.div>

    </div>
  );
};

export default HeroSection;
