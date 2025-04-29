import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save contact message to Firestore
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      
      toast.success('Message sent successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: <FaFacebookF />, url: 'https://facebook.com' },
    { icon: <FaInstagram />, url: 'https://instagram.com' },
    { icon: <FaTwitter />, url: 'https://twitter.com' },
    { icon: <FaYoutube />, url: 'https://youtube.com' }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or want to schedule an appointment? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-100 p-8 rounded-lg h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-amber-500 text-xl mt-1 mr-4" />
                  <div>
                    <h4 className="font-bold text-gray-900">Address</h4>
                    <p className="text-gray-600">123 Main Street, New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaPhone className="text-amber-500 text-xl mt-1 mr-4" />
                  <div>
                    <h4 className="font-bold text-gray-900">Phone</h4>
                    <p className="text-gray-600">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaEnvelope className="text-amber-500 text-xl mt-1 mr-4" />
                  <div>
                    <h4 className="font-bold text-gray-900">Email</h4>
                    <p className="text-gray-600">info@belsiesbarbershop.com</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-6">Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">8:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white p-3 rounded-full hover:bg-amber-500 transition-colors duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form and Map */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-100 p-8 rounded-lg mb-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    onChange={handleChange}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-amber-500 text-white py-3 rounded-md hover:bg-amber-600 transition-colors duration-300 font-semibold ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="h-60 bg-gray-200 rounded-lg overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.697149422055104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1624858555426!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Belsies Barbershop Location"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;