import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Attempt to recover session from localStorage
    const savedUser = localStorage.getItem("cc_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Sync user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("cc_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("cc_user");
    }
  }, [user]);

  const signup = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/signup`,
        formData
      );
      setUser(response.data.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      setUser(response.data.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("cc_user");
    setUser(null);
  };

  const applyToOpportunity = async (opportunityId) => {
    if (!user) throw new Error("Please login to apply");
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/apply`, {
        userId: user._id,
        opportunityId,
      });
      setUser(response.data.user);
    } catch (error) {
      throw error;
    }
  };

  const withdrawFromOpportunity = async (opportunityId) => {
    if (!user) throw new Error("Please login to withdraw");
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/withdraw`, {
        userId: user._id,
        opportunityId,
      });
      setUser(response.data.user);
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/auth/profile/${user._id}`
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Error refreshing user:", error);
      if (error.response?.status === 404) {
        logout();
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        applyToOpportunity,
        withdrawFromOpportunity,
        refreshUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
