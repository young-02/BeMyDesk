declare interface ThemeProp {
  theme: string;
}

declare interface PostType {
  id: string;
  createdAt: object;
  userId: string;
  jobCategory: String;
  postTitle: string;
  postText: string;
  postImage1: string;
  postImage2: string;
  likes: string[];
  likesCount: number;
}

declare interface GetPostType {
  id: string;
}
