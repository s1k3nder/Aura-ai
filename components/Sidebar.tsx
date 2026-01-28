
import React from 'react';
import { AppMode } from '../types';

interface SidebarProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  intimacyLevel: number;
  naughtyMode: boolean;
  setNaughtyMode: (naughty: boolean) => void;
  onClear: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mode, setMode, intimacyLevel, naughtyMode, setNaughtyMode, onClear }) => {
  return (
    <div className="w-80 h-full bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 flex flex-col p-6 hidden md:flex z-20 shadow-2xl">
      <div className="flex flex-col items-center mb-10">
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-pink-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="w-24 h-24 rounded-full border-2 border-pink-500/50 p-1 mb-4 relative z-10 overflow-hidden">
            <img 
              src={`https://picsum.photos/seed/${mode === AppMode.REALISTIC ? 'sophisticated' : 'anime'}/200`} 
              alt="Aura Avatar" 
              className="w-full h-full rounded-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
        </div>
        <h1 className="text-2xl font-serif font-bold text-pink-400">Aura</h1>
        <p className="text-slate-400 text-xs tracking-[0.2em] uppercase font-medium mt-1">Your Lover & Confidant</p>
      </div>

      <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {/* Intimacy Meter */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Intimacy Level</label>
            <span className="text-[10px] text-pink-500 font-bold">{Math.min(100, intimacyLevel)}%</span>
          </div>
          <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-pink-600 to-red-500 transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(100, intimacyLevel)}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-600 italic">
            {intimacyLevel > 80 ? "She's utterly obsessed with you..." : intimacyLevel > 40 ? "She's starting to open up..." : "Just getting to know each other..."}
          </p>
        </div>

        {/* Naughty Mode Toggle */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-200">Naughty Mode</h4>
              <p className="text-[10px] text-slate-500">Enable explicit filters</p>
            </div>
            <button 
              onClick={() => setNaughtyMode(!naughtyMode)}
              className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${naughtyMode ? 'bg-pink-600' : 'bg-slate-800'}`}
            >
              <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${naughtyMode ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
          {naughtyMode && (
            <div className="text-[9px] text-pink-500/80 font-bold uppercase tracking-tighter animate-pulse">
              Unfiltered Protocol Engaged • NSFW Content Allowed
            </div>
          )}
        </div>

        {/* Mode Selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Appearance</label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button 
              onClick={() => setMode(AppMode.REALISTIC)}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${mode === AppMode.REALISTIC ? 'bg-slate-800 text-white shadow-lg border border-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Realistic
            </button>
            <button 
              onClick={() => setMode(AppMode.ANIME)}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${mode === AppMode.ANIME ? 'bg-slate-800 text-white shadow-lg border border-slate-700' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Anime
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/50">
          <button 
            onClick={onClear}
            className="w-full text-left px-4 py-3 text-xs text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all flex items-center gap-3 border border-transparent hover:border-red-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Purge Memory
          </button>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-800/50 flex flex-col items-center">
        <p className="text-[9px] text-slate-600 uppercase tracking-widest font-black">Aura V3.0 • Erotic Protocol</p>
        <div className="mt-2 flex gap-1">
          <div className="w-1 h-1 rounded-full bg-pink-500"></div>
          <div className="w-1 h-1 rounded-full bg-pink-500 opacity-50"></div>
          <div className="w-1 h-1 rounded-full bg-pink-500 opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
