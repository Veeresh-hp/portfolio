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
  const [darkMode, setDarkMode] = React.useState(true); // Default to dark mode

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
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

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
        darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className={`mr-4 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <h1 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {project.title}
              </h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </nav>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Project Header */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <Badge className={project.status === 'ongoing' 
              ? (darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800')
              : (darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800')
            }>
              {project.status === 'ongoing' ? 'In Progress' : 'Completed'}
            </Badge>
            <Badge variant="outline" className={darkMode ? 'border-gray-600 text-gray-400' : ''}>
              {project.category}
            </Badge>
          </div>
          
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {project.title}
          </h1>
          
          <p className={`text-lg sm:text-xl max-w-3xl leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {project.description}
          </p>
        </motion.div>

        {/* Project Actions */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
          <Button variant="outline" className={darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : ''}>
            <Github className="w-4 h-4 mr-2" />
            View Code
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Features Section */}
            <motion.div variants={itemVariants}>
              <Card className={`p-4 sm:p-6 transition-colors ${
                darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center mb-6">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-3" />
                  <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Key Features
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-start p-3 sm:p-4 rounded-lg transition-colors ${
                        darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Technical Details */}
            <motion.div variants={itemVariants}>
              <Card className={`p-4 sm:p-6 transition-colors ${
                darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center mb-6">
                  <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-3" />
                  <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Technical Implementation
                  </h2>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className={`text-base sm:text-lg font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className={`text-xs sm:text-sm ${
                          darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'
                        }`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className={`text-base sm:text-lg font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      Project Highlights
                    </h3>
                    <div className={`prose max-w-none ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <p className="text-sm sm:text-base leading-relaxed">
                        This project demonstrates my ability to work with modern web technologies and implement complex features. 
                        The application showcases best practices in software development including clean code architecture, 
                        responsive design, and user-centered development.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <motion.div variants={itemVariants}>
              <Card className={`p-4 sm:p-6 transition-colors ${
                darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-base sm:text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Project Information
                </h3>
                <div className="space-y-3">
                  <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">Status: {project.status}</span>
                  </div>
                  <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Tag className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">Category: {project.category}</span>
                  </div>
                  <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">Role: Full Stack Developer</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Related Projects */}
            <motion.div variants={itemVariants}>
              <Card className={`p-4 sm:p-6 transition-colors ${
                darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`text-base sm:text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Related Projects
                </h3>
                <div className="space-y-3">
                  {portfolioData.projects
                    .filter(p => p.id !== project.id)
                    .slice(0, 2)
                    .map((relatedProject) => (
                      <div 
                        key={relatedProject.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          darkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => navigate(`/project/${relatedProject.id}`)}
                      >
                        <h4 className={`font-medium text-sm mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {relatedProject.title}
                        </h4>
                        <p className={`text-xs line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {relatedProject.description}
                        </p>
                      </div>
                    ))}
                </div>
              </Card>
            </motion.div>

            {/* Contact CTA */}
            <motion.div variants={itemVariants}>
              <Card className={`p-4 sm:p-6 border-2 transition-colors ${
                darkMode 
                  ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/50' 
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
              }`}>
                <h3 className={`text-base sm:text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Interested in this project?
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Let's discuss how we can work together on similar projects.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Get In Touch
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;