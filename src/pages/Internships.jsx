import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Filter, Search, MapPin, Calendar, DollarSign, Users,
  ChevronRight, Briefcase, Clock, ShieldCheck, Bookmark, Share2,
  TrendingUp, Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockOpportunities } from '../data/mockData';
import { API_BASE_URL } from '../config';

const Internships = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    remote: '',
    duration: '',
    company: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/opportunities`);
        const data = await response.json();
        if (data && data.length > 0) {
          setOpportunities(data);
        } else {
          setOpportunities(mockOpportunities);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching opportunities:', err);
        setOpportunities(mockOpportunities);
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const internships = opportunities.filter(opp => opp.type === 'internship');

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation = !filters.location || internship.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesRemote = !filters.remote || (filters.remote === 'remote' ? internship.remote : !internship.remote);
    const matchesCompany = !filters.company || internship.company.toLowerCase().includes(filters.company.toLowerCase());

    return matchesSearch && matchesLocation && matchesRemote && matchesCompany;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      remote: '',
      duration: '',
      company: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-r-4 border-blue-200"></div>
          <p className="mt-4 text-slate-600 font-medium italic">Finding opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Career Header */}
      <div className="bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-[0.2em] mb-6">
                <Briefcase className="w-5 h-5" />
                <span>Premium Career Portal</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                Global Internship <span className="text-indigo-400">Portal</span>
              </h1>
              <p className="text-indigo-100/70 text-xl leading-relaxed">
                Connect with leading companies currently hiring for technical and creative roles. Your professional journey starts here.
              </p>
            </div>

            <div className="w-full lg:w-96">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold mb-4">Quick Search</h3>
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-indigo-100/50 transition-all font-medium"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-indigo-950 font-black rounded-2xl transition-all shadow-lg flex items-center justify-center"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Overlay */}
      {showFilters && (
        <div className="bg-white border-b border-slate-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Remote"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Work Type</label>
                <select
                  value={filters.remote}
                  onChange={(e) => handleFilterChange('remote', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 appearance-none"
                >
                  <option value="">All Arrangements</option>
                  <option value="remote">Fully Remote</option>
                  <option value="onsite">On-site / Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Top Companies</label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-6 py-3 text-blue-600 font-bold border-2 border-dashed border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center justify-center"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredInternships.map((internship) => {
            const hasApplied = user?.applications?.some(app =>
              (app.opportunityId?._id || app.opportunityId) === internship._id
            );

            return (
              <div key={internship._id} className="group bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden hover-lift">
                {/* Card Header & Media */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={internship.image}
                    alt={internship.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>

                  <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    {hasApplied && (
                      <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center uppercase tracking-widest border border-white/20">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Applied
                      </span>
                    )}
                    {internship.trending && (
                      <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center uppercase tracking-tighter">
                        <TrendingUp className="w-3.5 h-3.5 mr-1" /> Hot
                      </span>
                    )}
                    {internship.remote && (
                      <span className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center uppercase tracking-tighter">
                        <Globe className="w-3.5 h-3.5 mr-1" /> Remote
                      </span>
                    )}
                  </div>

                  <div className="absolute top-6 right-6">
                    <button className="bg-white/20 backdrop-blur-md text-white p-2.5 rounded-2xl hover:bg-white/40 transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-lg font-bold">
                        {internship.company.charAt(0)}
                      </div>
                      <span className="font-bold text-lg">{internship.company}</span>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-blue-400 fill-blue-400/20" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-wider">
                      <DollarSign className="w-3.5 h-3.5 mr-1" /> {internship.salary}
                    </div>
                    <div className="text-slate-400 text-sm font-medium flex items-center">
                      <Users className="w-4 h-4 mr-1.5" />
                      {internship.applicants} applied
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-6 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {internship.title}
                  </h3>

                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center space-x-3">
                    <Link
                      to={`/opportunity/${internship._id}`}
                      className={`flex-1 text-center py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center group/btn ${hasApplied
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100"
                        : "bg-slate-900 text-white hover:bg-blue-600 shadow-slate-200"
                        }`}
                    >
                      {hasApplied ? 'Review Status' : 'Apply Now'}{" "}
                      <ChevronRight className="w-5 h-5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <button className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Empty State */}
        {filteredInternships.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 mt-8">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No matching internships</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-8">Try adjusting your filters or search terms to find what you're looking for.</p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;