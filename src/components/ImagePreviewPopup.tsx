import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
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

        {/* Current image */}
        <div className="relative max-h-[90vh] max-w-4xl">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || 'Gallery image'}
            className="max-h-[90vh] max-w-full rounded-lg object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
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
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ImagePreviewPopup;
