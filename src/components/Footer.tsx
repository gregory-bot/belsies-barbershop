import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { section: 'Quick Links', links: [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/#services' },
      { name: 'Book Now', url: '/#book-now' },
      { name: 'About Us', url: '/#about' },
      { name: 'Contact', url: '/#contact' }
    ]},
    { section: 'Services', links: [
      { name: 'Classic Fade', url: '/#services' },
      { name: 'Luxury Beard Trim', url: '/#services' },
      { name: 'Full Service', url: '/#services' },
      { name: 'Head Massage', url: '/#services' },
      { name: 'Hot Towel Shave', url: '/#services' }
    ]},
    { section: 'Information', links: [
      { name: 'Privacy Policy', url: '/privacy' },
      { name: 'Terms of Service', url: '/terms' },
      { name: 'FAQs', url: '/faqs' },
      { name: 'Careers', url: '/careers' },
      { name: 'Blog', url: '/blog' }
    ]}
  ];
  
  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com' },
    { icon: <FaInstagram />, url: 'https://instagram.com' },
    { icon: <FaTwitter />, url: 'https://twitter.com' },
    { icon: <FaYoutube />, url: 'https://youtube.com' }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Scissors className="h-8 w-8 text-amber-500" />
              <span 
                className="text-xl font-bold"
                style={{ fontFamily: "Courier New, monospace" }}
              >
                Belsies Barbershop
              </span>
            </Link>
            <p className="text-gray-400 mb-6">
              Premium grooming services for the modern gentleman since 2010.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white p-2 rounded-full hover:bg-amber-500 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer links */}
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-bold mb-4">{section.section}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.url} 
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Belsies Barbershop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;