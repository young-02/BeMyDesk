import { uuidv4 } from '@firebase/util';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommentList from './CommentList';
import CommentWrite from './CommentWrite';
import useGetPosts from '../../Hooks/useGetPosts';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService } from '@/shared/firebase';

export default function Comment({ path }: any) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const collectionRef = collection(dbService, path);
    const q = query(collectionRef, orderBy('timestamp', 'asc'));

    onSnapshot(q, (snapshot: any) =>
      setComments(
        snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })),
      ),
    );
  }, [path]);

  return (
    <CommentLayout>
      <h3 className="title">댓글</h3>
      <p className="description">{comments?.length}개의 댓글이 작성되었어요</p>
      {comments?.map((comment: any) => {
        return <CommentList key={comment.id} comment={comment} path={path} />;
      })}
      <CommentWrite path={path} />
    </CommentLayout>
  );
}

const CommentLayout = styled.div`
  .title {
    font-size: 1.25rem;
  }
  .description {
    margin: 0.75rem 0 1.125rem;
  }
`;
