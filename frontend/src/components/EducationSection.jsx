import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import portfolioData from '../mock';

const EducationSection = () => {
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
    switch (status) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Education</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          My academic journey and educational background
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform md:-translate-x-0.5"></div>

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
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full transform md:-translate-x-2 z-10 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 rounded-lg mr-3">
                            <GraduationCap className="w-6 h-6 text-blue-600" />
                          </div>
                          <Badge className={`${getStatusColor(edu.status)} text-xs font-medium`}>
                            {edu.status === 'ongoing' ? 'Currently Pursuing' : 'Completed'}
                          </Badge>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {edu.degree}
                      </h3>
                      
                      <h4 className="text-lg font-semibold text-blue-600 mb-3">
                        {edu.institution}
                      </h4>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm">{edu.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm">{edu.year}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Award className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm font-medium">{edu.score}</span>
                        </div>
                      </div>

                      {/* Score Visualization */}
                      {edu.id === 1 && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">CGPA Progress</span>
                            <span className="text-sm font-bold text-blue-600">7.9/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
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
      <motion.div variants={itemVariants} className="mt-16">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Academic Highlights</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Current CGPA</h4>
                <p className="text-2xl font-bold text-blue-600">7.9/10</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">PUC Score</h4>
                <p className="text-2xl font-bold text-green-600">76.67%</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">10th Grade</h4>
                <p className="text-2xl font-bold text-purple-600">89.6%</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default EducationSection;