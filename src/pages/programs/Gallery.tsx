import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X, Image as ImageIcon, Video as VideoIcon, Filter, ChevronDown, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

type MediaItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  category: string;
  date: string;
  location: string;
};

const categories = [
  { id: 'all', name: 'All' },
  { id: 'events', name: 'Events' },
  { id: 'programs', name: 'Programs' },
  { id: 'community', name: 'Community' },
  { id: 'education', name: 'Education' },
];

const mediaItems: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3',
    title: 'Community Gathering',
    category: 'community',
    date: '2023-11-15',
    location: 'Hyderabad'
  },
  {
    id: '2',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1',
    title: 'Education Program',
    category: 'education',
    date: '2023-11-10',
    location: 'Warangal'
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1522071820081-009c01201c72?ixlib=rb-4.0.3',
    title: 'Annual Event',
    category: 'events',
    date: '2023-11-05',
    location: 'Hyderabad'
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1529154691717-385c8bd47d84?ixlib=rb-4.0.3',
    title: 'Workshop Session',
    category: 'programs',
    date: '2023-10-28',
    location: 'Karimnagar'
  },
  {
    id: '5',
    type: 'video',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1',
    title: 'Health Camp',
    category: 'programs',
    date: '2023-10-20',
    location: 'Nizamabad'
  },
  {
    id: '6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a3e?ixlib=rb-4.0.3',
    title: 'Celebration',
    category: 'events',
    date: '2023-10-15',
    location: 'Hyderabad'
  },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const filteredItems = mediaItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found. Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden relative">
                    {item.type === 'image' ? (
                      <>
                        <LazyLoadImage
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          effect="opacity"
                          placeholderSrc={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNSIvPjwvc3ZnPg==`}
                        />
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <ImageIcon className="h-3 w-3 mr-1" />
                          <span>Photo</span>
                        </div>
                      </>
                    ) : (
                      <div className="relative w-full h-full">
                        <iframe
                          src={item.url}
                          title={item.title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <VideoIcon className="h-3 w-3 mr-1" />
                          <span>Video</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Back Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-[rgb(234,88,12)] hover:bg-[#d97c10] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d97c10] transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
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
