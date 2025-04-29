import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { BookingFormData } from '../types';

const BookingSection = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    service: '',
    date: '',
    time: '',
    paymentMethod: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('Please sign in to book an appointment');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save booking to Firestore
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      
      toast.success('Booking submitted successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        service: '',
        date: '',
        time: '',
        paymentMethod: ''
      });
    } catch (error) {
      toast.error('Failed to submit booking. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-now" className="py-20 bg-gray-100">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Session</h2>
          <p className="text-lg text-gray-600">
            Reserve your spot for a premium grooming experience at Belsies Barbershop.
          </p>
        </motion.div>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
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
                  Email
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
                  Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="classic-fade">Classic Fade ($30)</option>
                  <option value="luxury-beard">Luxury Beard Trim ($25)</option>
                  <option value="full-service">Full Service ($50)</option>
                  <option value="head-massage">Head Massage ($35)</option>
                  <option value="hot-towel-shave">Hot Towel Shave ($40)</option>
                  <option value="kids-haircut">Kid's Haircut ($20)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  onChange={handleChange}
                >
                  <option value="">Select payment method</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="cash">Cash on Arrival</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-8 w-full bg-amber-500 text-white py-3 rounded-md hover:bg-amber-600 transition-colors duration-300 font-semibold ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Book Appointment'}
            </button>
            
            {!currentUser && (
              <p className="mt-4 text-center text-amber-600">
                Please <a href="/auth" className="underline">sign in</a> to book an appointment
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingSection;