import React, { useState } from 'react';
import { Tab } from './types';
import Navigation from './components/Navigation';
import SOS from './components/SOS';
import ServiceFinder from './components/ServiceFinder';
import Marketplace from './components/Marketplace';
import PsychSupport from './components/PsychSupport';
import Stories from './components/Stories';
import Auth from './components/Auth';

// Simple Home Component (Dashboard)
const Dashboard: React.FC<{ setTab: (t: Tab) => void }> = ({ setTab }) => (
  <div className="p-6 pb-24 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-samod-dark to-green-800 text-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
       <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
       <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
    </div>
    
    <div className="z-10 text-center w-full">
        <h1 className="text-5xl font-extrabold mb-2 tracking-tight">صمود</h1>
        <p className="text-xl text-green-100 mb-10 font-light">لأننا معاً أقوى.</p>

        <div className="grid grid-cols-2 gap-4 w-full">
            <button 
                onClick={() => setTab(Tab.SERVICES)}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all flex flex-col items-center gap-3"
            >
                <span className="text-3xl">📍</span>
                <span className="font-bold">ابحث عن خدمة</span>
            </button>
            <button 
                onClick={() => setTab(Tab.SOS)}
                className="bg-red-500/80 backdrop-blur-md border border-red-400/50 p-6 rounded-2xl hover:bg-red-600/90 transition-all flex flex-col items-center gap-3 shadow-lg shadow-red-900/20"
            >
                <span className="text-3xl">🚨</span>
                <span className="font-bold">استغاثة</span>
            </button>
            <button 
                onClick={() => setTab(Tab.PSYCH)}
                className="bg-indigo-500/20 backdrop-blur-md border border-indigo-300/20 p-6 rounded-2xl hover:bg-indigo-500/30 transition-all flex flex-col items-center gap-3 col-span-2"
            >
                <span className="text-3xl">🤝</span>
                <span className="font-bold">مساحة آمنة (دعم نفسي)</span>
            </button>
             <button 
                onClick={() => setTab(Tab.MARKET)}
                className="bg-emerald-500/20 backdrop-blur-md border border-emerald-300/20 p-6 rounded-2xl hover:bg-emerald-500/30 transition-all flex flex-col items-center gap-3 col-span-2"
            >
                <span className="text-3xl">🛍️</span>
                <span className="font-bold">السوق المحلي</span>
            </button>
        </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.HOME);

  const renderContent = () => {
    switch (currentTab) {
      case Tab.HOME: return <Dashboard setTab={setCurrentTab} />;
      case Tab.SERVICES: return <ServiceFinder />;
      case Tab.MARKET: return <Marketplace />;
      case Tab.SOS: return <SOS />;
      case Tab.PSYCH: return <PsychSupport />;
      case Tab.STORIES: return <Stories />;
      default: return <Dashboard setTab={setCurrentTab} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 font-sans text-right" dir="rtl">
        <main className="mx-auto max-w-md bg-white min-h-screen shadow-2xl relative">
          <Auth onLogin={() => setIsAuthenticated(true)} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-right" dir="rtl">
      <main className="mx-auto max-w-md bg-white min-h-screen shadow-2xl relative">
        {renderContent()}
        <Navigation currentTab={currentTab} setTab={setCurrentTab} />
      </main>
    </div>
  );
};

export default App;