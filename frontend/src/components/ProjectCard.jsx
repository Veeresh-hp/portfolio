import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-full group"
    >
      <div className="glass-panel-compact h-full rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:bg-white/5 hover:border-white/20">
        <div className="p-6 flex flex-col h-full">
          {/* Status & Category */}
          <div className="flex justify-between items-center mb-5 sm:mb-6">
            <span className={`px-3 sm:px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
              project.status === 'completed' 
                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                : 'bg-primary/10 text-primary-foreground border-primary/20'
            }`}>
              {project.status === 'ongoing' ? 'Ongoing' : 'Finished'}
            </span>
            <span className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 flex-grow font-medium">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tight"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1.5 text-[10px] font-bold text-gray-600">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button 
                  className="w-full rounded-2xl bg-white/5 hover:bg-primary text-white border border-white/5 hover:border-primary transition-all duration-300 text-[10px] sm:text-xs font-black tracking-widest py-6 sm:py-7 uppercase"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  DEPLOYMENT
                </Button>
              </a>
            ) : (
              <Button 
                disabled
                className="flex-1 rounded-2xl bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed opacity-50 text-[10px] sm:text-xs font-black tracking-widest py-6 sm:py-7 uppercase"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                No Deployed Link
              </Button>
            )}

            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 flex-shrink-0"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;