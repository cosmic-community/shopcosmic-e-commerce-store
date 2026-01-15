# ShopCosmic E-Commerce Store

![ShopCosmic Store](https://imgix.cosmicjs.com/b8d6d720-f248-11f0-95ed-edd347b9d13a-photo-1498049794561-7780e7231661-1768505459790.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive e-commerce storefront built with Next.js 16 and Cosmic CMS. Browse products by collection, read customer reviews, and enjoy a beautiful shopping experience.

## Features

- 🛍️ **Product Catalog** - Browse products with images, descriptions, and pricing
- 🗂️ **Collections** - Products organized into logical categories
- ⭐ **Customer Reviews** - Star ratings with verified purchase badges
- 📱 **Responsive Design** - Beautiful on desktop, tablet, and mobile
- 🚀 **Fast Performance** - Optimized images and server-side rendering
- 🔍 **SEO Ready** - Proper meta tags and semantic structure

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69693f3a9287ad7f3a972915&clone_repository=696941459287ad7f3a97294e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> "Based on the content model I created for 'Design a content model for an e-commerce store with products, collections, and customer reviews', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com/) - Headless CMS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your e-commerce content

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shopcosmic
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Products
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Products by Collection
```typescript
const { objects: products } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.collection': collectionId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews for a Product
```typescript
const { objects: reviews } = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with three Cosmic object types:

### Products
- Name, description (markdown), price, SKU
- Featured image and gallery
- In-stock status
- Collection relationship

### Collections
- Name and description
- Cover image

### Reviews
- Customer name and rating (1-5 stars)
- Comment text
- Product relationship
- Verified purchase flag

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Push your code to GitHub
2. Connect repository in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

## License

MIT

<!-- README_END -->