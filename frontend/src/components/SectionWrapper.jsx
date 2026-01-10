import { motion } from 'framer-motion';

const SectionWrapper = ({ children, id, className = "" }) => {
  return (
    <section 
      id={id} 
      className={`relative min-h-screen w-full snap-start snap-always flex items-center justify-center overflow-hidden ${className}`}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        className="w-full h-full flex flex-col justify-center relative z-10"
      >
        {children}
      </motion.div>
      
      {/* Optional: Add a subtle overlay or particle effect here if needed globally */}
    </section>
  );
};

export default SectionWrapper;
