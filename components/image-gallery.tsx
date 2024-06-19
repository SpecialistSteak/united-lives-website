"use client";

import { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { CustomImage } from "../types/image-gallery";

// EXAMPLE IMAGE
// const images: CustomImage[] = [
  // {
    // src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    // original: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    // width: 320,
    // height: 174,
    // caption: "After Rain (Jeshu John - designerspics.com)",
  // },
// ];

export default function ImageGallery({ images }: { images: CustomImage[] }) {
  const [index, setIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index: number, item: CustomImage) => {
    setIndex(index);
    setLoading(true);
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
        images={images}
        onClick={handleClick}
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
