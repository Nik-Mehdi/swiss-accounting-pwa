// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  OAuthProvider,         // 👈 جدید: برای ورود با اپل
  signInWithPopup
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ثبت‌نام + ارسال ایمیل تایید
  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  };

  // لاگین معمولی
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  
  // خروج
  const logout = () => signOut(auth);

  // بازیابی رمز عبور
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // ورود با گوگل
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // 🍏 ورود با اپل
  const loginWithApple = () => {
    const provider = new OAuthProvider('apple.com');
    // می‌تونیم از اپل بخواهیم اسم و ایمیل کاربر رو هم بهمون بده
    provider.addScope('email');
    provider.addScope('name');
    return signInWithPopup(auth, provider);
  };

  const value = { 
    currentUser, 
    signup, 
    login, 
    logout, 
    resetPassword,
    loginWithGoogle,
    loginWithApple   // 👈 اضافه شد
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};