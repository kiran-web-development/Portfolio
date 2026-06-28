export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  status: 'published' | 'draft';
  views: number;
  likes: number;
  reviews: Review[];
}
