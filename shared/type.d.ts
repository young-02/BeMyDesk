declare interface ThemeProp {
  theme: string;
}

declare interface PostType {
  id?: string;
  createdAt?: object;
  userId?: string;
  jobCategory?: string[];
  postTitle?: string;
  postText?: string;
  postImage1?: string;
  postImage2?: string;
  likes?: string[];
  likesCount?: number;
  products?: string[];
  userProfile?: string;
}

declare interface GetPostType {
  id: string;
}

declare interface CommentType {
  id?: number;
  comment: string;
  userNickName: string;
  good?: boolean;
}

declare interface searchType {
  search: string;
  isActive: boolean;
  searchList: never[];
  searchWord: string;
  changeWord: (e: any) => void;
  deskSearch: (e: any) => void;
  setIsActive: boolean;
}
declare interface CustomModalType {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

declare interface userInforType {
  id?: string;
  following?: string[];
  introduction?: sgring;
  nickname?: string;
  profileImage?: string;
  scraps?: string[];
  userId?: string;
}
