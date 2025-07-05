import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo, useAnimation } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImagePreviewPopupProps {
  images: Array<{
    url: string;
    alt?: string;
    title?: string;
  }>;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const ImagePreviewPopup = ({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: ImagePreviewPopupProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard and touch navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex]);

  const handleSwipe = (direction: 'left' | 'right') => {
    setIsDragging(false);
    if (direction === 'left') goToNext();
    if (direction === 'right') goToPrev();
  };

  const handleDragStart = (e: any, info: PanInfo) => {
    touchStartX.current = info.point.x;
    setIsDragging(true);
  };

  const handleDrag = (e: any, info: PanInfo) => {
    // Update position while dragging for smooth tracking
    if (isDragging) {
      controls.set({ x: info.offset.x });
    }
  };

  const handleDragEnd = (e: any, info: PanInfo) => {
    touchEndX.current = info.point.x;
    const diff = touchStartX.current - touchEndX.current;
    
    // Lower threshold for better mobile experience
    const SWIPE_THRESHOLD = 30;
    const VELOCITY_THRESHOLD = 200; // px/s
    
    // Check if swipe meets threshold or has enough velocity
    if (Math.abs(diff) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > VELOCITY_THRESHOLD) {
      if (diff > 0 || info.velocity.x > 0) {
        handleSwipe('left');
      } else {
        handleSwipe('right');
      }
    } else {
      // If not enough swipe, animate back to center
      controls.start({ 
        x: 0,
        transition: { 
          type: 'spring',
          stiffness: 500,
          damping: 30
        } 
      });
      setIsDragging(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          aria-label="Close gallery"
        >
          <X size={24} />
        </button>

        {/* Navigation arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
          className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:left-8"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:right-8"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>

        {/* Navigation Arrows - Positioned outside the main container */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white hover:text-primary transition-colors z-[10000] bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white hover:text-primary transition-colors z-[10000] bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
            </button>
          </>
        )}

        {/* Current image */}
        <div className="relative max-h-[90vh] max-w-4xl w-full z-10">
          <motion.div
            className="relative w-full h-full touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'pan-y',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <motion.img
              key={currentIndex}
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || 'Gallery image'}
              className="max-h-[90vh] max-w-full rounded-lg object-contain mx-auto touch-pan-y select-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.2 }
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                type: 'spring',
                damping: 20,
                stiffness: 300
              }}
              draggable={false}
            />
          </motion.div>
          
          {/* Image caption */}
          {images[currentIndex].title && (
            <div className="mt-2 text-center text-white">
              <p className="text-sm font-medium sm:text-base">
                {images[currentIndex].title}
              </p>
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {/* Image counter and dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImagePreviewPopup;
