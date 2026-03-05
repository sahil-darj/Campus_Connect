import React from 'react';
import { Link } from 'react-router-dom';
import {
    Facebook, Twitter, Instagram, Linkedin, Github,
    Mail, MapPin, Phone, Rocket, ChevronRight, Heart
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-10 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500"></div>

            {/* Decorative Orbs */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Identity */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center space-x-3 mb-8 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                                <span className="text-white font-black text-xl italic">C</span>
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter">
                                Campus<span className="text-indigo-500">Connect</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                            Empowering the next generation of builders, dreamers, and doers. The ultimate platform for students to find opportunities, learn skills, and launch careers.
                        </p>
                        <div className="flex items-center space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:ml-auto">
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Navigation</h4>
                        <ul className="space-y-4">
                            {['Home', 'Internships', 'Hackathons', 'Courses', 'Admin'].map((link) => (
                                <li key={link}>
                                    <Link to={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`} className="text-slate-400 hover:text-white flex items-center group transition-colors">
                                        <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="lg:ml-auto">
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
                        <ul className="space-y-4">
                            {['Help Center', 'Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Brand Kit'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-slate-400 hover:text-white flex items-center group transition-colors">
                                        <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Headquarters</h4>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-indigo-400 mr-4 shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <p className="text-slate-400 text-sm italic py-1">
                                    123 Innovation Street,<br />Tech Valley, SF 94103
                                </p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-emerald-400 mr-4 shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <p className="text-slate-400 text-sm">+1 (555) 000-0000</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-blue-400 mr-4 shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <p className="text-slate-400 text-sm">hello@campusconnect.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-slate-500 text-sm font-medium">
                        &copy; {currentYear} <span className="text-slate-300">CampusConnect</span>. Built with <Heart className="w-4 h-4 inline text-red-500 mx-1" /> for the student community.
                    </p>
                    <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2 overflow-hidden">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-8 w-8 rounded-full ring-2 ring-slate-900 bg-slate-800 flex items-center justify-center">
                                    <User className="w-4 h-4 text-slate-500" />
                                </div>
                            ))}
                        </div>
                        <p className="text-slate-500 text-xs font-bold pl-2 uppercase tracking-widest">
                            Trusted by 50k+ students
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
