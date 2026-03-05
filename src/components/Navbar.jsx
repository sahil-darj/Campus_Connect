import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, User, LogOut, Bell, Sparkles } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Internships", path: "/internships" },
    { name: 'Hackathons', path: '/hackathons' },
    { name: 'Courses', path: '/courses' },
    { name: 'Admin', path: '/admin' },
  ];

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-lg shadow-slate-200/20 py-2"
          : "bg-white border-b border-slate-100 py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Creative Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-white font-black text-xl italic">C</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 tracking-tighter leading-none group-hover:text-indigo-600 transition-colors">
                  Campus<span className="text-indigo-600">Connect</span>
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Innovation Hub</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navItems
                .filter(item => item.name !== 'Admin' || (user && user.role === 'admin'))
                .map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all relative group ${isActive
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
            </div>

            {/* Smart Search and User Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 w-4 h-4 transition-colors" />
                <input
                  type="text"
                  placeholder="Find anything..."
                  className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 outline-none w-48 lg:w-64 transition-all text-sm font-medium"
                />
              </div>

              {user ? (
                <div className="flex items-center space-x-1">
                  <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
                  </button>

                  <div className="h-4 w-px bg-slate-200 mx-2"></div>

                  <div className="flex items-center space-x-3">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 p-1.5 pr-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                    >
                      <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                        {user.name?.charAt(0) || <User className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-bold text-slate-700">Dashboard</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Logout"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAuthClick("login")}
                    className="text-slate-600 hover:text-indigo-600 font-black text-sm uppercase tracking-wider px-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick("signup")}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Join Now
                  </button>
                </div>
              )}
            </div>

            {/* Modern Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 bg-slate-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-all"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Sliding Animation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 animate-in slide-in-from-top-4 duration-300">
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-4 text-base font-black uppercase tracking-widest rounded-2xl transition-all ${isActive
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                    {isActive && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>}
                  </Link>
                );
              })}

              <div className="pt-6 mt-4 border-t border-slate-100 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-3 px-4 py-4 font-black uppercase tracking-widest text-slate-700 bg-slate-50 rounded-2xl"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>My Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full text-left px-4 py-4 font-black uppercase tracking-widest text-red-500 bg-red-50 rounded-2xl"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout Account</span>
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3 p-2">
                    <button
                      onClick={() => handleAuthClick("login")}
                      className="px-4 py-4 font-black uppercase tracking-widest text-slate-600 bg-slate-50 rounded-2xl text-center"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleAuthClick("signup")}
                      className="px-4 py-4 font-black uppercase tracking-widest text-white bg-indigo-600 rounded-2xl text-center shadow-lg shadow-indigo-100"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Navbar;

