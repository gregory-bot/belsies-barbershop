import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <HomePage />
                </>
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;