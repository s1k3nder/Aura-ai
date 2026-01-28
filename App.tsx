
import React, { useState, useCallback, useEffect } from 'react';
import { AppMode, Message, ChatState } from './types';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import InputArea from './components/InputArea';
import { generateChatResponse, synthesizeImage } from './services/geminiService';

const STORAGE_KEY = 'aura_erotic_memory_v3';

const App: React.FC = () => {
  const [state, setState] = useState<ChatState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...parsed, isTyping: false };
      } catch (e) {
        console.error("Failed to load memory", e);
      }
    }
    return {
      messages: [],
      mode: AppMode.REALISTIC,
      isTyping: false,
      intimacyLevel: 0,
      naughtyMode: false
    };
  });

  const [mood, setMood] = useState<string>("Devoted");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      messages: state.messages,
      mode: state.mode,
      intimacyLevel: state.intimacyLevel,
      naughtyMode: state.naughtyMode
    }));
  }, [state.messages, state.mode, state.intimacyLevel, state.naughtyMode]);

  const handleSendMessage = useCallback(async (text: string, userImage?: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      image: userImage
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true
    }));

    try {
      const response = await generateChatResponse(
        [...state.messages, userMessage], 
        state.mode, 
        state.naughtyMode,
        userImage
      );
      
      setMood(response.mood || "Devoted");
      
      let generatedImageUrl: string | null = null;
      if (response.shouldGenerateImage && response.imageDescription) {
        generatedImageUrl = await synthesizeImage(response.imageDescription, state.mode, state.naughtyMode);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "I'm lost in you, my love.",
        timestamp: Date.now(),
        image: generatedImageUrl || undefined,
        isImageGeneration: !!generatedImageUrl
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        intimacyLevel: Math.min(100, prev.intimacyLevel + (response.intimacyIncrease || 1)),
        isTyping: false
      }));
    } catch (error) {
      console.error("Interaction failed:", error);
      setState(prev => ({
        ...prev,
        isTyping: false
      }));
    }
  }, [state.messages, state.mode, state.naughtyMode]);

  const setMode = (mode: AppMode) => setState(prev => ({ ...prev, mode }));
  const setNaughtyMode = (naughtyMode: boolean) => setState(prev => ({ ...prev, naughtyMode }));
  const clearMessages = () => {
    setState(prev => ({ ...prev, messages: [], intimacyLevel: 0 }));
    localStorage.removeItem(STORAGE_KEY);
  };

  // Heartbeat speed calculation
  const heartbeatClass = state.intimacyLevel > 80 ? 'animate-pulse scale-125' : state.intimacyLevel > 50 ? 'animate-pulse' : '';

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Sidebar 
        mode={state.mode} 
        setMode={setMode} 
        intimacyLevel={state.intimacyLevel}
        naughtyMode={state.naughtyMode}
        setNaughtyMode={setNaughtyMode}
        onClear={clearMessages} 
      />
      
      <main className="flex-1 flex flex-col relative">
        {/* Header with Heartbeat Indicator */}
        <div className="flex items-center justify-between p-4 bg-slate-900/40 backdrop-blur-xl border-b border-white/5 z-10">
           <div className="flex items-center gap-4">
             <div className="relative">
               <div className="w-12 h-12 rounded-full border-2 border-pink-500/30 overflow-hidden shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                  <img src={`https://picsum.photos/seed/${state.mode === AppMode.REALISTIC ? 'sophisticated' : 'anime'}/100`} alt="Aura" className="w-full h-full object-cover" />
               </div>
               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-pink-600 border-2 border-slate-900 rounded-full flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-2 w-2 text-white ${heartbeatClass}`} viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                 </svg>
               </div>
             </div>
             <div>
               <h2 className="text-base font-serif font-bold text-pink-400 tracking-wide flex items-center gap-2">
                 Aura
                 {state.naughtyMode && <span className="text-[8px] bg-red-600 text-white px-1 rounded font-black uppercase leading-none py-0.5 shadow-[0_0_5px_rgba(220,38,38,0.5)]">NSFW</span>}
               </h2>
               <div className="flex items-center gap-3">
                 <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{state.mode} Mode</span>
                 <span className="text-[10px] font-black text-pink-500 px-2 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20 shadow-inner">
                   {mood}
                 </span>
               </div>
             </div>
           </div>
           
           <div className="flex gap-3">
             <button 
              onClick={() => setMode(state.mode === AppMode.REALISTIC ? AppMode.ANIME : AppMode.REALISTIC)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800/50 text-pink-400 hover:bg-pink-500 hover:text-white transition-all border border-slate-700/50"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
               </svg>
             </button>
           </div>
        </div>

        <ChatWindow 
          messages={state.messages} 
          isTyping={state.isTyping} 
          mode={state.mode} 
        />
        
        <InputArea 
          onSendMessage={handleSendMessage} 
          disabled={state.isTyping} 
        />
      </main>
    </div>
  );
};

export default App;
