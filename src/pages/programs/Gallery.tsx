import React, { useState, useEffect, useMemo, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X, Image as ImageIcon, MapPin, Video as VideoIcon } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { getGalleryItems, type GalleryItem } from '@/lib/contentful';

// Define the categories based on your Contentful badges
const categories = [
  { id: 'all', name: 'All' },
  { id: 'events', name: 'Events' },
  { id: 'programs', name: 'Programs' },
  { id: 'community', name: 'Community' },
  { id: 'education', name: 'Education' },
  { id: 'others', name: 'Others' },
];

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch gallery items from Contentful
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setIsLoading(true);
        const items = await getGalleryItems();
        setGalleryItems(items);
        setError(null);
      } catch (err) {
        setError(`Failed to load gallery: ${err.message || 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Filter items based on selected category and search query
  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || 
                            (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());
      const matchesSearch = searchQuery === '' || 
                          (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [galleryItems, selectedCategory, searchQuery]);

  // Only duplicate items for 'All'  // Create looped items for seamless animation - only duplicate for 'All' category when not searching
  const loopedItems = useMemo(() => {
    if (selectedCategory === 'all' && !searchQuery) {
      return [...filteredItems, ...filteredItems];
    }
    return filteredItems;
  }, [filteredItems, selectedCategory, searchQuery]);

  // Animation loop
  useEffect(() => {
    if (filteredItems.length === 0) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const scrollWidth = container.scrollWidth / 2; // Because we duplicated items
    let animationFrame: number;
    let startTime: number | null = null;
    const duration = 30000; // 30 seconds for one full loop
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      if (!isHovered && container) {
        container.scrollLeft = progress * scrollWidth;
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [filteredItems.length, isHovered]);
  

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-[#1e293b] to-[#0f172a] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Our <span className="text-[rgb(234,88,12)]">Gallery</span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
              Capturing moments of impact and transformation in our community
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-12 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(234,88,12)] focus:border-transparent text-base transition-colors duration-200"
                  placeholder="Search gallery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button 
                    onClick={() => setSearchQuery('')}
                    className={`p-1 rounded-full ${searchQuery ? 'text-gray-300 hover:text-white' : 'text-transparent'}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[rgb(234,88,12)] text-white'
                        : 'bg-white/10 text-gray-200 hover:bg-white/20'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="gallery-container">
          {/* Bento Grid Gallery */}
          <div className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-[rgb(234,88,12)] text-white rounded-lg hover:bg-[#d97a0a] transition-colors"
              >
                Retry
              </button>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found. Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div 
              ref={containerRef}
              className="relative overflow-hidden w-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex space-x-6 py-4 px-4">
                {loopedItems.map((item, index) => {
                  const isAllCategory = selectedCategory === 'all';
                  
                  // Only calculate animation properties for 'all' category
                  const animationProps = isAllCategory ? {
                    initial: { 
                      opacity: 0, 
                      x: (Math.floor(index / 4) % 2 === 0) ? 50 : -50,
                      scale: 0.95 
                    },
                    animate: { 
                      opacity: 1, 
                      x: 0, 
                      scale: 1,
                      transition: {
                        type: 'spring' as const,
                        stiffness: 100,
                        damping: 15,
                        delay: 0.05 * (index % 4) + 0.1 * Math.floor(index / 4)
                      }
                    },
                    exit: { 
                      opacity: 0, 
                      x: (Math.floor(index / 4) % 2 === 0) ? -50 : 50,
                      scale: 0.9,
                      transition: { 
                        type: 'tween' as const,
                        duration: 0.2 
                      }
                    }
                  } : {
                    initial: { opacity: 1 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 }
                  };
                  
                  return (
                    <motion.div
                      key={`${item.id}-${index}`}
                      className="relative flex-shrink-0 w-80 sm:w-96 h-64 rounded-xl overflow-hidden bg-gray-50 shadow-md"
                      {...animationProps}
                      layout
                    >
                      {item.type === 'image' ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <LazyLoadImage
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            effect="opacity"
                            placeholderSrc={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNSIvPjwvc3ZnPg==`}
                          />
                          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center backdrop-blur-sm">
                            <ImageIcon className="h-3 w-3 mr-1" />
                            <span>Photo</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full">
                          <iframe
                            src={item.url}
                            title={item.title}
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                          />
                          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center backdrop-blur-sm">
                            <VideoIcon className="h-3 w-3 mr-1" />
                            <span>Video</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="font-medium text-white text-sm md:text-base line-clamp-1">
                          {item.title?.trim() || 
                           categories.find(cat => cat.id === selectedCategory)?.name || 
                           item.category || 
                           'Gallery Item'}
                        </h3>
                        <div className="flex flex-col gap-1 mt-1">
                          {item.date && (
                            <div className="text-xs text-white/80">
                              {new Date(item.date).toLocaleDateString()}
                            </div>
                          )}
                          {item.location && (
                            <div className="flex items-center text-xs text-white/80">
                              <MapPin className="h-3 w-3 mr-1" />
                              {item.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-6 py-3 mb-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-[rgb(234,88,12)] hover:bg-[#d97c10] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d97c10] transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2 " />
              Back to Previous Page
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
