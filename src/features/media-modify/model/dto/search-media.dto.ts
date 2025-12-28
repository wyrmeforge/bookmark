import type { Media } from "@/entities/media";

export type SearchMediaItem = Pick<Media, "id" | "title" | "coverImage">;

export interface SearchMediaResponse {
  Page: {
    media: SearchMediaItem[];
  };
}
