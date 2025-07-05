import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import ImagePreviewPopup from './ImagePreviewPopup';

interface GalleryPreviewButtonProps {
  images: Array<{
    url: string;
    alt?: string;
    title?: string;
  }>;
  buttonText?: string;
  className?: string;
}

export const GalleryPreviewButton = ({
  images,
  buttonText = 'View Gallery',
  className = '',
}: GalleryPreviewButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 ${className}`}
      >
        <ImageIcon size={16} />
        {buttonText}
      </button>

      <ImagePreviewPopup
        images={images}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default GalleryPreviewButton;
