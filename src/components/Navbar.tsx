import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Scissors, Menu, X } from 'lucide-react';
import { FaHome, FaConciergeBell, FaBook, FaInfoCircle, FaPhone } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const navItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Services", icon: <FaConciergeBell /> },
    { name: "Book Now", icon: <FaBook /> },
    { name: "About", icon: <FaInfoCircle /> },
    { name: "Contact", icon: <FaPhone /> },
  ];

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Scissors className="h-8 w-8 text-yellow-300" />
          <span
            className="text-xl font-bold text-white"
            style={{ fontFamily: "Courier New, monospace" }}
          >
            Belsies Barbershop
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none bg-amber-500 p-2 rounded-full hover:bg-amber-600 transition-colors"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item, index) => (
            <ScrollLink
              key={index}
              to={item.name.toLowerCase().replace(' ', '-')}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="flex items-center bg-gray-800 px-4 py-2 rounded-lg text-white hover:bg-amber-500 hover:text-black transition-colors cursor-pointer space-x-2"
            >
              {item.icon}
              <span>{item.name}</span>
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
      <div
        className={`fixed top-0 left-0 h-full bg-blue-500 w-[250px] transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        <div className="px-4 py-6 flex flex-col space-y-4">
          {navItems.map((item, index) => (
            <ScrollLink
              key={index}
              to={item.name.toLowerCase().replace(' ', '-')}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="flex items-center bg-gray-800 px-4 py-3 rounded-lg text-white hover:bg-amber-500 hover:text-black transition-colors space-x-2"
              onClick={closeMenu}
            >
              {item.icon}
              <span>{item.name}</span>
            </ScrollLink>
          ))}

          {currentUser ? (
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="w-full bg-amber-500 text-white px-4 py-3 rounded-lg hover:bg-amber-600 transition-colors text-left"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="block bg-amber-500 text-white px-4 py-3 rounded-lg hover:bg-amber-600 transition-colors text-center"
              onClick={closeMenu}
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>

      {/* Overlay to close menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
