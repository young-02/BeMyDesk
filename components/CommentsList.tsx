import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { dbService } from '../shared/firebase';
import styled from 'styled-components';

type Props = {};

const CommentsList = ({ postId }: { postId: string }) => {
  const [data, setData] = useState();
  const commentsRef = collection(dbService, `postData/${postId}/comments`);

  useEffect(() => {
    onSnapshot(commentsRef, (snapshot) => {
      const commentData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(commentData);
    });
  }, []);

  return (
    <CommentsListLayout>
      {/* {loading && 'Loading...'} */}
      <ul>
        {data?.map((comment) => (
          <ListItem key={comment.id}>
            <li>{comment.id}</li>
            <li>유저Id: {comment.userId}</li>
            <li>{comment.commentText}</li>
          </ListItem>
        ))}
      </ul>
    </CommentsListLayout>
  );
};

export default CommentsList;

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
