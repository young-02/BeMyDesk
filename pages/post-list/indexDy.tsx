
import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { dbService } from '../../shared/firebase';
import styled from 'styled-components';
import PostListCard from '@/components/PostListCard';
import GlobalNavigationBar from '../../components/GlobalNavigationBar';
import PostListFilterBar from '../../components/PostListFilterBar';
import ProductsList from '../../components/ProductsList';
import PostListItem from '@/components/post-list/PostListItem';


export default function PostList() {
  // 🔖 로그인 기능과 합쳐지면, userId 초기값을 UID 로 변경합니다.
  const [postList, setPostList] = useState<PostType[]>();
  const [userId, setUserId] = useState('좋아요봇');

  // 🔖 임시 구현한 검색창 검색어를 상태관리합니다.
  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  // 🔖 임시 post 추가를 위한 상태관리, 로직 구현 시 삭제합니다.
  // const [postTitle, setPostTitle] = useState();
  // const [jobCategory, setJobCategory] = useState();
  // const [likes, setLikes] = useState([]);

  // 임시 좋아요 array 선택지
  // const oneLikes = ['userId-1'];
  // const twoLikes = ['userId-1', 'userId-2'];
  // const threeLikes = ['userId-1', 'userId-2', 'userId-3'];

  // 임시 포스트
  // const newPost = {
  //   createdAt: serverTimestamp(),
  //   userId,
  //   jobCategory,
  //   postTitle,
  //   postText: '정말 가지고 싶다.',
  //   postImage1: '메인이미지',
  //   postImage2: '서브이미지',
  //   likes,
  //   likesCount: 0,
  // };

  // "postData" 에 포스트 추가
  // const addPost = async () => {
  //   const postRef = collection(dbService, 'postData');
  //   await addDoc(postRef, newPost);
  //   setUserId('');
  //   setPostTitle('');
  // };
  // ✂️

  // READ post-list / 전체 (최신순 정렬) (기본값)
  useEffect(() => {
    const postRef = collection(dbService, 'postData');
    const q = query(postRef, orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const postData: any = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // setPostList(postData);

      // 🔖 포스트 제목과 글 내용에 대한 검색 기능을 임시 구현합니다.
      const filteredList: any[] = [];
      postData.map((post: PostType) => {
        if (post.postTitle.includes(search)) {
          filteredList.push(post);
        } else if (post.postText.includes(search)) {
          filteredList.push(post);
        } else {
          return;
        }
      });
      setPostList(filteredList);
      // ✂️
    });
  }, [search]);

  return (
    <PostListLayout>
      <Header>
        <GlobalNavigationBar theme="light" />
        <PostListFilterBar theme="light" />
      </Header>
      {/* 🔖 임시 post 추가를 위한 헤더, 로직 구현 시 삭제합니다. */}
      {/* <DummyHeader>
        <h1>포스트</h1>
        <p>디자이너 / 개발자 / 학생 / 게이머</p>
        <div className="add-post" onSubmit={postData}>
          <input
            placeholder="유저 id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            placeholder="포스트 제목"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <input
            placeholder="직업 카테고리"
            value={jobCategory}
            onChange={(e) => setJobCategory(e.target.value)}
          />
          <button onClick={() => setLikes(oneLikes)}>좋아요 1개</button>
          <button onClick={() => setLikes(twoLikes)}>좋아요 2개</button>
          <button onClick={() => setLikes(threeLikes)}>좋아요 3개</button>
          <button onClick={addPost}>새 포스트 추가</button>
        </div>
      </DummyHeader> */}
      {/* ✂️ }
      {/* 🔖임시 구현한 검색창 */}
      <div>
        <input
          placeholder="검색하세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={() => setSearch(searchInput)}>검색</button>
      </div>
      {/* ✂️*/}
      <PostListBox>
        {postList?.map((post) => (
          <PostListCard key={post.id} post={post} currentUserId={userId} />
        ))}
      </PostListBox>
    </PostListLayout>
  );
}

const PostListLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 1;
`;

const PostListBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75rem;
  padding-bottom: 2rem;
  gap: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;

// 🔖 임시 post 추가를 위한 컴포넌트, 로직 구현 시 삭제합니다.
// const DummyHeader = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   position: sticky;
//   top: 0px;
//   padding: 1.875rem 0rem;
//   gap: 1rem;
//   background-color: white;
//   z-index: 1;

//   > h1 {
//     font-size: 3rem;
//   }
//   .add-post {
//     display: flex;
//     flex-direction: row;
//     gap: 0.5rem;
//   }
// `;
