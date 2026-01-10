import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Code } from 'lucide-react';
import { Button } from './ui/button';
import portfolioData from '../mock';

const CertificationsSection = () => {
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

  const getBgGradient = (type) => {
    switch (type) {
      case 'programming': return 'bg-blue-500/10 text-blue-400';
      case 'database': return 'bg-green-500/10 text-green-400';
      case 'api': return 'bg-purple-500/10 text-purple-400';
      case 'systems': return 'bg-orange-500/10 text-orange-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
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
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

      <motion.div variants={itemVariants} className="flex flex-col items-center mb-12 sm:mb-20">
        <h2 className="text-4xl md:text-5xl font-black mb-4 text-white text-center">
          Verified Expertise
        </h2>
        <div className="w-12 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mb-8"></div>
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto text-center font-medium px-4">
          A showcase of industry-recognized credentials and technical specialized certifications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {portfolioData.certifications.map((cert) => (
          <motion.div
            key={cert.id}
            variants={itemVariants}
            className="group"
          >
            <div className="glass-panel-compact h-full rounded-[2rem] p-6 sm:p-8 transition-all duration-500 hover:bg-white/5 hover:border-white/20 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 sm:p-4 rounded-2xl bg-white/5 text-purple-400 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{cert.year}</span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold border border-purple-500/20">{cert.type}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 Transition-colors line-clamp-2">
                {cert.name}
              </h3>
              <p className="text-sm font-bold text-gray-400 mb-8 flex items-center gap-2">
                <div className="w-1 h-3 bg-purple-500 rounded-full"></div>
                {cert.issuer}
              </p>

              <div className="mt-auto">
                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl bg-white/5 border-white/5 hover:bg-purple-500 hover:text-white transition-all text-[10px] font-black tracking-widest py-6"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> VERIFY CREDENTIAL
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modern SummaryHUD */}
      <motion.div variants={itemVariants} className="mt-16 sm:mt-24">
        <div className="glass-panel rounded-[2.5rem] p-8 sm:p-12 overflow-hidden relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 relative z-10">
            {[
              { label: "Total Certificates", value: portfolioData.certifications.length, icon: Award, color: "text-purple-400" },
              { label: "Programming Stack", value: "SWAYAM", icon: Code, color: "text-emerald-400" },
              { label: "API Mastery", value: "Postman", icon: ExternalLink, color: "text-blue-400" },
              { label: "Infrastructure", value: "Cisco", icon: Calendar, color: "text-orange-400" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={`w-12 h-12 rounded-2xl ${stat.color} bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</h4>
                <p className="text-xl sm:text-2xl font-black text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CertificationsSection;
