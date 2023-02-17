declare type example = {};
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
