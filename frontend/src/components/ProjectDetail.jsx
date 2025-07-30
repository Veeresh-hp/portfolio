import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Users, Lightbulb } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold text-gray-900">{project.title}</h1>
          </div>
        </div>
      </nav>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Project Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge className={project.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
              {project.status === 'ongoing' ? 'In Progress' : 'Completed'}
            </Badge>
            <Badge variant="outline">{project.category}</Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {project.title}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Project Actions */}
        <motion.div variants={itemVariants} className="flex gap-4 mb-12">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            View Code
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features Section */}
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <div className="flex items-center mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start p-4 bg-gray-50 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Technical Details */}
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <div className="flex items-center mb-6">
                  <Tag className="w-6 h-6 text-blue-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Technical Implementation</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Highlights</h3>
                    <div className="prose max-w-none text-gray-600">
                      <p>This project demonstrates my ability to work with modern web technologies and implement complex features. 
                      The application showcases best practices in software development including clean code architecture, 
                      responsive design, and user-centered development.</p>
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
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Project Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">Status: {project.status}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Tag className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">Category: {project.category}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">Role: Full Stack Developer</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Related Projects */}
            <motion.div variants={itemVariants}>
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Projects</h3>
                <div className="space-y-3">
                  {portfolioData.projects
                    .filter(p => p.id !== project.id)
                    .slice(0, 2)
                    .map((relatedProject) => (
                      <div 
                        key={relatedProject.id}
                        className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => navigate(`/project/${relatedProject.id}`)}
                      >
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          {relatedProject.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {relatedProject.description}
                        </p>
                      </div>
                    ))}
                </div>
              </Card>
            </motion.div>

            {/* Contact CTA */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Interested in this project?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Let's discuss how we can work together on similar projects.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
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