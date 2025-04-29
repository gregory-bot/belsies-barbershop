import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Scissors, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  
  const navItems = ["Home", "Services", "Book Now", "About", "Contact"];
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Scissors className="h-8 w-8 text-white" />
          <span 
            className="text-xl font-bold text-white"
            style={{ fontFamily: "Courier New, monospace" }}
          >
            Belsies Barbershop
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <ScrollLink
              key={index}
              to={item.toLowerCase().replace(' ', '-')}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="text-white hover:text-amber-400 transition-colors cursor-pointer"
            >
              {item}
            </ScrollLink>
          ))}
          
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/auth" 
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black">
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item, index) => (
              <ScrollLink
                key={index}
                to={item.toLowerCase().replace(' ', '-')}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="block text-white hover:text-amber-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </ScrollLink>
            ))}
            
            {currentUser ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-white hover:text-amber-400 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/auth" 
                className="block text-white hover:text-amber-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;