"use client";

import { useState, useEffect } from "react";
import { getTasks, updateTaskStatus, getInterviews, createInterview } from "@/lib/api";
import { Calendar, Video, Phone, MessageSquare, Briefcase, RefreshCw, CheckCircle, ChevronRight, User, Mail, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VirtualHRDashboard() {
    const router = useRouter();
    const [tasks, setTasks] = useState<any[]>([]);
    const [interviews, setInterviews] = useState<any[]>([]);
    const [isUpdating, setIsUpdating] = useState<number | null>(null);
    const [isScheduling, setIsScheduling] = useState(false);

    const [interviewData, setInterviewData] = useState({
        candidate_name: "",
        candidate_email: "",
        interview_date: "",
        interview_time: "",
        mode: "Video"
    });

    const fetchData = async () => {
        try {
            const [tasksData, interviewsData] = await Promise.all([
                getTasks(),
                getInterviews()
            ]);
            setTasks(tasksData);
            setInterviews(interviewsData);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusChange = async (taskId: number, newStatus: string) => {
        try {
            setIsUpdating(taskId);
            setTasks(tasks.map((t: any) => t.id === taskId ? { ...t, status: newStatus } : t));
            await updateTaskStatus(taskId, newStatus);
        } catch (error) {
            console.error("Failed to update status", error);
            fetchData();
        } finally {
            setIsUpdating(null);
        }
    };

    const handleInterviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsScheduling(true);
        try {
            await createInterview(interviewData);
            setInterviewData({
                candidate_name: "",
                candidate_email: "",
                interview_date: "",
                interview_time: "",
                mode: "Video"
            });
            fetchData();
        } catch (error) {
            console.error("Failed to schedule interview", error);
        } finally {
            setIsScheduling(false);
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles: Record<string, string> = {
            "Pending": "text-white/40 hover:text-amber-400 hover:bg-amber-400/10",
            "In Progress": "text-white/40 hover:text-blue-400 hover:bg-blue-400/10",
            "Completed": "text-white/40 hover:text-emerald-400 hover:bg-emerald-400/10"
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${styles[status]}`}>
                {status}
            </span>
        );
    };

    const getModeIcon = (mode: string) => {
        if (mode === 'Voice') return <Phone className="w-4 h-4 mr-2" />;
        if (mode === 'Video') return <Video className="w-4 h-4 mr-2" />;
        return <MessageSquare className="w-4 h-4 mr-2" />;
    };

    return (
        <div className="min-h-screen p-6 md:p-10 relative">
            <div className="absolute top-20 right-[15%] w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center">
                                Home <ChevronRight className="w-3 h-3 mx-1" />
                            </Link>
                            <span className="text-purple-400 text-sm font-medium">HR Terminal</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Virtual HR Central
                        </h1>
                        <p className="text-slate-400 mt-2">Manage assigned operations and coordinate candidate engagements.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">

                    {/* Operations List */}
                    <div className="glass-panel rounded-2xl flex flex-col overflow-hidden border border-white/5 h-[800px]">
                        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <h2 className="text-lg font-semibold text-white flex items-center">
                                <Briefcase className="mr-3 h-5 w-5 text-purple-400" />
                                Active Directives
                            </h2>
                            <button onClick={fetchData} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                                <RefreshCw className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="p-4 flex-1 overflow-y-auto space-y-4">
                            {tasks.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                    <Briefcase className="w-12 h-12 mb-4 opacity-20" />
                                    <p>Awaiting employer directives.</p>
                                </div>
                            ) : (
                                tasks.map((task: any) => (
                                    <div key={task.id} className="glass-card p-5 rounded-xl border border-transparent hover:border-purple-500/30 transition-all group relative overflow-hidden">
                                        {isUpdating === task.id && (
                                            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
                                                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        <h3 className="font-semibold text-white text-lg mb-2">{task.title}</h3>
                                        <p className="text-slate-400 text-sm mb-5 leading-relaxed">{task.description}</p>

                                        <div className="bg-slate-900/50 rounded-lg p-1.5 flex gap-1 justify-between items-center border border-white/5">
                                            {['Pending', 'In Progress', 'Completed'].map(status => {
                                                const isActive = task.status === status;
                                                const styles = isActive
                                                    ? status === 'Completed' ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                                        : status === 'In Progress' ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                                            : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5 border-transparent";

                                                return (
                                                    <button
                                                        key={status}
                                                        onClick={() => handleStatusChange(task.id, status)}
                                                        className={`flex-1 text-xs px-3 py-2 rounded-md font-medium transition-all border ${styles}`}
                                                    >
                                                        {status}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="space-y-8 flex flex-col h-[800px]">
                        {/* Scheduler */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none"></div>

                            <h2 className="text-lg font-semibold mb-6 flex items-center text-white">
                                <Calendar className="mr-3 h-5 w-5 text-purple-400" />
                                Schedule Candidate
                            </h2>

                            <form onSubmit={handleInterviewSubmit} className="space-y-5 relative z-10">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Subject Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                type="text" required
                                                value={interviewData.candidate_name}
                                                onChange={(e) => setInterviewData({ ...interviewData, candidate_name: e.target.value })}
                                                className="w-full rounded-xl glass-input pl-10 pr-4 py-3 text-sm focus:ring-purple-500/50"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Contact Link</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                type="email" required
                                                value={interviewData.candidate_email}
                                                onChange={(e) => setInterviewData({ ...interviewData, candidate_email: e.target.value })}
                                                className="w-full rounded-xl glass-input pl-10 pr-4 py-3 text-sm focus:ring-purple-500/50"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Date</label>
                                        <input
                                            type="date" required
                                            value={interviewData.interview_date}
                                            onChange={(e) => setInterviewData({ ...interviewData, interview_date: e.target.value })}
                                            className="w-full rounded-xl glass-input px-3 py-3 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Time</label>
                                        <input
                                            type="time" required
                                            value={interviewData.interview_time}
                                            onChange={(e) => setInterviewData({ ...interviewData, interview_time: e.target.value })}
                                            className="w-full rounded-xl glass-input px-3 py-3 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Mode</label>
                                        <select
                                            value={interviewData.mode}
                                            onChange={(e) => setInterviewData({ ...interviewData, mode: e.target.value })}
                                            className="w-full rounded-xl glass-input px-3 py-3 text-sm appearance-none"
                                        >
                                            <option className="bg-slate-800" value="Voice">Voice</option>
                                            <option className="bg-slate-800" value="Video">Video</option>
                                            <option className="bg-slate-800" value="Chat">Chat</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit" disabled={isScheduling}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 disabled:opacity-70 mt-2"
                                >
                                    {isScheduling ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <><Plus className="w-4 h-4" /> Finalize Scheduling</>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Interviews Queue */}
                        <div className="glass-panel flex-1 rounded-2xl flex flex-col border border-white/5 overflow-hidden">
                            <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-white flex items-center">
                                    <CheckCircle className="mr-3 h-5 w-5 text-emerald-400" />
                                    Upcoming Sessions
                                </h2>
                                <div className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/50">{interviews.length} Total</div>
                            </div>

                            <div className="p-4 flex-1 overflow-y-auto space-y-3">
                                {interviews.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                        <p>Schedule clear.</p>
                                    </div>
                                ) : (
                                    interviews.map((intv: any) => (
                                        <div key={intv.id} className="glass-card p-4 rounded-xl flex flex-col hover:border-purple-500/20 transition-colors border border-transparent">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-semibold text-white">{intv.candidate_name}</h3>
                                                    <p className="text-xs text-slate-400">{intv.candidate_email}</p>
                                                </div>
                                                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-semibold">
                                                    {intv.status || "Scheduled"}
                                                </span>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => router.push(`/interview/${intv.id}?mode=${intv.mode}&name=${encodeURIComponent(intv.candidate_name)}`)}
                                                    className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all border
                            ${intv.mode === 'Video' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/20' :
                                                            intv.mode === 'Voice' ? 'bg-orange-500/10 text-orange-400 border-orange-500/30 hover:bg-orange-500/20' :
                                                                'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'}`}
                                                >
                                                    {getModeIcon(intv.mode)} Join Protocol
                                                </button>
                                                <div className="bg-slate-800/80 border border-white/5 text-slate-300 rounded-lg flex items-center px-4 text-xs font-medium">
                                                    <Calendar className="w-3.5 h-3.5 mr-2 text-slate-500" />
                                                    {intv.interview_date} • {intv.interview_time.substring(0, 5)}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
