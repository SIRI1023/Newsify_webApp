import { memo } from 'react';
import { Newspaper } from 'lucide-react';

interface ImageSectionProps {
  imageUrl: string | null;
  title: string;
}

export const ImageSection = memo(function ImageSection({ imageUrl, title }: ImageSectionProps) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform duration-300">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Newspaper className="w-12 h-12 text-gray-400" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
});