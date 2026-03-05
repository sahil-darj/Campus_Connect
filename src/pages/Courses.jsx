import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Filter, Search, Clock, Users, DollarSign, Star, BookOpen,
  ChevronRight, Award, PlayCircle, BarChart, Globe, Bookmark, Share2, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockOpportunities } from '../data/mockData';
import { API_BASE_URL } from '../config';

const Courses = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    level: '',
    price: '',
    duration: '',
    provider: ''
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

  const courses = opportunities.filter(opp => opp.type === 'course');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesProvider = !filters.provider || course.company.toLowerCase().includes(filters.provider.toLowerCase());
    const matchesLevel = !filters.level || course.requirements.some(req => req.toLowerCase().includes(filters.level.toLowerCase()));

    return matchesSearch && matchesProvider && matchesLevel;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      level: '',
      price: '',
      duration: '',
      provider: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-t-emerald-600 border-r-4 border-r-emerald-200"></div>
          <p className="mt-4 text-slate-600 font-medium italic">Building curriculum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfc]">
      {/* Educational Header */}
      <div className="bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mb-6">
                <Award className="w-5 h-5" />
                <span>Certified Learning Tracks</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                Master New <span className="text-emerald-400">Skills</span> Today
              </h1>
              <p className="text-emerald-100/70 text-xl leading-relaxed">
                Unlock your potential with courses from the world's best tech companies and universities. Start learning for free or get certified.
              </p>
            </div>

            <div className="w-full lg:w-96">
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl">
                <h3 className="text-lg font-bold mb-4">Quick Search</h3>
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                  <input
                    type="text"
                    placeholder="Python, React, AI..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-emerald-100/50 transition-all font-medium"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black rounded-2xl transition-all shadow-lg flex items-center justify-center"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Advanced Filters
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
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">Skill Level</label>
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none font-medium"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">Price Range</label>
                <select
                  value={filters.price}
                  onChange={(e) => handleFilterChange('price', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none font-medium"
                >
                  <option value="">All Prices</option>
                  <option value="free">Free Courses</option>
                  <option value="paid">Premium / Paid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">Partner Provider</label>
                <input
                  type="text"
                  placeholder="e.g. Coursera"
                  value={filters.provider}
                  onChange={(e) => handleFilterChange('provider', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-6 py-3 text-emerald-600 font-bold border-2 border-dashed border-emerald-200 rounded-xl hover:bg-emerald-50 transition-all uppercase text-xs"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCourses.map((course) => {
            const isEnrolled = user?.applications?.some(app =>
              (app.opportunityId?._id || app.opportunityId) === course._id
            );

            return (
              <div key={course._id} className="group bg-white rounded-[2.5rem] border border-slate-200/60 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover-lift flex flex-col">
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60"></div>

                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {isEnrolled && (
                      <div className="flex items-center px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border border-white/20">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Enrolled
                      </div>
                    )}
                    <div className="flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                      <BarChart className="w-3 h-3 mr-1" /> {course.level || 'Beginner'}
                    </div>
                  </div>

                  <div className="absolute top-6 right-6">
                    <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white text-white hover:text-emerald-600 transition-all">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-6">
                    <div className="p-1 px-3 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-800 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      4.8 (2.4k)
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-lg">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {course.price}
                    </div>
                    <div className="text-slate-400 text-[10px] font-black uppercase flex items-center tracking-widest">
                      <Users className="w-3.5 h-3.5 mr-1" />
                      {course.enrolled + (isEnrolled ? 1 : 0)} Students
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
                    {course.title}
                  </h3>

                  <div className="mt-auto flex items-center gap-3">
                    <Link
                      to={`/opportunity/${course._id}`}
                      className={`flex-1 font-black text-center py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center group/btn ${isEnrolled
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100"
                        : "bg-slate-900 text-white hover:bg-emerald-600 shadow-slate-100"
                        }`}
                    >
                      {isEnrolled ? 'Resume Learning' : 'Start Learning'}{" "}
                      <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 hover:text-slate-600 transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-emerald-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No courses found</h3>
            <p className="text-slate-500 mb-8">We couldn't find any courses matching your search. Subscribe to get notified when new curriculum is added.</p>
            <button
              onClick={clearFilters}
              className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition-all"
            >
              Show All Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;