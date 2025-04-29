import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { AuthFormData } from '../types';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    fullName: ''
  });
  
  const { login, register, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login(formData);
        toast.success('Login successful!');
      } else {
        if (!formData.fullName) {
          toast.error('Please enter your full name');
          return;
        }
        await register(formData);
        toast.success('Account created successfully! Please log in.');
        setIsLogin(true);
        setFormData({
          email: '',
          password: '',
          fullName: ''
        });
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with image and description */}
      <div className="md:w-1/2 bg-gray-800 text-white p-8 flex flex-col justify-center items-center">
        <div className="max-w-md text-center">
          <h1 
            className="text-4xl font-bold mb-6" 
            style={{ fontFamily: "Courier New, monospace" }}
          >
            Belsies Barbershop
          </h1>
          <p className="text-lg mb-8">
           At Belsies, we combine classic barbering traditions with modern techniques to deliver exceptional haircuts and grooming experiences.
          </p>
          <img 
            src="https://th.bing.com/th/id/R.b89fd9ffafe11231514ef698c1fd9b1f?rik=VImbzsrV6OrAUg&riu=http%3a%2f%2fwww.kuzabiashara.co.ke%2fblog%2fwp-content%2fuploads%2f2015%2f12%2fKinyozi.jpg&ehk=HP11kkjtfx%2fkSWUVub7A%2fMh%2biy6A8p5rXFWh37PyLbg%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" 
            alt="Barbershop Interior" 
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      
      {/* Right side with auth form */}
      <div className="md:w-1/2 bg-white p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required={!isLogin}
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Benjii-Too"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Benjii@gmail.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition-colors duration-300 font-semibold"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({
                  email: '',
                  password: '',
                  fullName: ''
                });
              }}
              className="text-amber-600 hover:underline focus:outline-none"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;