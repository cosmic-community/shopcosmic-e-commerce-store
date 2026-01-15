// app/collections/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCollection, getCollections, getProductsByCollection } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollection(slug);
  
  if (!collection) {
    return { title: 'Collection Not Found' };
  }

  return {
    title: `${collection.metadata.name} - ShopCosmic`,
    description: collection.metadata.description || `Shop ${collection.metadata.name} collection`,
  };
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = await getCollection(slug);

  if (!collection) {
    notFound();
  }

  const products = await getProductsByCollection(collection.id);

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
              <Link href="/collections" className="hover:text-primary-600">Collections</Link>
            </li>
            <li>/</li>
            <li className="text-slate-900 font-medium">{collection.metadata.name}</li>
          </ol>
        </nav>

        {/* Collection Header */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          {collection.metadata.cover_image && (
            <img
              src={`${collection.metadata.cover_image.imgix_url}?w=1400&h=400&fit=crop&auto=format,compress`}
              alt={collection.metadata.name}
              className="w-full h-64 lg:h-80 object-cover"
              width={1400}
              height={400}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              {collection.metadata.name}
            </h1>
            {collection.metadata.description && (
              <p className="text-lg text-slate-200 max-w-2xl">
                {collection.metadata.description}
              </p>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <p className="text-slate-600">
            {products.length} product{products.length !== 1 ? 's' : ''} in this collection
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
            <p className="text-slate-600">No products in this collection yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}