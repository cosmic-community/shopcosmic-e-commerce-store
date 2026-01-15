import type { Metadata } from 'next';
import { getProducts } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'All Products - ShopCosmic',
  description: 'Browse our complete collection of products',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">All Products</h1>
          <p className="mt-2 text-lg text-slate-600">
            Browse our complete collection of {products.length} products
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-600">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}