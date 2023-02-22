import CustomButton from '@/components/ui/CustomButton';
import { auth, dbService } from '@/shared/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ProfileImg, WriteInformationDiv } from './CommentList';
import useCheckLogin from '../../Hooks/useCheckLogin';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function CommentWrite({ path }) {
  const [commentText, setCommnetText] = useState('');
  const userNickName = auth.currentUser?.displayName ?? '';
  const userProfile =
    auth.currentUser?.photoURL ?? '/images/defaultProfile.png';
  const { isLogin } = useCheckLogin();
  const router = useRouter();

  const createdAt = Date.now();

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommnetText(e.target.value);
  };

  const addComment = async () => {
    if (isLogin) {
      if (commentText.trim().length == 0) {
        return;
      }

      const collectionRef = collection(dbService, path);
      const payload = {
        commentText,
        userNickName,
        userProfile,
        createdAt,
        userId: auth.currentUser?.uid,
      };
      await addDoc(collectionRef, payload);
      setCommnetText('');
    } else {
      router.push('/auth/sign-in');
    }
  };

  return (
    <CommentWriteLayout>
      <UserInformationDiv>
        <ProfileImg src={userProfile} alt="profileImg" />
        <div className="userInformation">
          <p className="nickName">{userNickName}</p>
        </div>
      </UserInformationDiv>
      <CommentForm>
        <input
          className="commentInput"
          type="text"
          placeholder="댓글 작성하기..."
          value={commentText}
          onChange={onChangeComment}
        />
        <CustomButton
          backgoundColor="#206EFB"
          fontColor="#fff"
          fontSize="20"
          paddingRow="1.25"
          paddingColumns="0.4"
          onClick={addComment}
        >
          댓글쓰기
        </CustomButton>
      </CommentForm>
    </CommentWriteLayout>
  );
}

const CommentWriteLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const UserInformationDiv = styled.div`
  display: flex;
  align-items: center;

  .nickName {
    margin-left: 0.625rem;
    font-size: 0.875rem;
    font-weight: 700;
  }
`;

const CommentForm = styled.div`
  margin-left: 0.625rem;
  display: flex;
  justify-content: space-between;
  flex: 2;
  /* width: calc(100% - 9rem); */

  .commentInput {
    width: calc(100% - 7.5rem);
    padding: 0.5rem;
    font-size: 0.875rem;
    margin-right: 0.625rem;
    border-radius: 0.4rem;
    border:0.0625rem solid #868E96
  }
`;
