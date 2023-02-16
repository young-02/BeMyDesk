import React, { useEffect, useState } from 'react';
import {
  collection,
  setDoc,
  doc,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import { dbService } from '../../shared/firebase';
import styled from 'styled-components';
import CommentsList from '../../components/CommentsList';
import ProductsList from '../../components/ProductsList';

type Props = {};

export default function PostList({}: Props) {
  // 유저 id
  const [userId, setUserId] = useState();
  // 전체 포스트 리스트
  const [data, setData] = useState();
  // 포스트 제목
  const [postTitle, setPostTitle] = useState();
  // 댓글
  const [comment, setComment] = useState();
  // 제품명
  const [product, setProduct] = useState();

  const newPost = {
    createdAt: Date(),
    userId,
    jobCategory: 'developer',
    postTitle,
    postText: '정말 가지고 싶다.',
    postImage1: '메인이미지',
    postImage2: '서브이미지',
    colors: ['yellow', 'black'],
    likes: ['userId-1', 'userId-2'],
  };

  const newPostComments = {
    createdAt: Date(),
    userId: userId,
    commentText: comment,
  };

  const newPostProducts = {
    image: '키보드이미지',
    title: product,
    url: 'https://www.logitech.com/ko-kr/products/keyboards/k380-multi-device.920-011144.html',
    hashTag: '키보드/마우스',
  };

  // 컬렉션 참조위치 / "postData" / "comments" / "products"
  const postRef = collection(dbService, 'postData');

  // 상위 컬렉션 "postData" 에 포스트 추가
  const postData = async () => {
    await addDoc(postRef, newPost);
    setPostTitle('');
  };

  //하위 컬렉션 - "postData" 의 "comments" 에 코멘트 추가
  const postCommentsData = async (postId) => {
    const commentsRef = collection(dbService, `postData/${postId}/comments`);
    setComment('');
    return await addDoc(commentsRef, newPostComments);
  };

  //하위 컬렉션 - "postData" 의 "products" 에 제품 추가
  const postProductsData = async (postId) => {
    const productsRef = collection(dbService, `postData/${postId}/products`);
    setProduct('');
    return await addDoc(productsRef, newPostProducts);
  };

  // 상위 컬렉션 "postData" 의 포스트 읽어오기
  useEffect(() => {
    onSnapshot(postRef, (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log('파이어베이스 스냅샷 도착 :', postData);
      setData(postData);
    });
  }, []);

  return (
    <PostListLayout>
      <div>
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
        <button onClick={postData}>새 포스트 추가</button>
      </div>
      <h1>포스트</h1>
      {/* {loading && 'Loading...'} */}
      <ul>
        {data?.map((post) => (
          <ListItem key={post.id}>
            <li>{post.id}</li>
            <li>작성자 : {post.userId}</li>
            <li>{post.createdAt}</li>
            <li>타이틀 : {post.postTitle}</li>
            <li>텍스트 : {post.postText}</li>
            <div>
              <input
                placeholder="댓글추가"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={() => postCommentsData(post.id)}>확인</button>
            </div>
            <div>
              <input
                value={product}
                placeholder="제품추가"
                onChange={(e) => setProduct(e.target.value)}
              />
              <button onClick={() => postProductsData(post.id)}>확인</button>
            </div>
            <ProductsList postId={post.id} />
            <CommentsList postId={post.id} />
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
