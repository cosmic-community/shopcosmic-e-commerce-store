import Link from 'next/link';
import type { Product, Collection } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, price, featured_image, in_stock, collection } = product.metadata;
  const collectionData = collection as Collection | undefined;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-slate-100">
        {featured_image ? (
          <img
            src={`${featured_image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={300}
            height={300}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Collection Badge */}
        {collectionData && typeof collectionData === 'object' && (
          <span className="inline-block text-xs font-medium text-primary-600 mb-2">
            {collectionData.metadata.name}
          </span>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {name}
        </h3>

        {/* Price & Stock */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">
            ${price.toFixed(2)}
          </span>
          {in_stock ? (
            <span className="text-xs font-medium text-green-600">In Stock</span>
          ) : (
            <span className="text-xs font-medium text-red-600">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}