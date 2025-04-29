import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { AuthFormData } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  register: (data: AuthFormData) => Promise<void>;
  login: (data: AuthFormData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (data: AuthFormData) => {
    const { email, password, fullName } = data;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (fullName && userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      
      // Store additional user data in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName,
        email,
        createdAt: new Date().toISOString()
      });
    }
  };

  const login = async (data: AuthFormData) => {
    const { email, password } = data;
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};