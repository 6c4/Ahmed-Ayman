import React, { useState } from 'react';
import { Mail, Lock, Check, ShieldCheck } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth delay
    setTimeout(() => {
        onLogin();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative overflow-hidden">
      {/* Top Branding Section (The Dark Side of the provided image) */}
      <div className="bg-[#1e293b] text-white p-8 pb-16 rounded-b-[3rem] relative shadow-2xl">
        {/* Background Overlay Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1623863481232-a5e3f364024c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/90"></div>

        <div className="relative z-10 text-center mt-6">
          <div className="inline-block p-3 bg-white/10 rounded-full mb-4 backdrop-blur-sm border border-white/20">
             <ShieldCheck size={40} className="text-samod-green" />
          </div>
          <h1 className="text-4xl font-extrabold mb-3 tracking-wide">صمود</h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xs mx-auto font-light opacity-90">
            منصة إنسانية مستقلة تُعنى بتنظيم وتقديم الدعم للمتضررين من النزاعات، وفق مبادئ الكرامة والحياد والمسؤولية الإنسانية.
          </p>
        </div>
      </div>

      {/* Form Section (The White Side of the provided image) */}
      <div className="flex-grow px-6 -mt-10 relative z-20 pb-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
            </h2>
            <p className="text-gray-400 text-xs">
              {isLogin ? 'الوصول الآمن إلى نظام منصة صمود' : 'انضم إلينا للمساعدة والدعم'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400 group-focus-within:text-[#1e293b] transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pr-10 pl-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-[#1e293b] focus:ring-1 focus:ring-[#1e293b] transition-all"
                placeholder="البريد الإلكتروني"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400 group-focus-within:text-[#1e293b] transition-colors" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pr-10 pl-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-[#1e293b] focus:ring-1 focus:ring-[#1e293b] transition-all"
                placeholder="كلمة المرور"
              />
            </div>

            {/* Remember & Forgot */}
            {isLogin && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center text-gray-500 cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center peer-checked:bg-[#1e293b] peer-checked:border-[#1e293b] transition-colors">
                    <Check size={10} className="text-white opacity-0 peer-checked:opacity-100" />
                  </div>
                  <span className="mr-2">تذكرني</span>
                </label>
                <a href="#" className="text-[#1e293b] font-medium hover:underline">نسيت كلمة المرور؟</a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#1e293b] hover:bg-[#0f172a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e293b] transition-colors"
            >
              {isLogin ? 'دخول' : 'تسجيل'}
            </button>
          </form>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-xs text-gray-500 hover:text-[#1e293b] transition-colors"
            >
              {isLogin ? (
                <span>ليس لديك حساب؟ <span className="font-bold underline">إنشاء حساب جديد</span></span>
              ) : (
                 <span>لديك حساب بالفعل؟ <span className="font-bold underline">تسجيل الدخول</span></span>
              )}
            </button>
          </div>
        </div>

        {/* Footer Privacy */}
        <div className="mt-8 text-center px-4">
            <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck size={12} />
                يتم تأمين جميع البيانات وفق سياسات الخصوصية والمعايير الدولية
            </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;