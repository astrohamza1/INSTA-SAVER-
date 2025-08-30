
export enum MediaType {
  Post = 'Post',
  Reel = 'Reel',
  Story = 'Story',
  Highlights = 'Highlights',
  ProfilePicture = 'Profile Picture',
}

export interface MediaSource {
  quality: string;
  url: string;
}

export interface MediaData {
  type: MediaType;
  title: string;
  author: string;
  thumbnailUrl: string;
  sources: MediaSource[];
}

export interface ApiError {
  error: string;
}

export type ApiResponse = MediaData | ApiError;
