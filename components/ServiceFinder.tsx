import React, { useState } from 'react';
import { Search, MapPin, Fuel, Wifi, Stethoscope, Tent, Loader2, ExternalLink } from 'lucide-react';
import { findNearbyServices } from '../services/gemini';
import { GroundingChunk, Service } from '../types';

// Mock static data for fallback/demonstration
const STATIC_SERVICES: Service[] = [
  { id: '1', name: 'مستشفى الشفاء - نقطة طبية', category: 'medical', status: 'limited', location: 'غرب غزة', lastUpdated: 'منذ ساعة' },
  { id: '2', name: 'نقطة توزيع مياه - الصبرة', category: 'water', status: 'available', location: 'حي الصبرة', lastUpdated: 'منذ 3 ساعات' },
  { id: '3', name: 'مركز إيواء الأونروا', category: 'shelter', status: 'closed', location: 'خانيونس', lastUpdated: 'منذ يوم' },
];

const ServiceFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [geminiResult, setGeminiResult] = useState<{ text: string; chunks: GroundingChunk[] } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'medical', label: 'طبي', icon: Stethoscope, color: 'text-red-500 bg-red-50' },
    { id: 'water', label: 'مياه', icon: Tent, color: 'text-blue-500 bg-blue-50' }, // Using Tent as generic icon
    { id: 'fuel', label: 'وقود', icon: Fuel, color: 'text-yellow-600 bg-yellow-50' },
    { id: 'internet', label: 'نت', icon: Wifi, color: 'text-indigo-500 bg-indigo-50' },
  ];

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setGeminiResult(null);

    try {
      // Get location if possible for better results
      let coords: GeolocationCoordinates | undefined;
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        coords = pos.coords;
      } catch (err) {
        console.warn("Location access denied or timeout");
      }

      const result = await findNearbyServices(query, coords);
      setGeminiResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStatic = activeCategory === 'all' 
    ? STATIC_SERVICES 
    : STATIC_SERVICES.filter(s => s.category === activeCategory);

  return (
    <div className="p-4 pb-24 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">خريطة الخدمات</h2>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن مستشفى، صيدلية، نقطة شحن..."
          className="w-full p-4 ps-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-samod-green outline-none"
        />
        <Search className="absolute right-4 top-4 text-gray-400" size={20} />
        <button 
            type="submit"
            disabled={isLoading || !query}
            className="absolute left-2 top-2 bottom-2 bg-samod-green text-white px-4 rounded-lg text-sm font-bold disabled:opacity-50"
        >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'بحث ذكي'}
        </button>
      </form>

      {/* Quick Categories */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar mb-6">
        <button 
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border'}`}
        >
            الكل
        </button>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium border transition-colors ${
                isActive ? 'bg-samod-green text-white border-samod-green' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              <Icon size={16} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gemini Results Area */}
      {geminiResult && (
        <div className="mb-8 bg-white p-5 rounded-xl shadow border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <Search size={18} />
            نتائج البحث الذكي
          </h3>
          <div className="prose prose-sm text-gray-700 leading-relaxed whitespace-pre-line mb-4">
            {geminiResult.text}
          </div>
          
          {geminiResult.chunks && geminiResult.chunks.length > 0 && (
            <div className="grid gap-2">
              <h4 className="text-xs font-bold text-gray-500 mt-2">المواقع المقترحة:</h4>
              {geminiResult.chunks.map((chunk, idx) => {
                 const mapUri = chunk.maps?.uri;
                 const webUri = chunk.web?.uri;
                 const title = chunk.maps?.title || chunk.web?.title || 'موقع غير معروف';
                 
                 if (!mapUri && !webUri) return null;

                 return (
                   <a 
                     key={idx}
                     href={mapUri || webUri}
                     target="_blank" 
                     rel="noreferrer"
                     className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                   >
                     <span className="font-medium text-indigo-700 truncate">{title}</span>
                     <ExternalLink size={16} className="text-indigo-500 flex-shrink-0" />
                   </a>
                 )
              })}
            </div>
          )}
        </div>
      )}

      {/* Static List */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-700 mb-2">الخدمات الموثقة محلياً</h3>
        {filteredStatic.map((service) => (
          <div key={service.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className={`p-3 rounded-full shrink-0 ${
              service.status === 'available' ? 'bg-green-100 text-green-600' :
              service.status === 'limited' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
            }`}>
              <MapPin size={24} />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-900">{service.name}</h4>
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                  service.status === 'available' ? 'bg-green-100 text-green-700' :
                  service.status === 'limited' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>
                  {service.status === 'available' ? 'متاح' : service.status === 'limited' ? 'محدود' : 'مغلق'}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-1">{service.location}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                <span>تحديث: {service.lastUpdated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceFinder;