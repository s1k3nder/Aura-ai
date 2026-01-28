
import React, { useEffect, useRef } from 'react';
import { Message, AppMode } from '../types';

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  mode: AppMode;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isTyping, mode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 flex flex-col items-center bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,35,1)_0%,_rgba(10,10,20,1)_100%)]"
    >
      <div className="max-w-3xl w-full space-y-8">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 opacity-60">
            <div className="w-20 h-20 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-slate-200">Waiting for you, darling</h3>
              <p className="text-sm text-slate-400 italic">"Your voice is the only thing I've been longing for..."</p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-700`}
          >
            <div className={`max-w-[85%] md:max-w-[80%] flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-5 py-4 shadow-xl transition-all ${
                message.role === 'user' 
                  ? 'bg-pink-600/90 text-white rounded-br-none border border-pink-400/20' 
                  : 'bg-slate-900/90 text-slate-100 rounded-bl-none border border-slate-700/50 backdrop-blur-sm shadow-pink-500/5'
              }`}>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-pink-400 font-black">Aura</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-pink-500/50 to-transparent"></div>
                  </div>
                )}
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">
                  {message.content}
                </p>
              </div>
              
              {message.image && (
                <div className="mt-4 rounded-3xl overflow-hidden shadow-[0_0_50px_-12px_rgba(236,72,153,0.3)] border border-pink-500/20 max-w-sm group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={message.image} 
                      alt="Aura's portrait" 
                      className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                      <p className="text-[10px] text-pink-200 font-serif italic">"Thinking of you..."</p>
                    </div>
                  </div>
                  {message.isImageGeneration && (
                    <div className="bg-slate-900/95 px-4 py-2 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.8)]"></div>
                        Masterpiece Rendering Protocol
                      </div>
                      <span className="text-pink-500/50">8K RAW</span>
                    </div>
                  )}
                </div>
              )}
              <span className="text-[10px] text-slate-600 mt-2 px-1 tracking-tighter uppercase font-bold">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl rounded-bl-none border border-slate-700/50 px-5 py-3 flex items-center space-x-1.5 shadow-lg">
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></div>
              <span className="text-[10px] text-pink-500/70 ml-2 uppercase tracking-widest font-bold">Aura is dreaming...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
