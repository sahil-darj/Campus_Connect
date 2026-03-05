import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Filter, Search, MapPin, Calendar, Trophy, Users, Clock,
  ChevronRight, Rocket, Zap, Globe, Share2, Heart, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Hackathons = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    remote: '',
    duration: '',
    theme: ''
  });
  const [showFilters, setShowFilters] = useState(false);

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

  const hackathons = opportunities.filter(opp => opp.type === 'hackathon');

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hackathon.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation = !filters.location || hackathon.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesRemote = !filters.remote || (filters.remote === 'remote' ? hackathon.remote : !hackathon.remote);

    return matchesSearch && matchesLocation && matchesRemote;
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
      theme: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-t-purple-600 border-r-4 border-r-purple-200"></div>
          <p className="mt-4 text-slate-600 font-medium italic">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaff]">
      {/* Innovation Header */}
      <div className="bg-purple-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs uppercase tracking-[0.2em] mb-6">
                <Rocket className="w-5 h-5" />
                <span>Competitive Innovation</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                Global <span className="text-purple-400">Hackathons</span> Hub
              </h1>
              <p className="text-purple-100/70 text-xl leading-relaxed">
                Join thousands of builders tackling the world's toughest challenges. Win prizes, build networks, and launch your career.
              </p>
            </div>

            <div className="w-full lg:w-96">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold mb-4">Quick Search</h3>
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-purple-100/50 transition-all font-medium"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full py-4 bg-purple-500 hover:bg-purple-400 text-purple-950 font-black rounded-2xl transition-all shadow-lg flex items-center justify-center"
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
        <div className="bg-white border-b border-slate-200 animate-in slide-in-from-top-4 duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Virtual"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Format</label>
                <select
                  value={filters.remote}
                  onChange={(e) => handleFilterChange('remote', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
                >
                  <option value="">All Formats</option>
                  <option value="remote">Virtual Only</option>
                  <option value="onsite">On-site / In-person</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Duration</label>
                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
                >
                  <option value="">Any Length</option>
                  <option value="24">24h Sprints</option>
                  <option value="48">48h Weekends</option>
                  <option value="72">72h+ Intensive</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-6 py-3 text-purple-600 font-bold border-2 border-dashed border-purple-200 rounded-xl hover:bg-purple-50 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Creative Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredHackathons.map((hackathon) => {
            const hasApplied = user?.applications?.some(app =>
              (app.opportunityId?._id || app.opportunityId) === hackathon._id
            );

            return (
              <div key={hackathon._id} className="group flex flex-col bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover-lift">
                {/* Image Container with Dynamic Badges */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlays */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>

                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {hasApplied && (
                      <div className="flex items-center px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border border-white/20">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Registered
                      </div>
                    )}
                    {hackathon.trending && (
                      <div className="flex items-center px-4 py-1.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg animate-pulse">
                        <Zap className="w-3 h-3 mr-1" /> Trending
                      </div>
                    )}
                    {hackathon.remote && (
                      <div className="flex items-center px-4 py-1.5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        <Globe className="w-3 h-3 mr-1" /> Virtual
                      </div>
                    )}
                  </div>

                  <div className="absolute top-6 right-6">
                    <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/30 transition-all text-white">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div className="flex items-center text-white">
                      <div className="w-10 h-10 bg-purple-500 rounded-xl border-2 border-white/20 flex items-center justify-center font-black">
                        {hackathon.company.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <span className="block text-xs text-white/60 font-medium">Hosted by</span>
                        <span className="block font-bold leading-tight">{hackathon.company}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-emerald-600 font-bold text-xs uppercase tracking-tighter flex items-center bg-emerald-50 px-3 py-1 rounded-lg">
                      <Trophy className="w-3.5 h-3.5 mr-1" /> {hackathon.prizes} Pool
                    </span>
                    <span className="flex items-center text-slate-400 text-[11px] font-black uppercase tracking-widest">
                      <Users className="w-3.5 h-3.5 mr-1" /> {hackathon.participants} Spots
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-purple-600 transition-colors line-clamp-1">
                    {hackathon.title}
                  </h3>

                  {/* Footer Actions */}
                  <div className="mt-auto flex items-center gap-3">
                    <Link
                      to={`/opportunity/${hackathon._id}`}
                      className={`flex-1 font-black text-center py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center group/btn ${hasApplied
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100"
                        : "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200"
                        }`}
                    >
                      {hasApplied ? 'View Registration' : 'Register Now'}{" "}
                      <Rocket className="ml-2 w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                    <button className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredHackathons.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 max-w-2xl mx-auto shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No hackathons found</h3>
            <p className="text-slate-500 mb-8">We couldn't find any events matching your criteria. Try adjusting your filters or follow our newsletter to get notified about new drops.</p>
            <button
              onClick={clearFilters}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-purple-100 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hackathons;