import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { X } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: string | number;
}

const RecentlyViewed: React.FC = () => {
  const [recentItems, setRecentItems] = useState<Product[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('recentItems');
    if (data) {
      setRecentItems(JSON.parse(data));
    }
  }, []);

  const removeItem = (id: number) => {
    const updated = recentItems.filter((item) => item.id !== id);
    setRecentItems(updated);
    localStorage.setItem('recentItems', JSON.stringify(updated));
  };

  if (recentItems.length === 0) return null;

  return (
    <div className="py-12 px-4 md:px-16 transition-colors duration-300">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Recently Viewed
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-thin pb-2">
        {recentItems.map((item) => (
          <div key={item.id} className="relative min-w-[220px]">
            <div className="relative">
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-3 right-3 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 shadow-md z-20"
                title="Remove"
              >
                <X className="w-4 h-4" />
              </button>

              <ProductCard
                product={{
                  ...item,
                  price:
                    typeof item.price === 'string'
                      ? parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
                      : item.price,
                  rating: 4,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
