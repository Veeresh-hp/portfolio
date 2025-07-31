import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import portfolioData from '../mock';

const ContactSection = ({ darkMode = true }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // State for AI message generation
  const { toast } = useToast();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // --- Gemini API Integration ---
  const handleGenerateMessage = async () => {
    if (!formData.name || !formData.subject) {
      toast({
        title: "Info Needed",
        description: "Please enter your name and a subject first.",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    
    const prompt = `You are a professional communication assistant. Write a friendly and concise message for a portfolio contact form. The sender's name is "${formData.name}" and the subject of the message is "${formData.subject}". The message should express genuine interest in connecting or discussing the subject. Keep it under 50 words.`;

    try {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = "" // API key is handled by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          const text = result.candidates[0].content.parts[0].text;
          setFormData(prev => ({ ...prev, message: text.trim() }));
          toast({
            title: "Message Drafted!",
            description: "An AI-powered message has been generated for you.",
          });
        } else {
          throw new Error("Invalid response structure from API.");
        }
    } catch (error) {
        console.error("Gemini API call failed:", error);
        toast({
            title: "Error",
            description: "Could not generate a message. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
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
          Get In Touch
        </h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
        <p className={`text-lg max-w-2xl mx-auto px-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column */}
        <motion.div variants={itemVariants} className="flex flex-col gap-8">
          {/* Contact Information Card */}
          <Card className={`p-4 sm:p-6 border-2 transition-colors ${
            darkMode 
              ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-800/50' 
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
          }`}>
            <h3 className={`text-xl sm:text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Information
            </h3>
            <div className="space-y-4">
              <a href={`mailto:${portfolioData.personal.email}`} className="block">
                <motion.div 
                  className={`flex items-center p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                    darkMode ? 'bg-gray-800/50' : 'bg-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 sm:p-3 bg-blue-600 rounded-lg mr-3 sm:mr-4">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Email</h4>
                    <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {portfolioData.personal.email}
                    </p>
                  </div>
                </motion.div>
              </a>
              <a href={`tel:${portfolioData.personal.phone}`} className="block">
                <motion.div 
                  className={`flex items-center p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                    darkMode ? 'bg-gray-800/50' : 'bg-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 sm:p-3 bg-green-600 rounded-lg mr-3 sm:mr-4">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Phone</h4>
                    <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {portfolioData.personal.phone}
                    </p>
                  </div>
                </motion.div>
              </a>
              <motion.div 
                className={`flex items-center p-3 sm:p-4 rounded-lg shadow-sm ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white'
                }`}
              >
                <div className="p-2 sm:p-3 bg-purple-600 rounded-lg mr-3 sm:mr-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Location</h4>
                  <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {portfolioData.personal.location}
                  </p>
                </div>
              </motion.div>
            </div>
          </Card>

          {/* Social Links Card */}
          <Card className={`p-4 sm:p-6 transition-colors ${
            darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h3 className={`text-lg sm:text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Connect With Me
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href = "https://github.com/Veeresh-hp" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                  <Button variant="outline" size="lg" className={`w-full text-white border-gray-900 transition-colors ${
                    darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-900 hover:bg-gray-800'
                  }`}>
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    GitHub
                  </Button>
                </motion.div>
              </a>
              <a href= "https://www.linkedin.com/in/veereshhp" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                  <Button variant="outline" size="lg" className="w-full bg-blue-600 text-white hover:bg-blue-700 border-blue-600">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    LinkedIn
                  </Button>
                </motion.div>
              </a>
            </div>
          </Card>
        </motion.div>

        {/* Contact Form (Right Column) */}
        <motion.div variants={itemVariants}>
          <Card className={`p-4 sm:p-6 h-full transition-colors ${
            darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center mb-6">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-3" />
              <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Send a Message
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Full Name
                  </label>
                  <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required className={`w-full ${darkMode ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : ''}`} placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address
                  </label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className={`w-full ${darkMode ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : ''}`} placeholder="your.email@example.com" />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject
                </label>
                <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleInputChange} required className={`w-full ${darkMode ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : ''}`} placeholder="What's this about?" />
              </div>

              {/* --- MODIFIED MESSAGE AREA --- */}
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="message" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Message
                    </label>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleGenerateMessage}
                        disabled={isGenerating}
                        className={`text-xs ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                    >
                        {isGenerating ? (
                            <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-2"></div>
                                Drafting...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-3 h-3 mr-2" />
                                Help me write
                            </>
                        )}
                    </Button>
                </div>
                <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className={`w-full resize-none ${darkMode ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' : ''}`} placeholder="Tell me about your project, question, or just say hello!" />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactSection;
