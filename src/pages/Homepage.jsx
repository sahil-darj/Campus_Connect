import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, TrendingUp, Calendar, Users, ArrowRight, CheckCircle,
  Globe, Briefcase, GraduationCap, Trophy, ChevronRight
} from 'lucide-react';
import { categories } from '../data/mockData';

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/opportunities');
        const data = await response.json();
        setOpportunities(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching opportunities:', err);
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const trendingOpportunities = opportunities.filter(opp => opp.trending).slice(0, 3);
  const recentOpportunities = [...opportunities].sort((a, b) => new Date(b.posted) - new Date(a.posted)).slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-t-indigo-600 border-r-4 border-r-indigo-200"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Simple & Clean Hero Section */}
      <div className="relative pt-20 pb-24 md:pt-32 md:pb-32 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 overflow-hidden text-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.03] -skew-x-12 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-[0.05] rounded-full -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            Your Gateway to <span className="text-yellow-400">Tech Opportunities</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-12 max-w-2xl mx-auto font-medium opacity-90 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Discover internships, hackathons, and courses tailored for ambitious students
          </p>

          {/* Clean Search Bar */}
          <div className="max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center">
              <div className="flex-1 w-full flex items-center px-4 mb-2 md:mb-0">
                <Search className="text-indigo-400 w-6 h-6 shrink-0" />
                <input
                  type="text"
                  placeholder="Search opportunities, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 text-lg py-3 md:py-4"
                />
              </div>
              <button className="w-full md:w-auto bg-indigo-600 hover:bg-slate-900 text-white font-black uppercase tracking-widest text-xs px-10 py-4 md:py-5 rounded-xl md:rounded-full transition-all shadow-xl shadow-indigo-500/20">
                Find Talent
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-80 animate-in fade-in duration-1000 delay-500">
            {[
              { label: 'Active Opportunities', value: '1+' },
              { label: 'Students Connected', value: '50K+' },
              { label: 'Partner Companies', value: '250+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] font-bold text-indigo-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div className="text-left w-full md:w-2/3">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Choose Your <span className="text-indigo-600">Pathway</span></h2>
              <p className="text-lg text-slate-600">Tailored categories to help you navigate through thousands of opportunities efficiently.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/${category.name.toLowerCase()}`}
                className="group relative h-64 overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-indigo-50 rounded-full transition-transform duration-700 group-hover:scale-[3]"></div>
                <div className="relative h-full p-8 flex flex-col justify-between z-10">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-500 origin-left">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{category.name}</h3>
                    <p className="text-slate-500 text-sm mb-4">Explore thousands of {category.name.toLowerCase()} curated for your skill level.</p>
                    <div className="flex items-center text-indigo-600 font-semibold text-sm">
                      Get Started <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-indigo-600 font-bold tracking-widest text-sm uppercase">Simplified Dashboard</span>
            <h2 className="text-4xl font-bold mt-4 mb-6">How CampusConnect Works</h2>
            <p className="text-slate-600">Our streamline process takes you from student to professional in three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-100 to-transparent"></div>
            {[
              { number: '01', title: 'Create Profile', desc: 'Build your digital portfolio highlighting your skills, projects, and educational achievements.', icon: <Users className="w-8 h-8" /> },
              { number: '02', title: 'Apply to Tasks', desc: 'Browse through thousands of verified opportunities and apply with a single click.', icon: <Briefcase className="w-8 h-8" /> },
              { number: '03', title: 'Get Hired', desc: 'Directly connect with top-tier tech recruiters and start your professional journey.', icon: <Trophy className="w-8 h-8" /> },
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-24 h-24 bg-indigo-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-600/20 transform rotate-3 hover:rotate-0 transition-transform">
                  {step.icon}
                  <span className="absolute -top-4 -right-4 w-10 h-10 bg-slate-900 border-4 border-white rounded-full flex items-center justify-center text-xs font-bold">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Opportunities */}
      {trendingOpportunities.length > 0 && (
        <div className="py-24 bg-slate-900 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center space-x-2 text-orange-400 mb-2">
                  <TrendingUp className="w-6 h-6" />
                  <span className="font-bold text-sm tracking-widest uppercase">High Demand</span>
                </div>
                <h2 className="text-4xl font-bold text-white">Trending Now</h2>
              </div>
              <Link to="/internships" className="mt-6 md:mt-0 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all flex items-center group">
                View Catalog <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingOpportunities.map((opportunity) => (
                <div key={opportunity._id} className="group bg-slate-800/50 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 hover-lift shadow-2xl">
                  <div className="relative aspect-[16/9]">
                    <img src={opportunity.image} alt={opportunity.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3 truncate">{opportunity.title}</h3>
                    <p className="text-slate-400 mb-6 flex items-center">
                      <Globe className="w-4 h-4 mr-2" /> {opportunity.company}
                    </p>
                    <Link to={`/opportunity/${opportunity._id}`} className="block text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Feed */}
      {recentOpportunities.length > 0 && (
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Fresh Drops</h2>
              <p className="text-slate-500">Curated opportunities that went live today.</p>
            </div>
            <div className="space-y-4">
              {recentOpportunities.map((opportunity) => (
                <Link key={opportunity._id} to={`/opportunity/${opportunity._id}`} className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-indigo-50 transition-all">
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200">
                      <Briefcase className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{opportunity.title}</h3>
                      <p className="text-slate-500 text-sm">{opportunity.company} • {opportunity.location || 'Remote'}</p>
                    </div>
                  </div>
                  <ChevronRight className="hidden md:block w-6 h-6 text-slate-300 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MapPin = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default Homepage;