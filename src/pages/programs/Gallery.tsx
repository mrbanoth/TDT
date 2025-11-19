import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  alt?: string;
  width: number;
  height: number;
  aspectRatio: number;
  [key: string]: any; // Allow additional properties
}

type Program = {
  id: string;
  title: string;
  color: string;
  media: MediaItem[];
};

// Sample media data with aspect ratios for better layout
const generateMediaItem = (type: 'image' | 'video', url: string, title: string, alt?: string, width = 1, height = 1): MediaItem => ({
  id: Math.random().toString(36).substr(2, 9),
  type,
  url,
  title,
  alt: alt || title,
  width,
  height,
  aspectRatio: width / height,
});

const programs: Program[] = [
  {
    id: 'community',
    title: "Community Gallery",
    color: 'blue',
    media: [
      generateMediaItem('image', 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3', 'Community Gathering', 'People gathering together', 4, 3),
      generateMediaItem('video', 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1', 'Community Activities', 'Community activities video', 16, 9),
      generateMediaItem('image', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3', 'Group Discussion', 'People discussing community matters', 4, 5),
      generateMediaItem('image', 'https://images.unsplash.com/photo-1522071820081-009c01201c72?ixlib=rb-4.0.3', 'Team Meeting', 'Team meeting in progress', 16, 9),
      generateMediaItem('video', 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1', 'Community Event', 'Community event highlights', 4, 3),
      generateMediaItem('image', 'https://images.unsplash.com/photo-1529154691717-385c8bd47d84?ixlib=rb-4.0.3', 'Community Workshop', 'People attending a workshop', 3, 4),
      generateMediaItem('image', 'https://images.unsplash.com/photo-1511632765486-a01980e01a3e?ixlib=rb-4.0.3', 'Community Celebration', 'People celebrating together', 4, 3),
      generateMediaItem('video', 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1', 'Community Project', 'Community project showcase', 16, 9),
    ]
  }
];

const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">Gallery</h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Our community moments and events
              </p>
              <div className="mt-6">
                <NavLink
                  to="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {programs[0].media.map((item) => (
              <div
                key={item.id}
                className="relative break-inside-avoid mb-6 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                style={{
                  aspectRatio: item.aspectRatio < 1 ? '1/1.5' : item.aspectRatio > 1.5 ? '16/9' : '4/3'
                }}
              >
                {item.type === 'image' ? (
                  <div className="w-full h-full">
                    <LazyLoadImage
                      src={item.url}
                      alt={item.alt || `${item.title} - Tribal Development Trust`}
                      className="w-full h-full object-cover"
                      effect="blur"
                      placeholderSrc={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNSIvPjwvc3ZnPg==`}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0">
                      <iframe
                        src={item.type === 'video' && !item.url.includes('?') 
                          ? `${item.url}?autoplay=1&mute=1&loop=1&playlist=${item.url.split('/').pop()}` 
                          : item.url}
                        title={item.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h3 className="font-medium truncate">{item.title}</h3>
                  <p className="text-sm opacity-80 flex items-center mt-1">
                    {item.type === 'image' ? (
                      <>
                        <ImageIcon className="h-3.5 w-3.5 mr-1" /> Photo
                      </>
                    ) : (
                      <>
                        <VideoIcon className="h-3.5 w-3.5 mr-1" /> Video
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg">
              Load More
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
