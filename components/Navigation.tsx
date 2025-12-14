import React from 'react';
import { Tab } from '../types';
import { Home, MapPin, ShoppingBag, AlertTriangle, HeartHandshake, BookOpen } from 'lucide-react';

interface NavigationProps {
  currentTab: Tab;
  setTab: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentTab, setTab }) => {
  const navItems = [
    { id: Tab.HOME, label: 'الرئيسية', icon: Home },
    { id: Tab.SERVICES, label: 'الخدمات', icon: MapPin },
    { id: Tab.MARKET, label: 'السوق', icon: ShoppingBag },
    { id: Tab.PSYCH, label: 'نفسي', icon: HeartHandshake },
    { id: Tab.STORIES, label: 'قصص', icon: BookOpen },
    { id: Tab.SOS, label: 'طوارئ', icon: AlertTriangle, urgent: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          if (item.urgent) {
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex flex-col items-center justify-center -mt-6 p-3 rounded-full shadow-lg transition-transform active:scale-95 ${
                  isActive ? 'bg-red-600 ring-4 ring-red-200' : 'bg-samod-red'
                }`}
              >
                <Icon size={28} color="white" />
                <span className="text-xs font-bold text-red-600 mt-1 absolute -bottom-5">SOS</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-samod-green' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;