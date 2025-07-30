import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Wrench, Users, Lightbulb } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import portfolioData from '../mock';

const SkillsSection = () => {
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

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: portfolioData.skills.languages,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Frontend Technologies",
      icon: Globe,
      skills: portfolioData.skills.frontend,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Frameworks",
      icon: Wrench,
      skills: portfolioData.skills.frameworks,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Databases",
      icon: Database,
      skills: portfolioData.skills.databases,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Tools",
      icon: Wrench,
      skills: portfolioData.skills.tools,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Soft Skills",
      icon: Users,
      skills: portfolioData.skills.softSkills,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50"
    }
  ];

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A comprehensive overview of my technical skills and the technologies I work with
        </p>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {skillCategories.map((category, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className={`h-full ${category.bgColor} border-2 hover:shadow-lg transition-all duration-300`}>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="mr-2 mb-2 bg-white/70 text-gray-700 hover:bg-white transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Visualization */}
      <motion.div variants={itemVariants} className="mt-16">
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technical Proficiency</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  Core Strengths
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Object-Oriented Programming (OOP)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Data Structures and Algorithms (DSA)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Full-Stack Web Development
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Natural Language Processing (NLP)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  Professional Skills
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                    Problem Solving
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    Team Collaboration
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    Adaptability
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Critical Thinking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SkillsSection;