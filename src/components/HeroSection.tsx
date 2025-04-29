import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { ReactTyped } from 'react-typed';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';

const HeroSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videos = [
    "https://videos.pexels.com/video-files/20103027/20103027-hd_1920_1080_24fps.mp4",
    "https://videos.pexels.com/video-files/7697129/7697129-sd_640_360_30fps.mp4"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev === 0 ? 1 : 0));
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video backgrounds */}
      <div className="absolute inset-0 w-full h-full">
        {videos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ${
              currentVideo === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <video
              src={video}
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
              playsInline
            />
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{ fontFamily: "Courier New, monospace" }}
          >
            Belsies Barbershop
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <ReactTyped
            strings={[
              "Exceptional Haircuts",
              "Premium Beard Trims",
              "Luxury Grooming Experience"
            ]}
            typeSpeed={70}
            backSpeed={50}
            loop
            className="text-2xl sm:text-3xl font-medium"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link
            to="book-now"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="bg-amber-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-amber-600 transition-colors cursor-pointer inline-block"
          >
            Book Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;