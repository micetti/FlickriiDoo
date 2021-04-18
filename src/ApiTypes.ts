export interface ImageSearchPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface ImageSearchInfo {
  page: number;
  pages: number;
  perpage: number;
  total: number;
}

export interface ImageSearchPhotos {
  photo: ImageSearchPhoto[];
}

export interface ImageSearchData {
  photos: ImageSearchPhotos & ImageSearchInfo;
  stat: string;
}
