import React, { useState, useEffect } from 'react';
import { Phone, Siren, MapPin, Send } from 'lucide-react';

const SOS: React.FC = () => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    // Get location immediately when opening SOS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation(pos.coords),
        (err) => console.error("Location error", err)
      );
    }
  }, []);

  const handleSOSClick = () => {
    setIsFlashing(true);
    setStatus('جارٍ إرسال نداء استغاثة...');
    
    // Simulate sending signal
    setTimeout(() => {
      setStatus('تم إرسال الإشارة إلى فرق الدفاع المدني والهلال الأحمر في منطقتك.');
      setIsFlashing(false);
    }, 3000);
  };

  const emergencyContacts = [
    { name: 'الهلال الأحمر', number: '101' },
    { name: 'الدفاع المدني', number: '102' },
    { name: 'الشرطة', number: '100' },
  ];

  return (
    <div className="p-4 flex flex-col h-full bg-red-50 min-h-screen pb-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-700 mb-2">نداء استغاثة</h1>
        <p className="text-red-600">استخدم هذا الزر فقط في حالات الخطر الشديد</p>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center mb-8">
        <button
          onClick={handleSOSClick}
          className={`w-64 h-64 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-200 active:scale-95 border-8 ${
            isFlashing 
              ? 'bg-red-600 border-red-400 animate-pulse' 
              : 'bg-red-600 border-red-200'
          }`}
        >
          <Siren size={80} className="text-white mb-4" />
          <span className="text-3xl font-bold text-white">SOS</span>
          <span className="text-white/80 text-sm mt-2">اضغط للمساعدة</span>
        </button>
        
        {status && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md border-r-4 border-green-500 w-full text-center animate-bounce">
            <p className="font-bold text-gray-800">{status}</p>
            {location && <p className="text-xs text-gray-500 mt-1">تم تحديد موقعك بدقة</p>}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Phone size={20} className="text-red-600" />
          أرقام الطوارئ المباشرة
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {emergencyContacts.map((contact) => (
            <a
              key={contact.number}
              href={`tel:${contact.number}`}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-red-50 border border-gray-100 transition-colors"
            >
              <span className="font-bold text-gray-800">{contact.name}</span>
              <span className="text-xl font-black text-red-600 font-mono">{contact.number}</span>
            </a>
          ))}
        </div>
      </div>
      
      {location && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded flex items-center gap-2">
          <MapPin size={16} />
          إحداثياتك الحالية: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </div>
      )}
    </div>
  );
};

export default SOS;