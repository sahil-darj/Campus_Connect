import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Trophy,
  BookOpen,
  Heart,
  Share2,
  ExternalLink,
  ShieldCheck,
  Zap,
  ChevronRight,
  Award,
  MessageSquare,
  Globe,
  Building2,
  Rocket,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { mockOpportunities } from "../data/mockData";
import { API_BASE_URL } from "../config";

const OpportunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, applyToOpportunity } = useAuth();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/opportunities/${id}`);
        const data = await response.json();

        if (data && data._id) {
          setOpportunity(data);
        } else {
          // Fallback to mock data
          const mockItem = mockOpportunities.find(
            (opp) => opp.id.toString() === id || opp._id === id
          );
          setOpportunity(mockItem);
        }

        // Check if user already applied
        if (user && user.applications) {
          const alreadyApplied = user.applications.some(
            (app) => (app.opportunityId?._id || app.opportunityId) === id
          );
          setIsApplied(alreadyApplied);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching opportunity:", err);
        // Fallback to mock data on error
        const mockItem = mockOpportunities.find(
          (opp) => opp.id.toString() === id || opp._id === id
        );
        setOpportunity(mockItem);
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [id, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-100 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-20 h-20 border-t-4 border-indigo-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-slate-500 font-black uppercase tracking-widest text-xs">
          Retrieving details...
        </p>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-lg border border-slate-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
            Opportunity Missing
          </h2>
          <p className="text-slate-500 mb-8 font-medium">
            The link might be expired or the opportunity has been removed by the
            host. Check out other trending drops instead.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-600 transition-all shadow-lg"
          >
            Explore Active Drops
          </button>
        </div>
      </div>
    );
  }

  const handleApply = async () => {
    if (!user) {
      alert("Elevate your profile. Please sign in to apply.");
      return;
    }

    setApplying(true);
    try {
      await applyToOpportunity(id);
      setIsApplied(true);
      // Removed setShowSuccess(true) here because we will use a more robust way if needed
      // Actually, let's keep it but ensure it's rendered below
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Application error:", error);
      alert(
        error.response?.data?.message || "Failed to apply. Please try again."
      );
    } finally {
      setApplying(false);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const themeColors = {
    internship: {
      primary: "indigo",
      bg: "bg-indigo-600",
      text: "text-indigo-600",
      light: "bg-indigo-50",
      border: "border-indigo-100",
    },
    hackathon: {
      primary: "purple",
      bg: "bg-purple-600",
      text: "text-purple-600",
      light: "bg-purple-50",
      border: "border-purple-100",
    },
    course: {
      primary: "emerald",
      bg: "bg-emerald-600",
      text: "text-emerald-600",
      light: "bg-emerald-50",
      border: "border-emerald-100",
    },
  };

  const theme = themeColors[opportunity.type] || themeColors.internship;

  return (
    <div className="min-h-screen bg-[#fcfaff]">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 animate-in slide-in-from-top-8 duration-500">
          <div className="bg-slate-900 border border-emerald-500/30 p-6 rounded-[2rem] shadow-2xl flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-black uppercase tracking-widest text-[10px]">
                Transmission Success
              </p>
              <p className="text-slate-400 text-xs font-medium">
                Your credentials have been securely pushed to{" "}
                {opportunity.company}.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Immersive Hero Header */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={opportunity.image}
          alt={opportunity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

        {/* Top Navbar Style Back Link */}
        <div className="absolute top-8 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center px-4 py-2.5 bg-white/10 backdrop-blur-md rounded-2xl text-white font-bold text-sm border border-white/10 hover:bg-white hover:text-slate-900 transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Feed
            </button>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className={`px-4 py-1.5 ${theme.bg} text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl`}
                >
                  {opportunity.type}
                </span>
                {opportunity.trending && (
                  <span className="px-4 py-1.5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl flex items-center">
                    <Zap className="w-3 h-3 mr-1" /> Trending Drop
                  </span>
                )}
                {opportunity.remote && (
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/20">
                    <Globe className="w-3 h-3 mr-1" /> All Access Remote
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                {opportunity.title}
              </h1>
              <div className="flex items-center text-slate-300">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mr-4 border border-white/10">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="block text-xs font-black uppercase tracking-widest text-slate-400">
                    Hiring Partner
                  </span>
                  <span className="text-xl font-bold text-white">
                    {opportunity.company}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value: opportunity.location,
                },
                { icon: Clock, label: "Duration", value: opportunity.duration },
                {
                  icon: Calendar,
                  label: "Deadline",
                  value: new Date(opportunity.deadline).toLocaleDateString(),
                },
                {
                  icon: opportunity.type === "hackathon" ? Trophy : DollarSign,
                  label:
                    opportunity.type === "hackathon"
                      ? "Prize Pool"
                      : "Compensation",
                  value:
                    opportunity.type === "internship"
                      ? opportunity.salary || "Competitive"
                      : opportunity.prizes || opportunity.price || "Free",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-10 h-10 ${theme.light} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <stat.icon className={`w-5 h-5 ${theme.text}`} />
                  </div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                    {stat.label}
                  </span>
                  <span className="block font-bold text-slate-800 text-sm truncate">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Description & Detail Sections */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm space-y-12">
              <section>
                <div className="flex items-center space-x-3 mb-8">
                  <div className={`w-1.5 h-8 ${theme.bg} rounded-full`}></div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Executive Summary
                  </h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    {opportunity.description}
                  </p>
                </div>
                <div className="mt-8 p-6 bg-slate-50 rounded-3xl flex items-start">
                  <Award
                    className={`w-6 h-6 ${theme.text} mr-4 shrink-0 mt-1`}
                  />
                  <div>
                    <h4 className="font-black text-slate-800 uppercase tracking-widest text-xs mb-2">
                      Key Value Proposition
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">
                      This opportunity is highly rated by past participants for
                      its mentorship quality and industry recognition. Perfect
                      for students looking to scale their technical expertise.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center space-x-3 mb-8">
                  <div className={`w-1.5 h-8 ${theme.bg} rounded-full`}></div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Prerequisites & Stack
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {opportunity.requirements?.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center px-5 py-3 ${theme.light} border ${theme.border} rounded-2xl`}
                    >
                      <Zap className={`w-4 h-4 ${theme.text} mr-2`} />
                      <span
                        className={`text-sm font-black uppercase tracking-tight ${theme.text}`}
                      >
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="pt-8 border-t border-slate-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 uppercase tracking-[0.2em] font-black text-[10px] text-slate-400">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Drop Live Since:{" "}
                    {new Date(opportunity.posted).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Participation Index:{" "}
                    {opportunity.applicants ||
                      opportunity.participants ||
                      opportunity.enrolled ||
                      0}{" "}
                    Activations
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/10 transition-all"></div>

                <h3 className="text-xl font-black text-white mb-6 tracking-tight relative z-10">
                  Application Hub
                </h3>

                <div className="space-y-4 relative z-10">
                  <button
                    onClick={handleApply}
                    disabled={isApplied || applying}
                    className={`w-full py-5 px-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 ${
                      isApplied
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-not-allowed"
                        : applying
                        ? "bg-slate-800 text-slate-400 cursor-wait animate-pulse"
                        : `bg-white text-slate-900 hover:bg-indigo-500 hover:text-white shadow-xl hover:shadow-indigo-500/20`
                    }`}
                  >
                    {applying ? (
                      <Zap className="w-5 h-5 animate-spin" />
                    ) : isApplied ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : (
                      <Rocket className="w-5 h-5" />
                    )}
                    {applying
                      ? "Processing..."
                      : isApplied
                      ? opportunity.type === "internship"
                        ? "Applied Successfully"
                        : opportunity.type === "course"
                        ? "Enrolled"
                        : "Registered"
                      : opportunity.type === "internship"
                      ? "Initiate Application"
                      : opportunity.type === "course"
                      ? "Start Learning"
                      : "Claim Your Spot"}
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleSave}
                      className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] transition-all ${
                        isSaved
                          ? "bg-rose-500/10 border-rose-500 text-rose-500"
                          : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                      />
                      {isSaved ? "Saved" : "Save"}
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-white/10 bg-white/5 text-white hover:bg-white/10 font-black uppercase tracking-widest text-[10px] transition-all">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between text-white/50 text-[10px] font-black uppercase tracking-widest mb-4">
                    <span>Recruitment Intelligence</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all border border-white/5 group/row">
                      <span className="text-white/60 text-xs font-bold">
                        Offer Status
                      </span>
                      <span className="text-emerald-400 font-black uppercase text-[10px] animate-pulse">
                        Accepting
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                      <span className="text-white/60 text-xs font-bold">
                        Difficulty
                      </span>
                      <span className="text-white font-black uppercase text-[10px]">
                        Moderate
                      </span>
                    </div>
                  </div>
                </div>

                {!user && (
                  <div className="mt-8 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl">
                    <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest text-center">
                      Verified Identity Required to Apply
                    </p>
                  </div>
                )}
              </div>

              {/* Company Sidebar Info */}
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">
                  About the Host
                </h4>
                <div className="flex items-center mb-6">
                  <div
                    className={`w-14 h-14 ${theme.light} rounded-2xl flex items-center justify-center mr-4 border ${theme.border}`}
                  >
                    <Building2 className={`w-7 h-7 ${theme.text}`} />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 tracking-tight">
                      {opportunity.company}
                    </span>
                    <a
                      href="#"
                      className="text-indigo-600 text-xs font-bold flex items-center hover:underline"
                    >
                      Official Website <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
                <p className="text-slate-500 text-xs font-medium leading-relaxed italic border-l-2 border-slate-100 pl-4">
                  "Pioneering digital experiences through innovation and student
                  collaboration since 2018."
                </p>
                <button className="w-full mt-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center">
                  Learn More <ChevronRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
