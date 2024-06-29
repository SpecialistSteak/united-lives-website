// types/gallery-response.ts

export interface Blob {
  downloadUrl: string;
  pathname: string;
  uploadedAt: string;
}

export interface GalleryResponse {
  blobs: Blob[];
  currentPage: number;
  totalPages: number;
}
