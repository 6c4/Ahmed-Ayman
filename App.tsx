import React, { useState } from "react";
import { Tab } from "./types";

import Navigation from "./components/Navigation";
import SOS from "./components/SOS";
import ServiceFinder from "./components/ServiceFinder";
import Marketplace from "./components/Marketplace";
import PsychSupport from "./components/PsychSupport";
import Stories from "./components/Stories";
import Auth from "./components/Auth";

/* =========================
   Dashboard (Home Screen)
========================= */
const Dashboard: React.FC<{ setTab: (t: Tab) => void }> = ({ setTab }) => {
  return (
    <div className="relative min-h-screen p-6 pb-24 flex items-center justify-center bg-gradient-to-br from-samod-dark via-green-900 to-emerald-800 text-white overflow-hidden">

      {/* خلفيات ناعمة */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-12 right-12 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-10 w-64 h-64 bg-emerald-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full text-center">
        <h1 className="text-5xl font-black mb-2 tracking-tight">
          صمود
        </h1>

        <p className="text-lg text-green-100 mb-12">
          لأننا معًا أقوى 🤍
        </p>

        <div className="grid grid-cols-2 gap-4 w-full">
          
          {/* خدمات */}
          <button
            onClick={() => setTab(Tab.SERVICES)}
            className="group bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:scale-[1.03] hover:shadow-xl active:scale-95 flex flex-col items-center gap-3"
          >
            <span className="text-4xl transition group-hover:scale-110">📍</span>
            <span className="font-bold text-lg">ابحث عن خدمة</span>
          </button>

          {/* استغاثة */}
          <button
            onClick={() => setTab(Tab.SOS)}
            className="group bg-red-500/80 backdrop-blur-xl border border-red-400/50 p-6 rounded-2xl transition-all duration-300 hover:bg-red-600 hover:scale-[1.03] hover:shadow-2xl shadow-red-900/30 active:scale-95 flex flex-col items-center gap-3"
          >
            <span className="text-4xl transition group-hover:scale-110">🚨</span>
            <span className="font-bold text-lg">استغاثة</span>
          </button>

          {/* دعم نفسي */}
          <button
            onClick={() => setTab(Tab.PSYCH)}
            className="group col-span-2 bg-indigo-500/20 backdrop-blur-xl border border-indigo-300/20 p-6 rounded-2xl transition-all duration-300 hover:bg-indigo-500/30 hover:scale-[1.02] hover:shadow-xl active:scale-95 flex flex-col items-center gap-3"
          >
            <span className="text-4xl transition group-hover:scale-110">🤝</span>
            <span className="font-bold text-lg">
              مساحة آمنة (دعم نفسي)
            </span>
          </button>

          {/* السوق */}
          <button
            onClick={() => setTab(Tab.MARKET)}
            className="group col-span-2 bg-emerald-500/20 backdrop-blur-xl border border-emerald-300/20 p-6 rounded-2xl transition-all duration-300 hover:bg-emerald-500/30 hover:scale-[1.02] hover:shadow-xl active:scale-95 flex flex-col items-center gap-3"
          >
            <span className="text-4xl transition group-hover:scale-110">🛍️</span>
            <span className="font-bold text-lg">السوق المحلي</span>
          </button>

        </div>
      </div>
    </div>
  );
};

/* =========================
   App
========================= */
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.HOME);

  const renderContent = () => {
    switch (currentTab) {
      case Tab.HOME:
        return <Dashboard setTab={setCurrentTab} />;
      case Tab.SERVICES:
        return <ServiceFinder />;
      case Tab.MARKET:
        return <Marketplace />;
      case Tab.SOS:
        return <SOS />;
      case Tab.PSYCH:
        return <PsychSupport />;
      case Tab.STORIES:
        return <Stories />;
      default:
        return <Dashboard setTab={setCurrentTab} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 font-sans text-right" dir="rtl">
        <main className="mx-auto max-w-md min-h-screen bg-white shadow-2xl relative">
          <Auth onLogin={() => setIsAuthenticated(true)} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-right" dir="rtl">
      <main className="mx-auto max-w-md min-h-screen bg-white shadow-2xl relative">
        {renderContent()}
        <Navigation currentTab={currentTab} setTab={setCurrentTab} />
      </main>
    </div>
  );
};

export default App;
