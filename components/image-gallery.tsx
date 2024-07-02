"use client";

import { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { CustomImage } from "../types/image-gallery";

export default function ImageGallery({ images, rowHeight }: { images: CustomImage[], rowHeight: number }) {
  const [index, setIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => { 
      // we are checking this because Lightbox css is not working on mobile. I also wasn't able to find a way to make the lightbox responsive.
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index: number, item: CustomImage) => {
    if (!isMobile) {
      setIndex(index);
      setLoading(true);
    }
  };

  const handleClose = () => {
    setIndex(-1);
    setLoading(false);
  };

  const handleMovePrev = () => {
    setIndex(prevIndex);
    setLoading(true);
  };

  const handleMoveNext = () => {
    setIndex(nextIndex);
    setLoading(true);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div>
      <Gallery
        images={images.map(img => ({
          src: img.src,
          width: typeof img.width === 'number' ? img.width : 0, // Ensuring width is a number
          height: typeof img.height === 'number' ? img.height : 0, // Ensuring height is a number
          caption: img.caption
        }))}
        rowHeight={rowHeight}
        margin={4}
        onClick={(index: number) => handleClick(index, images[index])}
        enableImageSelection={false}
      />
      {!!currentImage && (
        <Lightbox
          mainSrc={currentImage.original}
          imageTitle={currentImage.caption}
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.original}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.original}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
          onImageLoad={handleImageLoad}
        />
      )}
    </div>
  );
}
