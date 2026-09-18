import Link from 'next/link';
import { ArrowRight, Briefcase, MonitorPlay } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 relative">
      <div className="max-w-2xl w-full glass-panel p-10 md:p-14 rounded-3xl relative overflow-hidden group">

        {/* Subtle decorative glow */}
        <div className="absolute -top-[100px] -right-[100px] w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-indigo-500/30 transition-all duration-700"></div>

        <div className="relative z-10 text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 mb-4 tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
            Salarite
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-md mx-auto">
            The next generation of intelligent Virtual HR orchestration and interviewing.
          </p>
        </div>

        <div className="space-y-6 relative z-10">
          <Link href="/employer" className="group flex items-center justify-between w-full p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 rounded-2xl transition-all duration-300 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Briefcase size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Employer Overview</h3>
                <p className="text-sm text-slate-400">Assign tasks & monitor progress</p>
              </div>
            </div>
            <ArrowRight className="text-slate-500 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
          </Link>

          <Link href="/virtual-hr" className="group flex items-center justify-between w-full p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-2xl transition-all duration-300 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <MonitorPlay size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Virtual HR Terminal</h3>
                <p className="text-sm text-slate-400">Manage tasks & schedule interviews</p>
              </div>
            </div>
            <ArrowRight className="text-slate-500 group-hover:text-purple-400 transform group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
