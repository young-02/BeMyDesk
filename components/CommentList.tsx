import React from 'react';
import { collection } from 'firebase/firestore';
import { dbService } from '../shared/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';

type Props = {};

const CommentList = ({ postId }: { postId: string }) => {
  // 하위 컬렉션 - comments 에서 가져오기
  const query = collection(dbService, `postData/${postId}/comments`);
  const [data, loading, error] = useCollectionData(query);
  // console.log('readCommentsData', data);

  return (
    <CommentsListLayout>
      {loading && 'Loading...'}
      <ul>
        {data?.map((comment) => (
          <ListItem key={comment.id}>
            <li>{comment.id}</li>
            <li>{comment.commentText}</li>
            <li>유저Id: {comment.userId}</li>
            <li>{comment.createdAt}</li>
          </ListItem>
        ))}
      </ul>
    </CommentsListLayout>
  );
};

export default CommentList;

const CommentsListLayout = styled.div`
  margin-left: 2rem;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #d0d9df;
`;
