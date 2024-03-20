import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuthError = error => {
    let errorMessage = error.message;
    if (errorMessage.startsWith('[auth/')) {
      errorMessage = errorMessage.split('] ')[1];
    }
    Alert.alert('Error', errorMessage);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleAuthError(error);
    }
  };

  const register = async (firstName, lastName, email, password) => {
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleAuthError(error);
    }
  };
  const forgotPassword = async email => {
    if (!email) {
      Alert.alert(
        'Please enter your email address and press the Forgot Password .',
      );
      return;
    }
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Failed to send password reset email. Please try again.');
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await auth().signOut();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleAuthError(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        loading,
        forgotPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
