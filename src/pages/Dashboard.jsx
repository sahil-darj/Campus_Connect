import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Calendar, Heart, TrendingUp, User, GraduationCap,
  School, ChevronRight, Award, Zap, Clock, ShieldCheck,
  MapPin, BrainCircuit, Rocket, Plus, Building2, ExternalLink, Trash2
} from 'lucide-react';

const Dashboard = () => {
  const { user, refreshUser, withdrawFromOpportunity } = useAuth();
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initDashboard = async () => {
      if (user) {
        await refreshUser();
      }
      setLoading(false);
    };
    initDashboard();
  }, []);

  const handleWithdraw = async (oppId) => {
    if (!window.confirm("Are you sure you want to withdraw this application? This action cannot be undone.")) return;

    setWithdrawing(oppId);
    try {
      await withdrawFromOpportunity(oppId);
    } catch (error) {
      console.error("Error withdrawing:", error);
      alert("Failed to withdraw application. Please try again.");
    } finally {
      setWithdrawing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-100 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-20 h-20 border-t-4 border-indigo-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-slate-500 font-black uppercase tracking-widest text-xs animate-pulse">Syncing Profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl text-center max-w-lg border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
          <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Login Restricted</h2>
          <p className="text-slate-500 mb-10 font-medium leading-relaxed">Your professional dashboard is protected. Please sign in to sync your applications and career progress.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-500/20"
          >
            Authenticate Identity
          </button>
        </div>
      </div>
    );
  }

  const applications = user.applications || [];

  return (
    <div className="min-h-screen bg-[#fcfaff] pb-24">
      {/* Immersive Dashboard Header */}
      <div className="bg-slate-900 text-white pt-32 pb-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div className="w-28 h-28 p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] shadow-2xl">
                  <div className="w-full h-full bg-slate-900 rounded-[2.2rem] overflow-hidden flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-indigo-400" />
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-2xl shadow-lg border-4 border-slate-900">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                    Howdy, <span className="text-indigo-400">{user.name.split(' ')[0]}!</span>
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm font-bold uppercase tracking-widest">
                  <span className="flex items-center"><GraduationCap className="w-4 h-4 mr-2 text-indigo-500" /> {user.major || 'Undergraduate'}</span>
                  <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                  <span className="flex items-center"><School className="w-4 h-4 mr-2 text-indigo-500" /> {user.university || 'Global University'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="px-8 py-5 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 text-center min-w-[140px] hover:bg-white/10 transition-all group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-1">Activations</p>
                <p className="text-3xl font-black tracking-tight">{applications.length}</p>
              </div>
              <div className="px-8 py-5 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 text-center min-w-[140px] hover:bg-white/10 transition-all group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-1">Batch</p>
                <p className="text-3xl font-black tracking-tight">'{user.year?.slice(-2) || '24'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Activity Stream */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Involvements</h2>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Sync Enabled</span>
              </div>
            </div>

            <div className="space-y-4">
              {applications.length > 0 ? (
                applications.map((app, index) => {
                  const opp = app.opportunityId;
                  if (!opp) return null;
                  return (
                    <div key={index} className="group bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 flex flex-col md:flex-row md:items-center gap-8">
                      <div className="w-20 h-20 rounded-[1.8rem] overflow-hidden shadow-lg group-hover:scale-105 transition-transform shrink-0 border-4 border-slate-50">
                        <img src={opp.image} alt={opp.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            app.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                              'bg-slate-50 text-slate-600 border-slate-100'
                            }`}>
                            {app.status || 'Verified Submission'}
                          </span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                            <Clock className="w-3 h-3 mr-2" /> Applied {new Date(app.appliedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-black text-slate-900 text-xl tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{opp.title}</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.15em] mt-2 flex items-center">
                          <Building2 className="w-3.5 h-3.5 mr-2 text-indigo-400" /> {opp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link to={`/opportunity/${opp._id}`} className="px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all">
                          Review Detail
                        </Link>
                        <button
                          onClick={() => handleWithdraw(opp._id)}
                          disabled={withdrawing === opp._id}
                          className="p-4 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group/cancel"
                          title="Cancel Application"
                        >
                          <Trash2 className={`w-5 h-5 ${withdrawing === opp._id ? 'animate-spin' : 'group-hover/cancel:scale-110'} transition-all`} />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-24 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-200 shadow-inner">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
                    <Rocket className="w-12 h-12 text-slate-200" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tighter">Your Hub is Empty</h3>
                  <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto leading-relaxed">It's time to launch! Search through premium internships, hackathons, and certified courses to get started.</p>
                  <Link to="/internships" className="inline-flex items-center px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100">
                    Explore Opportunities <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Side Module: Insights */}
          <div className="space-y-8">
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full translate-x-12 -translate-y-12 blur-3xl group-hover:bg-indigo-500/10 transition-all"></div>

              <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Career Insight</h3>

              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-3 uppercase tracking-widest font-black text-[10px] text-slate-400">
                    <span>Profile Authority</span>
                    <span className="text-indigo-600">82%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-900">Career Tip</p>
                      <p className="text-[10px] font-bold text-slate-500">Curated for you</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                    "Applying within the first 48 hours of a drop increases your visibility to hiring partners by 65%."
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black">1</div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-900">Add Portfolio</h4>
                      <p className="text-[10px] font-bold text-slate-400">Boost authority by +15%</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black">2</div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-900">Connect Github</h4>
                      <p className="text-[10px] font-bold text-slate-400">Boost authority by +20%</p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 shadow-xl transition-all">
                Optimise Resume
              </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
              </div>

              <Award className="w-12 h-12 text-white/30 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-4 tracking-tight">Premium Access</h3>
              <p className="text-white/70 text-sm font-medium leading-relaxed mb-8">Unlock exclusive drops, 1-on-1 mentorship, and early access to global hackathons.</p>
              <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-2xl transition-all">
                Upgrade to Pro
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;