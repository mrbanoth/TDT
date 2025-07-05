import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
}

export const MetaTags = ({ 
  title = 'Tribal Development Trust',
  description = 'Empowering tribal communities through sustainable development programs and initiatives',
  image = '/tdtlogo.jpg'
}: MetaTagsProps) => {
  const { pathname } = useLocation();
  const siteUrl = 'https://tribaldevelopmenttrust.org';
  const fullUrl = `${siteUrl}${pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Add meta tags
    const metaTags = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: fullUrl },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    // Add or update meta tags
    metaTags.forEach(tag => {
      let element = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (tag.name) element.setAttribute('name', tag.name);
        if (tag.property) element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      
      if (tag.content) element.setAttribute('content', tag.content);
    });

    // Cleanup function
    return () => {
      // Don't remove default meta tags to prevent layout shifts
    };
  }, [title, description, image, fullUrl]);

  return null;
};

export default MetaTags;
