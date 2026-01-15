'use client';

import { useState } from 'react';
import type { Product } from '@/types';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const { featured_image, gallery, name } = product.metadata;
  const allImages = [
    ...(featured_image ? [featured_image] : []),
    ...(gallery || []),
  ];
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
        <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const selectedImage = allImages[selectedIndex];

  if (!selectedImage) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
        <img
          src={`${selectedImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
          alt={name}
          className="w-full h-full object-cover"
          width={600}
          height={600}
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                index === selectedIndex
                  ? 'border-primary-600'
                  : 'border-transparent hover:border-slate-300'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={`${name} - Image ${index + 1}`}
                className="w-full h-full object-cover"
                width={80}
                height={80}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}