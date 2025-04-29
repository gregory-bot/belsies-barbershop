import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaAward, 
  FaCut, 
  FaClock, 
  FaUserFriends 
} from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaAward className="h-10 w-10 text-amber-500" />,
      title: 'Expert Barbers',
      description: 'Our team consists of certified master barbers with years of experience in modern and traditional cutting techniques.'
    },
    {
      icon: <FaCut className="h-10 w-10 text-amber-500" />,
      title: 'Premium Products',
      description: 'We use only the highest quality products and tools to ensure the best results for your hair and skin.'
    },
    {
      icon: <FaClock className="h-10 w-10 text-amber-500" />,
      title: 'Convenient Hours',
      description: 'Open 7 days a week with extended hours to accommodate your busy schedule and last-minute appointments.'
    },
    {
      icon: <FaUserFriends className="h-10 w-10 text-amber-500" />,
      title: 'Personalized Service',
      description: 'We take the time to understand your style preferences and offer tailored recommendations for your unique look.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Belsies Barbershop</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We're more than just a barbershop. We're a tradition of excellence, dedicated to providing the best grooming experience for every client.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900 p-8 rounded-lg hover:bg-gray-800 transition-colors"
              variants={item}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <div className="mb-4 md:mb-0 md:mr-6">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a 
            href="#book-now" 
            className="inline-block bg-amber-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-amber-600 transition-colors"
          >
            Experience the Difference
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;