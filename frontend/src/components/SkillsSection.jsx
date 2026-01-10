import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Wrench, Users, Lightbulb } from 'lucide-react';
import portfolioData from '../mock';

const SkillsSection = () => {
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

  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: portfolioData.skills.languages,
      color: "text-blue-400",
      glow: "bg-blue-400/10"
    },
    {
      title: "Frontend",
      icon: Globe,
      skills: portfolioData.skills.frontend,
      color: "text-cyan-400",
      glow: "bg-cyan-400/10"
    },
    {
      title: "Backend",
      icon: Wrench,
      skills: portfolioData.skills.frameworks,
      color: "text-indigo-400",
      glow: "bg-indigo-400/10"
    },
    {
      title: "Data",
      icon: Database,
      skills: portfolioData.skills.databases,
      color: "text-emerald-400",
      glow: "bg-emerald-400/10"
    },
    {
      title: "Dev & Ops",
      icon: Wrench,
      skills: portfolioData.skills.tools,
      color: "text-orange-400",
      glow: "bg-orange-400/10"
    },
    {
      title: "Professional",
      icon: Users,
      skills: portfolioData.skills.softSkills,
      color: "text-pink-400",
      glow: "bg-pink-400/10"
    }
  ];

  const skillIcons = {
    languages: Code,
    frontend: Globe,
    backend: Wrench,
    databases: Database,
    tools: Wrench,
    softSkills: Users,
  };

  const skillColors = {
    languages: "text-blue-400",
    frontend: "text-cyan-400",
    backend: "text-indigo-400",
    databases: "text-emerald-400",
    tools: "text-orange-400",
    softSkills: "text-pink-400",
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Background Signature Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

      <motion.div variants={itemVariants} className="flex flex-col items-center mb-12 sm:mb-20">
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-white text-center">
          Expertise & Stack
        </h2>
        <div className="w-12 h-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mb-8"></div>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto text-center font-medium px-4">
          A deep dive into the technical ecosystem I leverage to build state-of-the-art digital assets.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-24">
        {Object.entries(portfolioData.skills).map(([category, items], index) => {
          const Icon = skillIcons[category] || Wrench;
          return (
            <motion.div
              key={category}
              variants={itemVariants}
              className="group"
            >
              <div className="glass-panel-compact rounded-[2rem] p-6 h-full transition-all duration-500 hover:bg-white/5 hover:border-white/20 group">
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className={`p-3 sm:p-4 rounded-2xl bg-white/5 ${skillColors[category]} transition-transform duration-500 group-hover:scale-110`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-widest">{category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {items.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] sm:text-xs font-bold text-gray-300 transition-all hover:bg-emerald-500 hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Technical Philosophies Section */}
      <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
        <div className="glass-panel rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 to-cyan-500/50"></div>
          
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-emerald-400" />
                <h4 className="text-xl font-black text-white uppercase tracking-widest">Engineering Ethos</h4>
              </div>
              <ul className="space-y-4">
                {[
                  "Architectural integrity over rapid deployment",
                  "User-centric intersection of design and logic",
                  "Performance-first implementation patterns"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 group-hover/item:scale-150 transition-transform"></div>
                    <span className="text-sm font-medium text-gray-400 group-hover/item:text-gray-200 transition-colors uppercase tracking-tight">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-cyan-400" />
                <h4 className="text-xl font-black text-white uppercase tracking-widest">Collaborative DNA</h4>
              </div>
              <ul className="space-y-4">
                {[
                  "Agile methodology and sprint orchestration",
                  "Cross-functional communication excellence",
                  "Technical mentorship and knowledge sharing"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 group-hover/item:scale-150 transition-transform"></div>
                    <span className="text-sm font-medium text-gray-400 group-hover/item:text-gray-200 transition-colors uppercase tracking-tight">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillsSection;