"use client";

import ImageGallery from "../../components/image-gallery";
import { CustomImage } from "../../types/image-gallery";
import { useEffect, useState } from "react";
import "../../styles/gallery.css";

async function getNextImages(limit: number, cursor?: string) {
  const response = await fetch(
    `/api/gallery?limit=${limit}&cursor=${cursor ?? ""}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  return data;
}

async function checkHasMore(cursor?: string) {
  // Rename function
  const response = await fetch(`/api/gallery/hasMore?cursor=${cursor ?? ""}`, {
    method: "GET",
  });
  const data = await response.json();
  return data.hasMore;
}

const GalleryPage = ({
  response,
}: {
  response: { blobs: { downloadUrl: string; pathname: string }[] };
}) => {
  const images: CustomImage[] = response.blobs.map(
    (blob: { downloadUrl: string; pathname: string }) => ({
      src: blob.downloadUrl,
      original: blob.downloadUrl,
      layout: "fill",
      objectFit: "contain",
      caption: blob.pathname,
    })
  );

  return <ImageGallery images={images} />;
};

export default function Page() {
  const [cursor, setCursor] = useState("");
  const [allImages, setAllImages] = useState<CustomImage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  let firstPrint = true;

  // Define fetchImages outside of useEffect
  const fetchImages = async () => {
    if (!isLoading && hasMore) {
      setIsLoading(true);
      let response = await getNextImages(10, cursor);
      if (response.blobs.length > 0) {
        const images: CustomImage[] = response.blobs.map(
          (blob: { downloadUrl: string; pathname: string }) => ({
            src: blob.downloadUrl,
            original: blob.downloadUrl,
            layout: "fill",
            objectFit: "contain",
            caption: blob.pathname,
          })
        );
        setAllImages((prevImages) => [...prevImages, ...images]);
        setCursor(response.cursor);
        const moreAvailable = await checkHasMore(response.cursor);
        setHasMore(moreAvailable);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (firstPrint) {
      firstPrint = false;
      fetchImages();
    }
  }, []);

  return (
    <div className="image-gallery-container-div">
      <ImageGallery images={allImages} />
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={fetchImages}
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
