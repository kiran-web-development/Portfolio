import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'm8kn9rzo';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: false, // Set to false for instant updates on publish
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);

// Helper function to build image URLs from Sanity image assets
export function urlFor(source: any) {
  if (!source) return '';
  return builder.image(source).url();
}
