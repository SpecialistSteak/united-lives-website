// app/gallery/page.tsx

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import ImageGallery from "@/components/image-gallery";
import { GalleryResponse } from "@/types/gallery-response";
import { CustomImage } from "@/types/image-gallery";
import "@/styles/gallery.css";


const ITEMS_PER_PAGE = 10;

export default function GalleryPage() {
  const [images, setImages] = useState<CustomImage[]>([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const initialLoadComplete = useRef(false);

  const fetchImages = useCallback(async (isInitialLoad: boolean) => {
    if (isLoading || (!hasMore && !isInitialLoad)) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/gallery?limit=${ITEMS_PER_PAGE}&cursor=${cursor ?? ''}`);
      if (!response.ok) throw new Error('Failed to fetch images');

      const data: GalleryResponse = await response.json();
      
      setImages(prevImages => [
        ...prevImages,
        ...data.blobs.map(blob => ({
          src: blob.downloadUrl,
          original: blob.downloadUrl,
          layout: "fill",
          objectFit: "contain",
          caption: blob.pathname,
        }))
      ]);
      setCursor(data.cursor);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, isLoading, hasMore]);

  useEffect(() => {
    if (!initialLoadComplete.current) {
      fetchImages(true);
      initialLoadComplete.current = true;
    }
  }, [fetchImages]);

  const handleLoadMore = () => {
    fetchImages(false);
  };

  return (
    <div className="image-gallery-container-div">
      <ImageGallery images={images} />
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="load-more-button"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}