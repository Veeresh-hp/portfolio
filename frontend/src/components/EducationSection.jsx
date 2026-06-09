import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, Brain } from 'lucide-react';
import portfolioData from '../mock';

const EducationSection = () => {
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
    hidden: { opacity: 0, y: 20 },
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

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Background Signature Glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

      <motion.div variants={itemVariants} className="flex flex-col items-center mb-12 sm:mb-20">
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-white text-center">
          Academic Journey
        </h2>
        <div className="w-12 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-8"></div>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto text-center font-medium px-4">
          A track record of academic excellence and continuous technical learning.
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        {/* Modern Vertical Timeline */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-amber-500/50 to-transparent transform md:-translate-x-px"></div>

        <div className="space-y-8 sm:space-y-12">
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                index % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Point on Timeline */}
              <div className="absolute left-6 md:left-1/2 w-3.5 h-3.5 bg-background border-2 border-orange-500 rounded-full transform -translate-x-[6.5px] md:-translate-x-1.5 z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse-slow"></div>
              </div>

              {/* Content Card */}
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-5 w-full">
                <div className="glass-panel-compact rounded-[2rem] p-6 transition-all duration-500 hover:bg-white/5 hover:border-white/20 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                      edu.status === 'completed' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {edu.status === 'ongoing' ? 'In Progress' : 'Completed'}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-white mb-1 group-hover:text-orange-400 transition-colors">
                    {edu.degree}
                  </h3>
                  <h4 className="text-base font-bold text-gray-300 mb-5 flex items-center gap-2">
                    <div className="w-1 h-3.5 bg-amber-400 rounded-full"></div>
                    {edu.institution}
                  </h4>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-400 font-medium">
                      <MapPin className="w-4 h-4 mr-3 text-orange-500" />
                      <span className="text-xs sm:text-sm">{edu.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400 font-medium">
                      <Calendar className="w-4 h-4 mr-3 text-orange-500" />
                      <span className="text-xs sm:text-sm">{edu.year}</span>
                    </div>
                  </div>

                  {/* Progressive Score Bar */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-2 text-[10px] font-bold text-white uppercase tracking-wider">
                      <span>Performance Index</span>
                      <span className="text-orange-400">{edu.score}</span>
                    </div>
                    <div className="w-full rounded-full h-1 bg-white/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Metrics HUD */}
      <motion.div variants={itemVariants} className="mt-16 sm:mt-24">
        <div className="glass-panel rounded-[2.5rem] p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 relative z-10">
            {[
              { label: "Engineering CGPA", value: "8.2/10", icon: Award, color: "text-orange-400" },
              { label: "High School Score", value: "89.6%", icon: Award, color: "text-amber-400" },
              { label: "Analytical Thinking", value: "Top Tier", icon: Brain, color: "text-rose-400" }
            ].map((metric, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className={`p-4 rounded-2xl bg-white/5 ${metric.color} mb-5 sm:mb-6 transition-transform duration-500 group-hover:scale-110`}>
                  <metric.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h4 className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{metric.label}</h4>
                <p className="text-2xl sm:text-3xl font-black text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EducationSection;
