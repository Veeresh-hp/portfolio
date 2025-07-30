import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const ProjectCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getBgColorClass = (bgColor) => {
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
  };

  return (
    <motion.div
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 } 
      }}
      className="h-full"
    >
      <Card className={`h-full ${getBgColorClass(project.bgColor)} border-2 hover:shadow-xl transition-all duration-300 overflow-hidden`}>
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`${getStatusColor(project.status)} text-xs font-medium`}>
                  {project.status === 'ongoing' ? 'In Progress' : 'Completed'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {project.category}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 flex-grow leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs bg-white/70 text-gray-700 hover:bg-white transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {project.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-auto flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-white/50 hover:bg-white border-gray-300"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/50 hover:bg-white border-gray-300"
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;