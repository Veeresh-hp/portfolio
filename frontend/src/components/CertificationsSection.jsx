import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
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

  const getTypeColor = (type) => {
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
  };

  const getTypeIcon = (type) => {
    const iconClass = "w-8 h-8 text-white";
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
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Certifications</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Professional certifications and learning achievements that validate my technical expertise
        </p>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
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
              <Card className="h-full bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="p-6 flex flex-col h-full">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${getBgGradient(cert.type)}`}>
                      {getTypeIcon(cert.type)}
                    </div>
                    <Badge className={`${getTypeColor(cert.type)} text-xs font-medium`}>
                      {cert.type.charAt(0).toUpperCase() + cert.type.slice(1)}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                      {cert.name}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Award className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm font-medium">{cert.issuer}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
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
                      className="w-full bg-gray-50 hover:bg-gray-100 border-gray-300"
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
        <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Certification Summary</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Total Certifications</h4>
                <p className="text-3xl font-bold text-blue-600">{portfolioData.certifications.length}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Programming</h4>
                <p className="text-3xl font-bold text-green-600">
                  {portfolioData.certifications.filter(cert => cert.type === 'programming').length}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Platforms</h4>
                <p className="text-3xl font-bold text-purple-600">3</p>
                <p className="text-sm text-gray-600 mt-1">SWAYAM, Postman, Cisco</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Recent Year</h4>
                <p className="text-3xl font-bold text-orange-600">2023</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CertificationsSection;