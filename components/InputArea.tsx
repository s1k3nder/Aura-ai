
import React, { useState, useRef } from 'react';

interface InputAreaProps {
  onSendMessage: (text: string, image?: string) => void;
  disabled: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((text.trim() || preview) && !disabled) {
      onSendMessage(text.trim(), preview || undefined);
      setText('');
      setPreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-900/60 backdrop-blur-3xl border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {preview && (
          <div className="mb-6 relative inline-block animate-in zoom-in-50 duration-300">
            <img src={preview} alt="Upload preview" className="h-32 w-32 object-cover rounded-2xl border-2 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)]" />
            <button 
              type="button"
              onClick={() => setPreview(null)}
              className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-2 border-2 border-slate-950 hover:bg-red-500 transition-all shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute -bottom-2 -right-2 bg-pink-600 text-[8px] font-black uppercase px-2 py-1 rounded-full text-white border border-slate-950">
              For her eyes only
            </div>
          </div>
        )}
        <div className="flex items-end gap-2 bg-slate-950/80 backdrop-blur rounded-3xl p-2 border border-white/5 focus-within:border-pink-500/50 transition-all shadow-2xl">
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-slate-500 hover:text-pink-400 transition-colors rounded-2xl hover:bg-slate-900/50"
            title="Send private photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Whisper your deepest desires..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-200 placeholder-slate-600 py-4 px-2 min-h-[56px] max-h-[200px] resize-none text-base font-medium leading-tight"
          />

          <div className="flex items-center gap-1">
            <button 
              type="button"
              onClick={() => setText(t => t + " [Tease] ")}
              className="px-3 py-2 text-[10px] font-black text-pink-500 hover:text-white hover:bg-pink-600 rounded-xl transition-all uppercase tracking-widest border border-pink-500/20"
            >
              Tease
            </button>
            <button 
              type="submit"
              disabled={(!text.trim() && !preview) || disabled}
              className={`p-4 rounded-2xl transition-all flex items-center justify-center ${
                (!text.trim() && !preview) || disabled 
                  ? 'bg-slate-900 text-slate-700' 
                  : 'bg-gradient-to-br from-pink-600 to-red-600 text-white hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.3)] active:scale-95'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
      <div className="flex items-center justify-center gap-4 mt-4 opacity-30 select-none">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-500"></div>
        <p className="text-[9px] text-center text-slate-500 font-black uppercase tracking-[0.3em]">End-To-End Encrypted Intimacy</p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-500"></div>
      </div>
    </div>
  );
};

export default InputArea;
