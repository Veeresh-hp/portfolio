import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import portfolioData from '../mock';

const EducationSection = ({ darkMode = true }) => {
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
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const getStatusColor = (status) => {
    if (darkMode) {
      switch (status) {
        case 'ongoing':
          return 'bg-blue-900/30 text-blue-400 border-blue-800';
        case 'completed':
          return 'bg-green-900/30 text-green-400 border-green-800';
        default:
          return 'bg-gray-800/30 text-gray-400 border-gray-700';
      }
    } else {
      switch (status) {
        case 'ongoing':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'completed':
          return 'bg-green-100 text-green-800 border-green-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
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
          Education
        </h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
        <p className={`text-lg max-w-2xl mx-auto px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          My academic journey and educational background
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline Line */}
        <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-0.5 ${
          darkMode ? 'bg-gray-600' : 'bg-gray-300'
        }`}></div>

        <motion.div className="space-y-8" variants={containerVariants}>
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full transform md:-translate-x-2 z-10 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className={`border-2 hover:shadow-lg transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-800/50 border-gray-700 hover:border-blue-600/50 hover:shadow-blue-500/20' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}>
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div className="flex items-center mb-3 sm:mb-0">
                          <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                          </div>
                          <Badge className={`${getStatusColor(edu.status)} text-xs font-medium`}>
                            {edu.status === 'ongoing' ? 'Currently Pursuing' : 'Completed'}
                          </Badge>
                        </div>
                      </div>

                      <h3 className={`text-lg sm:text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {edu.degree}
                      </h3>
                      
                      <h4 className="text-base sm:text-lg font-semibold text-blue-500 mb-3">
                        {edu.institution}
                      </h4>

                      <div className="space-y-2 mb-4">
                        <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm">{edu.location}</span>
                        </div>
                        <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm">{edu.year}</span>
                        </div>
                        <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <Award className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm font-medium">{edu.score}</span>
                        </div>
                      </div>

                      {/* Score Visualization */}
                      {edu.id === 1 && (
                        <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              CGPA Progress
                            </span>
                            <span className="text-sm font-bold text-blue-500">7.9/10</span>
                          </div>
                          <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: '79%' }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Academic Highlights */}
      <motion.div variants={itemVariants} className="mt-12 md:mt-16">
        <Card className={`border-2 transition-colors ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/50' 
            : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
        }`}>
          <div className="p-6 sm:p-8">
            <h3 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Academic Highlights
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h4 className={`text-base sm:text-lg font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  Current CGPA
                </h4>
                <p className="text-xl sm:text-2xl font-bold text-blue-500">7.9/10</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className={`text-base sm:text-lg font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  PUC Score
                </h4>
                <p className="text-xl sm:text-2xl font-bold text-green-500">76.67%</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className={`text-base sm:text-lg font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  10th Grade
                </h4>
                <p className="text-xl sm:text-2xl font-bold text-purple-500">89.6%</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default EducationSection;