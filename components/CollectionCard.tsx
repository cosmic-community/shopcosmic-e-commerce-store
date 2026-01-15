import Link from 'next/link';
import type { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { name, description, cover_image } = collection.metadata;

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative rounded-2xl overflow-hidden h-64 lg:h-80"
    >
      {/* Background Image */}
      {cover_image ? (
        <img
          src={`${cover_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={800}
          height={600}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-200 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-slate-200 line-clamp-2">
            {description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-2 text-white font-medium">
          <span>Shop Collection</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}