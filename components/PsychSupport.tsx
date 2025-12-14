import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendPsychMessage } from '../services/gemini';
import { Send, User, Sparkles, Loader2 } from 'lucide-react';

const PsychSupport: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'أهلاً بك. أنا "أنيس"، موجود هنا لأسمعك وأدعمك. كيف تشعر اليوم؟',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendPsychMessage(messages, userMsg.text);
      
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      <div className="bg-white p-4 shadow-sm z-10">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Sparkles className="text-indigo-500" />
          المساحة الآمنة (أنيس)
        </h2>
        <p className="text-xs text-gray-500 mt-1">محادثة سرية وآمنة للدعم النفسي</p>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-indigo-100'}`}>
                {msg.role === 'user' ? <User size={16} className="text-gray-600" /> : <Sparkles size={16} className="text-indigo-600" />}
              </div>
              <div
                className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-white text-gray-800 rounded-tr-none shadow-sm border border-gray-100'
                    : 'bg-indigo-600 text-white rounded-tl-none shadow-md'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
            <div className="flex gap-2 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Sparkles size={16} className="text-indigo-600" />
                </div>
                <div className="bg-indigo-50 px-4 py-2 rounded-2xl rounded-tl-none">
                    <Loader2 size={16} className="animate-spin text-indigo-400" />
                </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="اكتب ما تشعر به هنا..."
            className="flex-grow p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            <Send size={20} className={isLoading ? 'opacity-0' : 'opacity-100'} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PsychSupport;