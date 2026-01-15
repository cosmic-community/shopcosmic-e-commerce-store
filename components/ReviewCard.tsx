import Link from 'next/link';
import type { Review, Product } from '@/types';
import StarRating from './StarRating';

interface ReviewCardProps {
  review: Review;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const { customer_name, rating, comment, product, verified_purchase } = review.metadata;
  const productData = product as Product | undefined;
  const ratingValue = parseInt(rating.key, 10);

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      {/* Rating */}
      <div className="flex items-center gap-3 mb-4">
        <StarRating rating={ratingValue} />
        <span className="text-sm text-slate-600">{rating.value}</span>
      </div>

      {/* Review Title */}
      <h3 className="font-semibold text-slate-900 mb-2">{review.title}</h3>

      {/* Comment */}
      {comment && (
        <p className="text-slate-600 mb-4 line-clamp-4">{comment}</p>
      )}

      {/* Customer Info */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-900">{customer_name}</span>
          {verified_purchase && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Product Link */}
      {showProduct && productData && typeof productData === 'object' && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <Link
            href={`/products/${productData.slug}`}
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {productData.metadata.featured_image && (
              <img
                src={`${productData.metadata.featured_image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={productData.metadata.name}
                className="w-10 h-10 rounded object-cover"
                width={40}
                height={40}
              />
            )}
            <span>{productData.metadata.name}</span>
          </Link>
        </div>
      )}
    </div>
  );
}