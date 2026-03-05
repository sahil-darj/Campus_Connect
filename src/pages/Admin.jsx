import React, { useState } from 'react';
import {
    PlusCircle, Trash2, Edit, Save, X, LayoutDashboard,
    Settings, LogOut, ShieldCheck, Zap, Globe, Image,
    FileText, Briefcase, Trophy, GraduationCap, ChevronRight,
    ArrowRight, Lock, User, MapPin, Clock, BrainCircuit, DollarSign
} from 'lucide-react';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ adminId: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [activeTab, setActiveTab] = useState('add');

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.adminId === 'admin' && loginData.password === 'admin123') {
            setIsAuthenticated(true);
            setLoginError('');
        } else {
            setLoginError('Invalid Admin ID or Password');
        }
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        type: 'internship',
        location: '',
        duration: '',
        description: '',
        requirements: '',
        deadline: '',
        salary: '',
        prizes: '',
        price: '',
        remote: false,
        trending: false,
        image: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requirementsArray = formData.requirements.split(',').map(req => req.trim());

        try {
            const response = await fetch('http://localhost:5000/api/opportunities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    requirements: requirementsArray,
                }),
            });

            const contentType = response.headers.get("content-type");
            if (response.ok) {
                setMessage('Success: Opportunity published to the network.');
                setFormData({
                    title: '', company: '', type: 'internship', location: '',
                    duration: '', description: '', requirements: '', deadline: '',
                    salary: '', prizes: '', price: '', remote: false,
                    trending: false, image: '',
                });
                setTimeout(() => setMessage(''), 5000);
            } else {
                setMessage('Error: Failed to synchronize with server.');
            }
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-md w-full relative z-10">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/20 transform -rotate-6">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2 italic">Admin Gate</h1>
                        <p className="text-slate-400 font-medium">Verify credentials to access core systems.</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {loginError && (
                                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-xs font-black uppercase tracking-widest text-center">
                                    {loginError}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Secure ID</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <input
                                        name="adminId"
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold"
                                        placeholder="Enter Admin ID"
                                        value={loginData.adminId}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Key</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold"
                                        placeholder="••••••••"
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5 flex items-center justify-center group"
                            >
                                Authorize Access <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f1f5f9] flex">
            {/* Minimalist Sidebar */}
            <aside className="w-72 bg-slate-900 border-r border-slate-800 p-8 hidden xl:flex flex-col fixed inset-y-0">
                <div className="flex items-center space-x-3 mb-12">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-12">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-black uppercase tracking-tighter text-xl italic">Admin<span className="text-indigo-500">Suite</span></span>
                </div>

                <nav className="flex-grow space-y-2">
                    {[
                        { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
                        { id: 'add', icon: PlusCircle, label: 'New Drop' },
                        { id: 'content', icon: FileText, label: 'Manage Feed' },
                        { id: 'settings', icon: Settings, label: 'System Prefs' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center px-4 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${activeTab === item.id
                                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20'
                                : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                                }`}
                        >
                            <item.icon className="w-4 h-4 mr-3" />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="flex items-center px-4 py-3.5 text-slate-500 hover:text-rose-400 font-black uppercase tracking-widest text-[10px] transition-all mt-auto"
                >
                    <LogOut className="w-4 h-4 mr-3" />
                    Terminate Session
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow xl:ml-72 min-h-screen pb-24">
                <header className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-[40]">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Management</h1>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Node: v2.4.0-Stable // Operational</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                                <Zap className="w-5 h-5 text-amber-500" />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signed In As</p>
                                <p className="text-sm font-black text-slate-900">Chief Architect</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto px-8 py-12">
                    {message && (
                        <div className={`mb-10 p-6 rounded-[2rem] flex items-center border ${message.includes('Error')
                            ? 'bg-rose-50 border-rose-100 text-rose-600'
                            : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                            } animate-in slide-in-from-top-4 duration-500`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${message.includes('Error') ? 'bg-rose-100' : 'bg-emerald-100'
                                }`}>
                                {message.includes('Error') ? <X className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                            </div>
                            <span className="font-black uppercase tracking-widest text-[10px]">{message}</span>
                        </div>
                    )}

                    <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex items-center space-x-3 mb-12">
                            <div className="w-1.5 h-10 bg-indigo-600 rounded-full"></div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Deploy New Opportunity</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Core Identity */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Opportunity Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Senior Frontend Engineer"
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company / Entity</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Tesla Inc."
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                                    />
                                </div>
                            </div>

                            {/* Structural Metadata */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category Type</label>
                                    <div className="relative">
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700 appearance-none"
                                        >
                                            <option value="internship">Internship</option>
                                            <option value="hackathon">Hackathon</option>
                                            <option value="course">Course</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Global Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            required
                                            placeholder="City, Country"
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Timeframe / Length</label>
                                    <div className="relative">
                                        <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                        <input
                                            type="text"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            placeholder="e.g. 6 Months"
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Narrative */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Comprehensive Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="Describe the mission, role, and impact..."
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700 resize-none"
                                ></textarea>
                            </div>

                            {/* Technical Stack */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Required Stack (Comma Separated)</label>
                                <div className="relative">
                                    <BrainCircuit className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                    <input
                                        type="text"
                                        name="requirements"
                                        value={formData.requirements}
                                        onChange={handleChange}
                                        placeholder="React, AWS, Python, Figma"
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                                    />
                                </div>
                            </div>

                            {/* Finance & Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Final Submission Date</label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Value / Reward / Price</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                        <input
                                            type="text"
                                            name={formData.type === 'internship' ? 'salary' : (formData.type === 'hackathon' ? 'prizes' : 'price')}
                                            value={formData.type === 'internship' ? formData.salary : (formData.type === 'hackathon' ? formData.prizes : formData.price)}
                                            onChange={handleChange}
                                            placeholder="e.g. $5k/Mo or $10k Prize"
                                            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Media & Flags */}
                            <div className="space-y-8 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cover Image Source (URL)</label>
                                    <div className="relative">
                                        <Image className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                        <input
                                            type="text"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="https://source.unsplash.com/..."
                                            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-12">
                                    <label className="flex items-center cursor-pointer group">
                                        <div className="relative inline-block w-12 h-6 mr-3 transition duration-200 ease-in-out bg-slate-200 rounded-full group-hover:bg-slate-300">
                                            <input
                                                type="checkbox"
                                                name="remote"
                                                checked={formData.remote}
                                                onChange={handleChange}
                                                className="absolute w-6 h-6 bg-white border-2 border-slate-200 rounded-full appearance-none cursor-pointer peer checked:right-0 checked:bg-indigo-600 checked:border-indigo-600"
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Remote Ready</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer group">
                                        <div className="relative inline-block w-12 h-6 mr-3 transition duration-200 ease-in-out bg-slate-200 rounded-full group-hover:bg-slate-300">
                                            <input
                                                type="checkbox"
                                                name="trending"
                                                checked={formData.trending}
                                                onChange={handleChange}
                                                className="absolute w-6 h-6 bg-white border-2 border-slate-200 rounded-full appearance-none cursor-pointer peer checked:right-0 checked:bg-amber-500 checked:border-amber-500"
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mark as Trending</span>
                                    </label>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-slate-900 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-indigo-200 hover:bg-indigo-600 transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center space-x-3"
                                >
                                    <Zap className="w-5 h-5 text-amber-400" />
                                    <span>Finalize & Push to Network</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Admin;

