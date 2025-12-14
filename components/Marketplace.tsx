import React from 'react';
import { Product } from '../types';
import { Phone, Tag } from 'lucide-react';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'خبز صاج طازج (ربطة)',
    price: 15,
    seller: 'أبو أحمد - مخبز البركة',
    category: 'food',
    image: 'https://picsum.photos/400/300?random=1',
    contact: '0599000000'
  },
  {
    id: '2',
    name: 'شاحن طاقة شمسية محمول',
    price: 150,
    seller: 'محلات التقنية',
    category: 'electronics',
    image: 'https://picsum.photos/400/300?random=2',
    contact: '0599111111'
  },
  {
    id: '3',
    name: 'معلبات خضار مشكلة',
    price: 8,
    seller: 'سوبرماركت المدينة',
    category: 'food',
    image: 'https://picsum.photos/400/300?random=3',
    contact: '0599222222'
  },
  {
    id: '4',
    name: 'حطب للتدفئة (كيس)',
    price: 50,
    seller: 'أبو خليل',
    category: 'general',
    image: 'https://picsum.photos/400/300?random=4',
    contact: '0599333333'
  }
];

const Marketplace: React.FC = () => {
  return (
    <div className="p-4 pb-24 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">سوق صمود</h2>
          <p className="text-gray-500 text-sm">ادعم الاقتصاد المحلي</p>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold">
          + أضف إعلانك
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {MOCK_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="h-32 bg-gray-200 relative">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
               <span className="absolute top-2 right-2 bg-white/90 text-xs px-2 py-1 rounded-md font-medium text-gray-700">
                 {product.category === 'food' ? 'طعام' : 'أخرى'}
               </span>
            </div>
            <div className="p-3 flex-grow flex flex-col">
              <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{product.seller}</p>
              
              <div className="mt-auto flex items-center justify-between">
                <span className="text-samod-green font-bold text-lg">{product.price} ₪</span>
                <a href={`tel:${product.contact}`} className="bg-indigo-50 p-2 rounded-full text-indigo-600 hover:bg-indigo-100">
                  <Phone size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;