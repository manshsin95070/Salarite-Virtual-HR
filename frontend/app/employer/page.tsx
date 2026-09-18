"use client";

import { useState, useEffect } from "react";
import { getTasks, createTask } from "@/lib/api";
import { PlusCircle, Clock, AlertCircle, CheckCircle2, ChevronRight, Activity } from "lucide-react";
import Link from "next/link";

export default function EmployerDashboard() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        due_date: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    useEffect(() => {
        fetchTasks();
        const interval = setInterval(fetchTasks, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title) return;

        setIsSubmitting(true);
        try {
            const newTask = {
                ...formData,
                due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
            };
            await createTask(newTask);
            setFormData({ title: "", description: "", priority: "Medium", due_date: "" });
            fetchTasks();
        } catch (error) {
            console.error("Failed to create task", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles: Record<string, string> = {
            "Pending": "bg-amber-500/10 text-amber-400 border-amber-500/30",
            "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/30",
            "Completed": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
        };
        const s = styles[status] || "bg-slate-500/10 text-slate-400 border-slate-500/30";
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${s}`}>
                {status}
            </span>
        );
    };

    return (
        <div suppressHydrationWarning className="min-h-screen p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center">
                                Home <ChevronRight className="w-3 h-3 mx-1" />
                            </Link>
                            <span className="text-indigo-400 text-sm font-medium">Employer Dashboard</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Command Center
                        </h1>
                        <p className="text-slate-400 mt-2">Delegate operations to your Virtual HR and monitor execution in real-time.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-6">
                        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px]"></div>

                            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
                                <PlusCircle className="mr-3 h-5 w-5 text-indigo-400" />
                                Deploy Task
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Task Directive</label>
                                    <input
                                        type="text" required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full rounded-xl glass-input px-4 py-3 text-sm transition-all"
                                        placeholder="e.g. Schedule Product Manager Interview"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Parameters</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full rounded-xl glass-input px-4 py-3 text-sm h-28 resize-none transition-all"
                                        placeholder="Provide execution details..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Priority</label>
                                        <select
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                            className="w-full rounded-xl glass-input px-3 py-3 text-sm appearance-none"
                                        >
                                            <option className="bg-slate-800" value="Low">Low</option>
                                            <option className="bg-slate-800" value="Medium">Medium</option>
                                            <option className="bg-slate-800" value="High">High</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Deadline</label>
                                        <input
                                            type="datetime-local"
                                            value={formData.due_date}
                                            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                            className="w-full rounded-xl glass-input px-3 py-3 text-sm"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit" disabled={isSubmitting}
                                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Deploy to Virtual HR <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="glass-panel rounded-2xl h-full flex flex-col border border-white/5">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h2 className="text-xl font-semibold text-white flex items-center">
                                    <Activity className="mr-3 h-5 w-5 text-indigo-400" />
                                    Active Operations
                                </h2>
                                <div className="flex items-center text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20 font-medium">
                                    <span className="relative flex h-2 w-2 mr-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    Live Sync
                                </div>
                            </div>

                            <div className="p-2 flex-1 max-h-[700px] overflow-y-auto">
                                {tasks.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center p-12 text-slate-500">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-slate-600" />
                                        </div>
                                        <p className="text-lg font-medium text-slate-400">All clear</p>
                                        <p className="text-sm mt-1">No operations currently active.</p>
                                    </div>
                                ) : (
                                    <ul className="space-y-2 p-4">
                                        {tasks.map((task: any) => (
                                            <li key={task.id} className="glass-card p-5 rounded-xl transition-all hover:bg-white/5 border border-transparent hover:border-white/10">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h3 className="font-semibold text-white text-lg">{task.title}</h3>
                                                    <StatusBadge status={task.status} />
                                                </div>

                                                {task.description && (
                                                    <p className="text-slate-400 text-sm mb-5 leading-relaxed">{task.description}</p>
                                                )}

                                                <div className="flex flex-wrap gap-2 text-xs">
                                                    <span className="px-2.5 py-1.5 rounded-lg font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50 flex items-center">
                                                        <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                                                        {task.due_date ? new Date(task.due_date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'No deadline'}
                                                    </span>

                                                    <span className={`px-2.5 py-1.5 rounded-lg font-medium border flex items-center
                            ${task.priority === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                            task.priority === 'Medium' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                                                'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}
                                                    >
                                                        <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                                                        {task.priority}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
