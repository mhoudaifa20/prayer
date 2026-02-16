import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AiAssistantScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
        id: '1',
        role: 'model',
        text: 'Assalamu Alaikum! I am your Islamic Assistant. I can help explain Quran verses, Hadith, or suggest Duas. How can I assist you today?',
        timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        text: input,
        timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToGemini(input);

    const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[50%] bg-emerald-500/5 blur-3xl rounded-full"></div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-600'
                        }`}>
                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                            ? 'bg-emerald-600 text-white rounded-tr-none' 
                            : 'glass-card text-slate-700 dark:text-gray-200 rounded-tl-none border-gray-100 dark:border-white/10'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                </div>
            ))}
            {loading && (
                <div className="flex justify-start">
                    <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                             <Sparkles size={16} />
                        </div>
                        <div className="glass-card p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                             <Loader2 size={16} className="animate-spin text-emerald-600" />
                             <span className="text-xs text-gray-500">Consulting knowledge base...</span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-20 left-0 w-full px-4 z-20">
            <div className="glass-card p-2 rounded-full flex items-center shadow-lg shadow-emerald-900/10 border border-white/20">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about a verse, hadith, or ruling..."
                    className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-slate-800 dark:text-white placeholder-gray-400"
                    disabled={loading}
                />
                <button 
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="p-3 bg-emerald-600 rounded-full text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default AiAssistantScreen;
