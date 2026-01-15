import type { Metadata } from 'next';
import { getCollections } from '@/lib/cosmic';
import CollectionCard from '@/components/CollectionCard';

export const metadata: Metadata = {
  title: 'Collections - ShopCosmic',
  description: 'Browse our product collections',
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Collections</h1>
          <p className="mt-2 text-lg text-slate-600">
            Browse our curated product categories
          </p>
        </div>

        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-600">No collections found.</p>
          </div>
        )}
      </div>
    </div>
  );
}