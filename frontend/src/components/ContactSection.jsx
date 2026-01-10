import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import portfolioData from '../mock';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
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
    hidden: { opacity: 0, y: 20 },
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateMessage = () => {
    if (!formData.name || !formData.subject) {
      toast({
        title: "Info Needed",
        description: "Please enter your name and a subject first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);

    // Simulate a "thinking" delay for better UX
    setTimeout(() => {
        const templates = [
            `Hi Veeresh, I'm ${formData.name}. I recently visited your portfolio and I'm very interested in "${formData.subject}". I'd love to discuss how we can collaborate.`,
            `Hello! My name is ${formData.name}. I'm reaching out regarding "${formData.subject}". Your work looks impressive, and I think we could build something great together.`,
            `Hi, I'm ${formData.name}. I'd like to talk to you about "${formData.subject}". Please let me know when you're available to chat.`
        ];
        
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
        
        setFormData(prev => ({ ...prev, message: randomTemplate }));
        
        toast({
          title: "Draft Generated!",
          description: "A professional message has been drafted for you.",
        });
        setIsGenerating(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Background Signature Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

      <motion.div variants={itemVariants} className="flex flex-col items-center mb-8 sm:mb-12">
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-white text-center">
          Let's Collaborate
        </h2>
        <div className="w-12 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6"></div>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto text-center font-medium px-4">
          Ready to synthesize next-generation systems or just have a technical query? Reach out to the base.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Contact Info Sidebar */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <div className="space-y-4">
            {[
              { 
                icon: Mail, 
                label: "Secure Channel", 
                value: portfolioData.personal.email, 
                color: "text-blue-400",
                href: `mailto:${portfolioData.personal.email}`
              },
              { 
                icon: Phone, 
                label: "Frequency", 
                value: portfolioData.personal.phone, 
                color: "text-indigo-400",
                href: `tel:${portfolioData.personal.phone}`
              },
              { 
                icon: MapPin, 
                label: "Operational Base", 
                value: portfolioData.personal.location, 
                color: "text-cyan-400",
                href: "#"
              }
            ].map((item, i) => (
              <a 
                href={item.href}
                key={i} 
                className="block group"
                {...(item.label === "Secure Channel" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <div className="glass-panel-compact rounded-[1.5rem] p-4 sm:p-5 flex items-center gap-5 transition-all duration-500 hover:bg-white/5 hover:border-white/20">
                  <div className={`p-3 rounded-xl bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-0.5">{item.label}</h4>
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{item.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="glass-panel-compact rounded-[2rem] p-6 space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-3">Social Uplinks</h4>
            <div className="grid grid-cols-2 gap-3">
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="group">
                <Button variant="ghost" className="w-full rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-blue-400 hover:bg-blue-400/5 group-hover:border-blue-400/20 py-4 h-auto">
                  <Linkedin className="w-4 h-4 mr-2" /> <span className="text-[9px] font-black tracking-widest">LINKEDIN</span>
                </Button>
              </a>
              <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="group">
                <Button variant="ghost" className="w-full rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 group-hover:border-white/20 py-4 h-auto">
                  <Github className="w-4 h-4 mr-2" /> <span className="text-[9px] font-black tracking-widest">GITHUB</span>
                </Button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Identity</label>
                  <Input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    className="bg-white/5 border-white/5 rounded-xl py-3 sm:py-4 px-4 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-0 transition-all text-sm font-medium h-auto"
                    placeholder="Subject Name" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Digital Address</label>
                  <Input 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    className="bg-white/5 border-white/5 rounded-xl py-3 sm:py-4 px-4 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-0 transition-all text-sm font-medium h-auto"
                    placeholder="name@example.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Topic of Interest</label>
                <Input 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleInputChange} 
                  required 
                  className="bg-white/5 border-white/5 rounded-xl py-3 sm:py-4 px-4 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-0 transition-all text-sm font-medium h-auto"
                  placeholder="What's on your mind?" 
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end ml-1">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">The Core Message</label>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleGenerateMessage}
                    disabled={isGenerating}
                    className="text-[9px] h-auto p-0 font-black text-blue-400 hover:text-cyan-400 bg-transparent hover:bg-transparent"
                  >
                    {isGenerating ? "Synthesizing..." : "✨ AI-POWERED DRAFT"}
                  </Button>
                </div>
                <Textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  required 
                  rows={4} 
                  className="bg-white/5 border-white/5 rounded-xl p-4 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-0 transition-all resize-none text-sm font-medium"
                  placeholder="Share your thoughts, project details, or just a friendly hello..." 
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl py-4 sm:py-5 h-auto text-sm sm:text-base font-black tracking-widest shadow-[0_10px_40px_rgba(37,99,235,0.3)] transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    TRANSMITTING...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" /> INITIATE CONNECTION
                  </div>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactSection;
