import React from 'react';
import { Story } from '../types';
import { Clock, Heart } from 'lucide-react';

const MOCK_STORIES: Story[] = [
  {
    id: '1',
    title: 'مطبخ التكية.. حين يصبح الطعام رسالة حب',
    author: 'أم محمد',
    content: 'رغم قلة الإمكانيات، نجتمع كل صباح لنطبخ لأهل الحي. الرائحة تعيد لنا ذكريات الجمعات العائلية قبل الحرب.',
    date: 'منذ يومين',
    image: 'https://picsum.photos/600/400?random=10'
  },
  {
    id: '2',
    title: 'حصص تعليمية تحت الخيمة',
    author: 'الأستاذ خليل',
    content: 'لم ننتظر المدرسة لتعود، جمعت أطفال المخيم وبدأنا نتعلم الحروف والرسم. ضحكاتهم هي الانتصار الحقيقي.',
    date: 'منذ أسبوع',
    image: 'https://picsum.photos/600/400?random=11'
  }
];

const Stories: React.FC = () => {
  return (
    <div className="p-4 pb-24 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-r-4 border-samod-green pr-3">قصص صمود</h2>
      
      <div className="space-y-6">
        {MOCK_STORIES.map(story => (
          <article key={story.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            {story.image && (
              <div className="h-48 overflow-hidden">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <Clock size={12} />
                <span>{story.date}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                <span>{story.author}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 leading-snug">{story.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{story.content}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart size={18} />
                  <span className="text-xs">تضامن</span>
                </button>
                <button className="text-samod-green text-sm font-bold">قراءة المزيد</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Stories;