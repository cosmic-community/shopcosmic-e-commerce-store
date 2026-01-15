import Link from 'next/link';
import { getFeaturedProducts, getCollections, getReviews } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CollectionCard from '@/components/CollectionCard';
import ReviewCard from '@/components/ReviewCard';

export default async function HomePage() {
  const [products, collections, reviews] = await Promise.all([
    getFeaturedProducts(),
    getCollections(),
    getReviews(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://imgix.cosmicjs.com/b8d6d720-f248-11f0-95ed-edd347b9d13a-photo-1498049794561-7780e7231661-1768505459790.jpg?w=1920&h=800&fit=crop&auto=format,compress&q=60')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Discover Quality Products
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8">
              Shop our curated collection of premium products. From cutting-edge electronics to everyday essentials, find exactly what you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">
                Shop All Products
              </Link>
              <Link href="/collections" className="btn-secondary">
                Browse Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {collections.length > 0 && (
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Shop by Collection</h2>
                <p className="mt-2 text-slate-600">Browse our curated product categories</p>
              </div>
              <Link href="/collections" className="text-primary-600 hover:text-primary-700 font-medium">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {products.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Featured Products</h2>
                <p className="mt-2 text-slate-600">Our most popular items in stock</p>
              </div>
              <Link href="/products" className="text-primary-600 hover:text-primary-700 font-medium">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">What Our Customers Say</h2>
              <p className="mt-2 text-slate-600">Real reviews from verified purchasers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}