import React, { useState } from 'react';
import { X, Mail, Lock, User, GraduationCap, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthModal = ({ isOpen, onClose, mode, onModeChange }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    university: '',
    year: '',
    major: ''
  });
  const [error, setError] = useState(null);
  const { login, signup, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await signup(formData);
      }
      onClose();
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header Decor */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-400"></div>

        <div className="p-8 md:p-12">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-2xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Section */}
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="text-slate-500 font-medium">
              {mode === 'login'
                ? 'Great to see you again. Let\'s get you back to your journey.'
                : 'Join the community of students building the future.'}
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center">
              <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center mr-3 shrink-0">
                <X className="w-4 h-4" />
              </div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="group">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                    required
                  />
                </div>
              </div>
            )}

            <div className="group">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@university.edu"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="space-y-5 animate-in slide-in-from-bottom-2 duration-500">
                <div className="group">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                    University / Institution
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      placeholder="e.g. Stanford University"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                      Academic Year
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors pointer-events-none" />
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium appearance-none"
                        required
                      >
                        <option value="">Select Year</option>
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                        <option value="Graduate">Graduate</option>
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
                      Major / Field
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                      <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        placeholder="Computer Science"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group/btn bg-indigo-600 hover:bg-slate-900 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-indigo-100 hover:shadow-slate-200 transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3"></div>
                  Processing...
                </div>
              ) : (
                <>
                  {mode === 'login' ? 'Sign Into Account' : 'Create My Account'}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center">

            <p className="text-slate-500 font-medium">
              {mode === 'login' ? "New to CampusConnect?" : "Already have an account?"}
              <button
                onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-indigo-600 hover:text-indigo-800 font-black uppercase tracking-widest text-xs"
              >
                {mode === 'login' ? 'Create Account' : 'Security Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;