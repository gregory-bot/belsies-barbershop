import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import BookingSection from '../components/BookingSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <main className="flex-1">
      <HeroSection />
      <ServicesSection />
      <BookingSection />
      <WhyChooseUs />
      <ContactSection />
    </main>
  );
};

export default HomePage;