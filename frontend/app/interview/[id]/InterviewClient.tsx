"use client";

import { useRouter } from "next/navigation";
import { Video, Phone, MessageSquare, PhoneOff, MicOff, CameraOff, X, Maximize2, Settings, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

export default function InterviewClient({ id, mode, name }: { id: string, mode: string, name: string }) {
    const router = useRouter();
    const [time, setTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTime(t => t + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden font-sans">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[150px] mix-blend-screen"></div>
                <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen"></div>
                {mode === 'Video' && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>}
            </div>

            {/* Top Protocol Bar */}
            <div className="relative z-10 glass-panel border-x-0 border-t-0 p-4 flex justify-between items-center rounded-none bg-slate-900/60">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                        {mode === "Video" && <Video className="w-5 h-5 text-indigo-400" />}
                        {mode === "Voice" && <Phone className="w-5 h-5 text-indigo-400" />}
                        {mode === "Chat" && <MessageSquare className="w-5 h-5 text-indigo-400" />}
                    </div>
                    <div>
                        <h1 className="text-white font-bold tracking-wide flex items-center gap-2">
                            SALARITE // DEEP-LINK
                            <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">{mode} PROTOCOL</span>
                        </h1>
                        <p className="text-slate-400 text-xs font-mono">NODE-{id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
                        <Maximize2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Interface Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
                <div className="text-center space-y-8 max-w-2xl w-full">

                    {/* Central Avatar/Stream HUD */}
                    <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 mt-4">
                        {/* Outer rotating ring */}
                        <div className="absolute inset-[-10px] rounded-full border border-dashed border-indigo-500/30 animate-[spin_20s_linear_infinite]"></div>
                        <div className="absolute inset-[-20px] rounded-full border border-slate-700/50"></div>

                        <div className="absolute inset-0 bg-slate-900 rounded-full flex items-center justify-center border border-indigo-500/40 shadow-[0_0_50px_rgba(99,102,241,0.2)] overflow-hidden">
                            {mode === 'Video' ? (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent z-10"></div>
                                    <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay opacity-30 bg-repeat bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                                    <span className="text-8xl text-white font-light opacity-90 z-20" style={{ fontFamily: 'var(--font-outfit)' }}>{name.charAt(0).toUpperCase()}</span>
                                </>
                            ) : (
                                <span className="text-7xl text-slate-300 font-light" style={{ fontFamily: 'var(--font-outfit)' }}>{name.charAt(0).toUpperCase()}</span>
                            )}
                        </div>

                        {/* Live Indicator inside HUD */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2 shadow-xl">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                            <span className="text-white text-xs font-mono font-bold tracking-widest">{formatTime(time)}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-4xl text-white font-bold tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>{name}</h2>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                            <ShieldAlert className="w-4 h-4" /> End-to-End Encrypted
                        </div>
                    </div>

                    {mode === 'Chat' && (
                        <div className="glass-card rounded-2xl p-6 mt-8 border border-white/10 text-left h-64 overflow-y-auto w-full flex flex-col gap-4">
                            <div className="flex justify-center">
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest bg-slate-900/50 px-3 py-1 rounded-full border border-white/5">Connection Established</span>
                            </div>
                            <div className="flex flex-col items-start gap-1 w-full">
                                <span className="text-[10px] text-indigo-400 uppercase tracking-wider ml-1">{name}</span>
                                <div className="bg-indigo-500/10 border border-indigo-500/20 text-slate-200 p-3 rounded-2xl rounded-tl-sm max-w-[85%] leading-relaxed text-sm shadow-sm backdrop-blur-md">
                                    Hello, I am connected and ready for the interview via encrypted chat.
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Control Console */}
            <div className="relative z-10 glass-panel border-x-0 border-b-0 p-8 rounded-none bg-slate-900/80 backdrop-blur-xl">
                <div className="flex justify-center gap-6 max-w-sm mx-auto">
                    <button className="w-16 h-16 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center text-slate-300 transition-all border border-white/10 hover:border-white/20 shadow-lg">
                        <MicOff className="w-7 h-7" />
                    </button>
                    {mode === 'Video' && (
                        <button className="w-16 h-16 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center text-slate-300 transition-all border border-white/10 hover:border-white/20 shadow-lg">
                            <CameraOff className="w-7 h-7" />
                        </button>
                    )}
                    <button
                        onClick={() => router.back()}
                        className="w-16 h-16 bg-red-500/20 hover:bg-red-500/30 rounded-2xl flex items-center justify-center text-red-500 transition-all border border-red-500/40 hover:border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                    >
                        {mode === 'Chat' ? <X className="w-7 h-7" /> : <PhoneOff className="w-7 h-7" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
