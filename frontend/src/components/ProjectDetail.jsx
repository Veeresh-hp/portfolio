import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Users, Lightbulb, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import portfolioData from '../mock';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = portfolioData.projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <div className="text-center group">
          <div className="relative mb-8">
            <h1 className="text-4xl font-black mb-4 group-hover:text-primary transition-colors">404</h1>
            <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full -z-10"></div>
          </div>
          <p className="text-gray-400 mb-8 font-medium">Mission Aborted: Project Not Found</p>
          <Button onClick={() => navigate('/')} className="rounded-2xl bg-primary hover:bg-primary/90 py-6 px-8 text-lg font-bold">
            Return to Base
          </Button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-background relative selection:bg-primary selection:text-white">
      {/* Decorative Glows */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none -z-10"></div>
      
      {/* Navigation */}
      <nav className="sticky top-6 z-50 max-w-7xl mx-auto px-4 pointer-events-none">
        <div className="glass-panel rounded-full px-6 py-3 flex justify-between items-center bg-black/40 pointer-events-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="rounded-full text-gray-400 hover:text-white hover:bg-white/5 font-bold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Back to Portfoilo</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary hidden md:block">Project Dossier // {project.id}</span>
            <div className="w-1 h-4 bg-white/10 rounded-full hidden md:block"></div>
            <h1 className="text-sm font-black text-white truncate max-w-[150px] md:max-w-none">
              {project.title}
            </h1>
          </div>
        </div>
      </nav>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Project Header Card */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="glass-panel rounded-[3rem] p-10 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  project.status === 'completed' 
                    ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                    : 'bg-primary/10 text-primary-foreground border-primary/20'
                }`}>
                  {project.status === 'ongoing' ? 'Active Pursuit' : 'Mission Accomplished'}
                </span>
                <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-1 rounded-full">{project.category}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-8 text-white leading-tight">
                {project.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 max-w-4xl leading-relaxed font-medium mb-12">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="rounded-2xl bg-primary hover:bg-primary/90 text-white py-8 px-10 text-lg font-black tracking-widest shadow-[0_10px_40px_rgba(67,56,202,0.3)]">
                  <ExternalLink className="w-6 h-6 mr-3" /> INITIALIZE DEMO
                </Button>
                <Button variant="outline" className="rounded-2xl bg-white/5 border-white/5 hover:bg-white/10 text-white py-8 px-10 text-lg font-black tracking-widest">
                  <Github className="w-6 h-6 mr-3" /> SOURCE CODE
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Dossier */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features Section */}
            <motion.div variants={itemVariants}>
              <div className="glass-panel rounded-[2.5rem] p-10 md:p-12">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-black text-white">Advanced Features</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 group">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2.5 group-hover:scale-150 transition-transform"></div>
                      <span className="text-lg font-medium text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Technical Context */}
            <motion.div variants={itemVariants}>
              <div className="glass-panel rounded-[2.5rem] p-10 md:p-12">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 rounded-2xl bg-cyan-400/10 text-cyan-400">
                    <Tag className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-black text-white">Technology Stack</h2>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-12">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary-foreground font-bold text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5">
                  <h3 className="text-xl font-black text-white mb-4">Architectural Integrity</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-medium lowercase first-letter:uppercase">
                    This implementation leverages state-of-the-art methodologies ensuring maximum throughput and minimal overhead. focused on the intersection of performance and aesthetics, the architectural choices reflect a commitment to robust, scalable engineering.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Intel Sidebar */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <div className="glass-panel rounded-[2.5rem] p-8">
                <h3 className="text-lg font-black text-white mb-6 uppercase tracking-widest border-b border-white/5 pb-4">Internal Intel</h3>
                <div className="space-y-6">
                  {[
                    { icon: Calendar, label: "Deployment Cycle", value: "Q1 - 2024" },
                    { icon: Tag, label: "Core Classification", value: project.category },
                    { icon: Users, label: "Deployment Role", value: "Lead Engineer" }
                  ].map((info, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="p-3 rounded-xl bg-white/5 text-gray-500 group-hover:text-primary transition-colors">
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{info.label}</p>
                        <p className="text-white font-bold">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="glass-panel rounded-[2.5rem] p-8">
                <h3 className="text-lg font-black text-white mb-6 uppercase tracking-widest border-b border-white/5 pb-4">Related Operatives</h3>
                <div className="space-y-4">
                  {portfolioData.projects
                    .filter(p => p.id !== project.id)
                    .slice(0, 2)
                    .map((rp) => (
                      <div 
                        key={rp.id}
                        className="p-5 rounded-2xl bg-white/5 border border-white/5 cursor-pointer transition-all hover:bg-white/10 group active:scale-95"
                        onClick={() => navigate(`/project/${rp.id}`)}
                      >
                        <h4 className="font-bold text-white mb-2 group-hover:text-primary transition-colors">
                          {rp.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-2 font-medium">
                          {rp.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="glass-panel rounded-[2.5rem] p-10 bg-gradient-to-br from-primary/20 to-indigo-900/20 border-primary/20 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-2xl font-black text-white mb-4 relative z-10">Forge the Future?</h3>
                <p className="text-gray-400 font-medium mb-8 relative z-10">Initiate a collaboration to build next-generation systems.</p>
                <Button className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-white py-7 text-lg font-bold relative z-10">
                  CONTACT BASE
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;