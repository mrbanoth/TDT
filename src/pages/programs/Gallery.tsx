import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, X, Image as ImageIcon, Video as VideoIcon, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type MediaItem = {
  type: 'image' | 'video';
  url: string;
  title: string;
  alt?: string;
};

type Program = {
  id: string;
  title: string;
  color: string;
  media: MediaItem[];
};

const programs: Program[] = [
  {
    id: 'children',
    title: "Children's Programmes",
    color: 'blue',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3', 
        alt: 'Children learning',
        title: 'Children Education Program'
      },
      { 
        type: 'video', 
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', 
        title: 'Children Program Video',
        alt: 'Children Program Video'
      },
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3', 
        alt: 'Children playing',
        title: 'Children Activities'
      },
    ]
  },
  {
    id: 'medical',
    title: 'Health Camps',
    color: 'green',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3', 
        alt: 'Health camp',
        title: 'Medical Camp'
      },
      { 
        type: 'video', 
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', 
        title: 'Health Camp Video',
        alt: 'Health Camp Video'
      },
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3', 
        alt: 'Medical checkup',
        title: 'Health Checkup'
      },
    ]
  },
  {
    id: 'education',
    title: 'Education Programs',
    color: 'purple',
    media: [
      { 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3', 
        alt: 'Education program',
        title: 'School Education'
      },
      { 
        type: 'video', 
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', 
        title: 'Education Program Video',
        alt: 'Education Program Video'
      },
    ]
  }
];

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = (media: MediaItem, program: Program, index: number) => {
    // Create a copy of the original media items
    let items = [...program.media];
    
    // If we have less than 10 items, we'll need to add some
    if (items.length < 10) {
      // First, ensure we have at least 3 videos
      const videoItems = items.filter(item => item.type === 'video');
      const imageItems = items.filter(item => item.type === 'image');
      
      // If we don't have enough videos, duplicate the existing ones or create placeholders
      while (videoItems.length < 3) {
        if (videoItems.length > 0) {
          videoItems.push({...videoItems[0]});
        } else {
          // Fallback: Create a placeholder video if none exist
          videoItems.push({
            type: 'video',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            title: 'Program Video',
            alt: 'Program Video'
          });
        }
      }
      
      // Ensure we have enough images
      while (imageItems.length < 7) {
        if (imageItems.length > 0) {
          imageItems.push({...imageItems[0]});
        } else {
          // Fallback: Create a placeholder image if none exist
          imageItems.push({
            type: 'image',
            url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3',
            title: 'Program Image',
            alt: 'Program Image'
          });
        }
      }
      
      // Combine items with videos in the middle
      const firstHalf = imageItems.slice(0, 3);
      const secondHalf = imageItems.slice(3);
      items = [...firstHalf, ...videoItems.slice(0, 3), ...secondHalf];
      
      // Trim to exactly 10 items
      items = items.slice(0, 10);
    }
    
    // Find the index of the selected media in the new items array
    const selectedIndex = items.findIndex(item => 
      item.type === media.type && 
      item.url === media.url &&
      item.title === media.title
    );
    
    const programWithItems = { ...program, media: items };
    
    setSelectedMedia(selectedIndex >= 0 ? items[selectedIndex] : items[0]);
    setCurrentProgram(programWithItems);
    setCurrentIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (!currentProgram) return;
    
    const totalItems = currentProgram.media.length;
    let newIndex = direction === 'next' 
      ? (currentIndex + 1) % totalItems 
      : (currentIndex - 1 + totalItems) % totalItems;
    
    // Ensure we don't go beyond the original media count
    if (newIndex >= currentProgram.media.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = currentProgram.media.length - 1;
    }
    
    setSelectedMedia(currentProgram.media[newIndex]);
    setCurrentIndex(newIndex);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedMedia(null), 300); // Wait for animation to complete
  };

  // Close lightbox when clicking the overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  // Close with Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        {/* Back Button */}
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <NavLink 
              to="/programmes" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Programmes
            </NavLink>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Programs Gallery</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore the impact of our programs through photos and videos from our activities.
            </p>
          </div>

          {programs.map((program) => (
            <section key={program.id} className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold text-${program.color}-700`}>
                  {program.title}
                </h2>
                <NavLink 
                  to={`/programs/${program.id}`}
                  className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-primary rounded-full text-xs sm:text-sm font-medium text-primary hover:bg-primary/5 transition-all duration-200 whitespace-nowrap"
                >
                  <span className="hidden sm:inline">View</span> Details
                  <ArrowLeft className="ml-0.5 sm:ml-1 h-3 w-3 sm:h-4 sm:w-4 rotate-180" />
                </NavLink>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {program.media.map((item, index) => (
                  <div 
                    key={`${program.id}-${index}`}
                    onClick={() => openLightbox(item, program, index)}
                    className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  >
                    {item.type === 'image' ? (
                      <div className="relative h-64">
                        <img
                          src={item.url}
                          alt={item.alt || item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Maximize2 className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <VideoIcon className="h-16 w-16 text-white/80 z-10" />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                        </div>
                        <img
                          src={`https://img.youtube.com/vi/${item.url.split('/').pop()}/hqdefault.jpg`}
                          alt={item.alt || item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 flex items-center">
                        {item.type === 'image' ? (
                          <>
                            <ImageIcon className="h-4 w-4 mr-1" /> Photo
                          </>
                        ) : (
                          <>
                            <VideoIcon className="h-4 w-4 mr-1" /> Video
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      
      {/* Lightbox Modal */}
      {selectedMedia && currentProgram && (
        <div 
          className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-opacity duration-300 overflow-hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={handleOverlayClick}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          
          {/* Left Navigation Arrow */}
          {currentProgram.media.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateMedia('prev');
              }}
              className="absolute left-4 md:left-8 p-2 text-white hover:text-primary transition-colors z-10"
              aria-label="Previous media"
            >
              <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
            </button>
          )}
          
          <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
            <div className="w-full max-w-5xl mx-auto">
              <div className="relative">
                {selectedMedia.type === 'image' ? (
                  <div className="flex items-center justify-center max-h-[80vh]">
                    <img
                      src={selectedMedia.url}
                      alt={selectedMedia.alt || selectedMedia.title}
                      className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-4xl mx-auto aspect-video">
                    <iframe
                      src={selectedMedia.url}
                      title={selectedMedia.title}
                      className="w-full h-full rounded-lg shadow-2xl"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-medium line-clamp-1">{selectedMedia.title}</h3>
                {currentProgram.media.length > 1 && (
                  <div className="flex justify-center items-center mt-3 space-x-2">
                    {currentProgram.media.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(index);
                          setSelectedMedia(currentProgram.media[index]);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to item ${index + 1} of ${currentProgram.media.length}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Navigation Arrow */}
          {currentProgram.media.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateMedia('next');
              }}
              className="absolute right-4 md:right-8 p-2 text-white hover:text-primary transition-colors z-10"
              aria-label="Next media"
            >
              <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
            </button>
          )}
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;
