import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import portfolioData from '../mock';

const CertificationsSection = ({ darkMode = true }) => {
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

  const getTypeColor = (type) => {
    if (darkMode) {
      switch (type) {
        case 'programming':
          return 'bg-blue-900/30 text-blue-400 border-blue-800';
        case 'database':
          return 'bg-green-900/30 text-green-400 border-green-800';
        case 'api':
          return 'bg-purple-900/30 text-purple-400 border-purple-800';
        case 'systems':
          return 'bg-orange-900/30 text-orange-400 border-orange-800';
        default:
          return 'bg-gray-800/30 text-gray-400 border-gray-700';
      }
    } else {
      switch (type) {
        case 'programming':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'database':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'api':
          return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'systems':
          return 'bg-orange-100 text-orange-800 border-orange-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
  };

  const getTypeIcon = (type) => {
    const iconClass = "w-6 h-6 sm:w-8 sm:h-8 text-white";
    switch (type) {
      case 'programming':
        return <Tag className={iconClass} />;
      case 'database':
        return <Award className={iconClass} />;
      case 'api':
        return <ExternalLink className={iconClass} />;
      case 'systems':
        return <Award className={iconClass} />;
      default:
        return <Award className={iconClass} />;
    }
  };

  const getBgGradient = (type) => {
    switch (type) {
      case 'programming':
        return 'from-blue-500 to-blue-600';
      case 'database':
        return 'from-green-500 to-green-600';
      case 'api':
        return 'from-purple-500 to-purple-600';
      case 'systems':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Certifications
        </h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
        <p className={`text-lg max-w-2xl mx-auto px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Professional certifications and learning achievements that validate my technical expertise
        </p>
      </motion.div>

      <motion.div 
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12"
        variants={containerVariants}
      >
        {portfolioData.certifications.map((cert) => (
          <motion.div key={cert.id} variants={itemVariants}>
            <motion.div
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 } 
              }}
              className="h-full"
            >
              <Card className={`h-full border-2 hover:shadow-lg transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700 hover:border-blue-600/50 hover:shadow-blue-500/20' 
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}>
                <div className="p-4 sm:p-6 flex flex-col h-full">
                  {/* Header with Icon */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${getBgGradient(cert.type)} mb-3 sm:mb-0 w-fit`}>
                      {getTypeIcon(cert.type)}
                    </div>
                    <Badge className={`${getTypeColor(cert.type)} text-xs font-medium w-fit`}>
                      {cert.type.charAt(0).toUpperCase() + cert.type.slice(1)}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className={`text-base sm:text-lg font-bold mb-3 leading-tight ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {cert.name}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Award className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm font-medium">{cert.issuer}</span>
                      </div>
                      <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm">{cert.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`w-full text-xs sm:text-sm transition-colors ${
                        darkMode 
                          ? 'bg-gray-700/50 hover:bg-gray-600/50 border-gray-600 text-gray-300' 
                          : 'bg-gray-50 hover:bg-gray-100 border-gray-300'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Certificate
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Certification Summary */}
      <motion.div variants={itemVariants}>
        <Card className={`border-2 transition-colors ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800/50 to-blue-900/20 border-gray-700/50' 
            : 'bg-gradient-to-br from-gray-50 to-blue-50 border-gray-200'
        }`}>
          <div className="p-6 sm:p-8">
            <h3 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Certification Summary
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className={`text-sm sm:text-lg font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Total Certifications
                </h4>
                <p className="text-2xl sm:text-3xl font-bold text-blue-500">{portfolioData.certifications.length}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className={`text-sm sm:text-lg font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Programming
                </h4>
                <p className="text-2xl sm:text-3xl font-bold text-green-500">
                  {portfolioData.certifications.filter(cert => cert.type === 'programming').length}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className={`text-sm sm:text-lg font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Platforms
                </h4>
                <p className="text-2xl sm:text-3xl font-bold text-purple-500">3</p>
                <p className={`text-xs sm:text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  SWAYAM, Postman, Cisco
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h4 className={`text-sm sm:text-lg font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Recent Year
                </h4>
                <p className="text-2xl sm:text-3xl font-bold text-orange-500">2023</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CertificationsSection;