// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at?: string;
  modified_at?: string;
}

// Image file type
export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Collection type
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    name: string;
    description?: string;
    cover_image?: CosmicFile;
  };
}

// Product type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name: string;
    description?: string;
    price: number;
    sku?: string;
    featured_image?: CosmicFile;
    gallery?: CosmicFile[];
    in_stock?: boolean;
    collection?: Collection | string;
  };
}

// Rating type for select-dropdown
export interface Rating {
  key: string;
  value: string;
}

// Review type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    customer_name: string;
    rating: Rating;
    comment?: string;
    product?: Product | string;
    verified_purchase?: boolean;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guard helper
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}