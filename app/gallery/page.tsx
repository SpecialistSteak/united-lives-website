"use client";

import ImageGallery from "../../components/image-gallery";
import { CustomImage } from "../../types/image-gallery";
import { useEffect, useState } from "react";

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

  // Define fetchImages outside of useEffect
  const fetchImages = async () => {
    if (!isLoading) {
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
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <ImageGallery images={allImages} />
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={fetchImages}
            disabled={isLoading}
            style={{
              backgroundColor: "#4180cb",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: isLoading ? "default" : "pointer",
            }}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
