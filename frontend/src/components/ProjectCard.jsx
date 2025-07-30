import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const ProjectCard = ({ project, darkMode = true }) => {
  const getStatusColor = (status) => {
    if (darkMode) {
      switch (status) {
        case 'completed':
          return 'bg-green-900/30 text-green-400 border-green-800';
        case 'ongoing':
          return 'bg-blue-900/30 text-blue-400 border-blue-800';
        default:
          return 'bg-gray-800/30 text-gray-400 border-gray-700';
      }
    } else {
      switch (status) {
        case 'completed':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'ongoing':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
  };

  const getBgColorClass = (bgColor) => {
    if (darkMode) {
      switch (bgColor) {
        case 'light-pink':
          return 'bg-gradient-to-br from-pink-900/20 to-rose-800/20 border-pink-800/30';
        case 'mid-blue':
          return 'bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-800/30';
        case 'mid-purple':
          return 'bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-800/30';
        default:
          return 'bg-gradient-to-br from-gray-800/20 to-gray-700/20 border-gray-700/30';
      }
    } else {
      switch (bgColor) {
        case 'light-pink':
          return 'bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200';
        case 'mid-blue':
          return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
        case 'mid-purple':
          return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200';
        default:
          return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
      }
    }
  };

  return (
    <motion.div
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 } 
      }}
      className="h-full"
    >
      <Card className={`h-full ${getBgColorClass(project.bgColor)} border-2 hover:shadow-xl transition-all duration-300 overflow-hidden ${
        darkMode ? 'hover:shadow-blue-500/20' : ''
      }`}>
        <div className="p-4 sm:p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <Badge className={`${getStatusColor(project.status)} text-xs font-medium w-fit`}>
                  {project.status === 'ongoing' ? 'In Progress' : 'Completed'}
                </Badge>
                <Badge variant="outline" className={`text-xs w-fit ${
                  darkMode ? 'border-gray-600 text-gray-400' : ''
                }`}>
                  {project.category}
                </Badge>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-2 hover:text-blue-500 transition-colors cursor-pointer ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {project.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm sm:text-base mb-4 flex-grow leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <Tag className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Technologies
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className={`text-xs transition-colors ${
                    darkMode 
                      ? 'bg-gray-700/70 text-gray-300 hover:bg-gray-600/70' 
                      : 'bg-white/70 text-gray-700 hover:bg-white'
                  }`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Key Features:
            </h4>
            <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {project.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span className="text-xs sm:text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={`flex-1 text-xs sm:text-sm transition-colors ${
                darkMode 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 text-gray-300' 
                  : 'bg-white/50 hover:bg-white border-gray-300'
              }`}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`sm:w-auto transition-colors ${
                darkMode 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-600 text-gray-300' 
                  : 'bg-white/50 hover:bg-white border-gray-300'
              }`}
            >
              <Github className="w-4 h-4 sm:mr-0" />
              <span className="sm:hidden ml-2">Code</span>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;