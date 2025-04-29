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
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: new Date().toISOString()
      });

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
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
    <>
      <section
        id="contact"
        className="py-16 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://media.istockphoto.com/id/938631018/photo/barber-giving-a-haircut-in-his-shop.jpg?b=1&s=612x612&w=0&k=20&c=1JUGu2uyLbR2-Wgum7rB411Q_gUvXuTP1vehrUY84rg=')"
        }}
      >
        <div className="container mx-auto px-4 bg-opacity-90 p-8 rounded-lg shadow-md">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">Get In Touch</h2>
            <p className="text-white max-w-xl mx-auto">
              Have questions or want to schedule an appointment? Reach out to us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-100 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-amber-500 text-xl mr-3" />
                  <p className="text-gray-700">435 Nairobi</p>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-amber-500 text-xl mr-3" />
                  <p className="text-gray-700">(254) 793650401</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-amber-500 text-xl mr-3" />
                  <p className="text-gray-700">info@belsiesbarbershop.com</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Follow Us</h3>
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
            </motion.div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="h-36 bg-gray-200 rounded-lg overflow-hidden shadow-md"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33437.17567494328!2d36.79898975283064!3d-1.2741962733224919!2m3!1f0!2f0!3f0!3m2!1i1024!1i768!4f13.1!3m3!1m2!1s0x182f16eb9601573b%3A0xd3fd21052bcc867f!2sMuthaiga%20Square%20-%20Nairobi!5e0!3m2!1sen!2ske!4v1745944947614!5m2!1sen!2ske"
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

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className={`w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition-colors duration-300 font-semibold ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Button for Phone Call */}
      <a
        href="tel:+254793650401"
        className="fixed bottom-6 left-2 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-300"
        title="Call Us"
      >
        <FaPhone className="text-xl" />
      </a>

      {/* Footer */}
      <footer className="text-center py-2 bg-yellow-100 text-gray-600 text-sm">
        © {new Date().getFullYear()} Belsies Barbershop. All rights reserved.
      </footer>
    </>
  );
};

export default ContactSection;