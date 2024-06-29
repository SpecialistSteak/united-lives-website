"use client";

import { useEffect, useState, useCallback } from "react";
import ImageGallery from "@/components/image-gallery";
import { GalleryResponse, Blob } from "@/types/gallery-response";
import { CustomImage } from "@/types/image-gallery";
import LoadingComponent from "@/components/LoadingComponent";
import "@/styles/gallery.css";

export default function GalleryPage() {
  const [images, setImages] = useState<CustomImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchImages = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/gallery?page=${page}`);
        if (!response.ok) throw new Error("Failed to fetch images");

        const data: GalleryResponse = await response.json();

        const newImages: CustomImage[] = data.blobs.map((blob: Blob) => ({
          src: blob.downloadUrl,
          original: blob.downloadUrl,
          layout: "fill",
          objectFit: "contain",
          caption: blob.pathname,
        }));

        setImages((prevImages) =>
          isInitialLoad ? newImages : [...prevImages, ...newImages]
        );
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        if (isInitialLoad) setIsInitialLoad(false);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isInitialLoad]
  );

  useEffect(() => {
    fetchImages(1);
  }, [fetchImages]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      fetchImages(currentPage + 1);
    }
  };

  if (isLoading && images.length === 0) return <LoadingComponent />;

  return (
    <div className="image-gallery-container-div">
      <ImageGallery images={images} />
      {currentPage < totalPages && (
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
