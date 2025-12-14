import React, { useState } from "react";
import { Mail, Lock, Check, ShieldCheck } from "lucide-react";

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      onLogin();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative overflow-hidden">

      {/* ===== Header / Branding ===== */}
      <div className="relative bg-[#0f172a] text-white p-8 pb-20 rounded-b-[3rem] shadow-2xl overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1623863481232-a5e3f364024c?q=80&w=1200')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/90"></div>

        <div className="relative z-10 text-center mt-6">
          <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-5 backdrop-blur-md border border-white/20">
            <ShieldCheck size={42} className="text-emerald-400" />
          </div>

          <h1 className="text-4xl font-black tracking-wide mb-3">
            صمود
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
            منصة إنسانية رقمية تهدف إلى دعم الأفراد المتضررين وتنظيم الوصول
            إلى الخدمات والمساندة بروح التضامن والكرامة الإنسانية.
          </p>
        </div>
      </div>

      {/* ===== Form Section ===== */}
      <div className="flex-grow px-6 -mt-12 relative z-20 pb-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin
                ? "مرحبًا بعودتك، الرجاء إدخال بياناتك للمتابعة"
                : "أنشئ حسابك وكن جزءًا من شبكة الدعم"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Mail
                  size={18}
                  className="text-gray-400 group-focus-within:text-[#0f172a] transition-colors"
                />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني"
                className="w-full pr-10 pl-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-[#0f172a] focus:ring-1 focus:ring-[#0f172a] transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Lock
                  size={18}
                  className="text-gray-400 group-focus-within:text-[#0f172a] transition-colors"
                />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-full pr-10 pl-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-[#0f172a] focus:ring-1 focus:ring-[#0f172a] transition-all"
              />
            </div>

            {/* Remember */}
            {isLogin && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center text-gray-500 cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center peer-checked:bg-[#0f172a] peer-checked:border-[#0f172a] transition-colors">
                    <Check
                      size={10}
                      className="text-white opacity-0 peer-checked:opacity-100"
                    />
                  </div>
                  <span className="mr-2">تذكرني</span>
                </label>

                <a
                  href="#"
                  className="text-[#0f172a] font-medium hover:underline"
                >
                  نسيت كلمة المرور؟
                </a>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-sm font-bold text-white bg-[#0f172a] hover:bg-[#020617] transition-all shadow-lg"
            >
              {isLogin ? "دخول" : "إنشاء الحساب"}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-500 hover:text-[#0f172a] transition-colors"
            >
              {isLogin ? (
                <>
                  ليس لديك حساب؟
                  <span className="font-bold underline mr-1">
                    إنشاء حساب
                  </span>
                </>
              ) : (
                <>
                  لديك حساب بالفعل؟
                  <span className="font-bold underline mr-1">
                    تسجيل الدخول
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ===== Security Notice (واضح وبارز) ===== */}
        <div className="mt-8 flex justify-center px-4">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-2 rounded-full shadow-sm">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span className="text-xs font-semibold">
              بياناتك محمية ويتم التعامل معها بسرية تامة
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
