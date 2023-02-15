import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import {
  collection,
  getDocs,
  setDoc,
  addDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { dbService } from '../../shared/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import CommentList from '../../components/CommentList';
import ProductsList from '../../components/ProductsList';

type Props = {};

export default function PostList({}: Props) {
  // 포스트 id
  const [postId, setPostId] = useState();
  // 제품 id
  const [productId, setProductId] = useState();
  // 댓글 id
  const [commentId, setCommentId] = useState();
  // 유저 id
  const [userId, setUserId] = useState();

  const newPost = {
    id: postId,
    createdAt: Date(),
    userId: userId,
    jobCategory: 'developer',
    postTitle: '타이틀: 나의 드림데스크',
    postText: '텍스트: 정말 가지고 싶다.',
    postImage1: '메인이미지',
    postImage2: '서브이미지',
    colors: ['yellow', 'black'],
    likes: ['userId-1', 'userId-2'],
  };

  const newPostComments = {
    id: commentId,
    createdAt: Date(),
    userId: userId,
    commentText: '코멘트입니다.',
  };

  const newPostProducts = {
    id: productId,
    image: '키보드이미지',
    title: 'K380 멀티 블루투스 키보드',
    url: 'https://www.logitech.com/ko-kr/products/keyboards/k380-multi-device.920-011144.html',
    hashTag: '키보드/마우스',
  };

  // 상위 컬렉션에 추가
  const postData = () => {
    return setDoc(doc(dbService, `postData/${postId}`), newPost);
  };

  //하위 컬렉션 - comments 에 추가
  const postCommentsData = () => {
    const postRef = doc(dbService, `postData/${postId}/comments/${commentId}`);
    return setDoc(postRef, newPostComments);
  };

  //하위 컬렉션 - comments 에 추가
  const postProductsData = () => {
    const postRef = doc(dbService, `postData/${postId}/products/${productId}`);
    return setDoc(postRef, newPostProducts);
  };

  // 상위 컬렉션에서 가져오기
  const query = collection(dbService, 'postData');
  const [data, loading, error] = useCollectionData(query);
  console.log('readData', data);

  return (
    <PostListLayout>
      <div>
        포스트 id
        <input value={postId} onChange={(e) => setPostId(e.target.value)} />
        제품 id
        <input
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        댓글 id
        <input
          value={commentId}
          onChange={(e) => setCommentId(e.target.value)}
        />
        유저 id
        <input value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        <button onClick={postData}>포스트 상위 데이터 추가</button>
        <button onClick={postCommentsData}>
          포스트 하위 데이터 추가 - comments
        </button>
        <button onClick={postProductsData}>
          포스트 하위 데이터 추가 - products
        </button>
      </div>
      <h1>포스트</h1>
      {loading && 'Loading...'}
      <ul>
        {data?.map((post) => (
          <ListItem key={post.id}>
            <li>{post.id}</li>
            <li>{post.createdAt}</li>
            <li>{post.postTitle}</li>
            <li>{post.postText}</li>
            <ProductsList postId={post.id} />
            <CommentList postId={post.id} />
          </ListItem>
        ))}
      </ul>
    </PostListLayout>
  );
}

const PostListLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > div {
    display: flex;
    flex-direction: row;
    margin-top: 0.5rem;
    gap: 0.5rem;
  }
  > h1 {
    font-size: 3rem;
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #e8edef;
`;
