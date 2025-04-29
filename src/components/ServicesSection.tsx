import React from 'react';
import { motion } from 'framer-motion';
import { ServiceType } from '../types';

const ServicesSection = () => {
  const services: ServiceType[] = [
    {
      id: '1',
      name: 'Classic Fade',
      description: 'Our signature fade with precision tapering and clean lines. Includes a hot towel finish and styling.',
      price: 30,
      image: 'https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '2',
      name: 'Luxury Beard Trim',
      description: 'Expert beard shaping and styling with hot towel treatment, essential oils, and beard balm finish.',
      price: 25,
      image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '3',
      name: 'Full Service',
      description: 'Complete package including premium haircut, beard trim, facial massage, and styling consultation.',
      price: 50,
      image: 'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '4',
      name: 'Head Massage',
      description: 'Relaxing scalp and head massage using premium oils to stimulate hair growth and relieve stress.',
      price: 35,
      image: 'https://images.pexels.com/photos/3992855/pexels-photo-3992855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '5',
      name: 'Hot Towel Shave',
      description: 'Traditional straight razor shave with hot towel preparation and premium aftershave treatment.',
      price: 40,
      image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '6',
      name: 'Kid\'s Haircut',
      description: 'Gentle and patient haircut service for young gentlemen, includes a lollipop reward.',
      price: 20,
      image: 'https://images.pexels.com/photos/1684975/pexels-photo-1684975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
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
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the finest in men's grooming with our comprehensive range of services designed for the modern gentleman.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              className="flex flex-col md:flex-row bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              variants={item}
            >
              <div className="md:w-2/5 h-64 md:h-auto">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">${service.price}</span>
                  <button 
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                    onClick={() => document.getElementById('book-now')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;