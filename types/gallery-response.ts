export interface GalleryResponse {
  blobs: Array<{ downloadUrl: string; pathname: string }>;
  cursor: string;
  hasMore: boolean;
}
