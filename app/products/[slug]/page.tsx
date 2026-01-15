// app/products/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProduct, getProducts, getReviewsByProduct } from '@/lib/cosmic';
import type { Product, Collection } from '@/types';
import StarRating from '@/components/StarRating';
import ProductGallery from '@/components/ProductGallery';
import ReviewCard from '@/components/ReviewCard';
import ReactMarkdown from 'react-markdown';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.metadata.name} - ShopCosmic`,
    description: product.metadata.description?.slice(0, 160) || `Shop ${product.metadata.name}`,
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProduct(product.id);
  const collection = product.metadata.collection as Collection | undefined;
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + parseInt(r.metadata.rating.key, 10), 0) / reviews.length
    : 0;

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-slate-600">
            <li>
              <Link href="/" className="hover:text-primary-600">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-primary-600">Products</Link>
            </li>
            {collection && typeof collection === 'object' && (
              <>
                <li>/</li>
                <li>
                  <Link href={`/collections/${collection.slug}`} className="hover:text-primary-600">
                    {collection.metadata.name}
                  </Link>
                </li>
              </>
            )}
            <li>/</li>
            <li className="text-slate-900 font-medium">{product.metadata.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <ProductGallery product={product} />

          {/* Product Info */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              {product.metadata.name}
            </h1>

            {/* Rating Summary */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={Math.round(averageRating)} />
                <span className="text-slate-600">
                  {averageRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-slate-900">
                ${product.metadata.price.toFixed(2)}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.metadata.in_stock ? (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* SKU */}
            {product.metadata.sku && (
              <p className="text-sm text-slate-500 mb-6">
                SKU: {product.metadata.sku}
              </p>
            )}

            {/* Description */}
            {product.metadata.description && (
              <div className="prose prose-slate max-w-none mb-8">
                <ReactMarkdown>{product.metadata.description}</ReactMarkdown>
              </div>
            )}

            {/* Collection Link */}
            {collection && typeof collection === 'object' && (
              <div className="pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-2">Collection:</p>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  {collection.metadata.name}
                  <span>→</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="mt-16 pt-16 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Customer Reviews ({reviews.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct={false} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}