import CustomButton from '@/components/ui/CustomButton';
import { auth, dbService } from '@/shared/firebase';
import { deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type Props = {};

export default function CommentList({ comment, path }) {
  const { userProfile, userNickName, createdAt, commentText, id } = comment;
  const [edit, setEdit] = useState({
    active: false,
    editText: commentText,
  });
  const { active, editText } = edit;

  //시간경과
  const detailDate = (time: any) => {
    const milliSeconds = new Date() - time;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };
  const nowDate = detailDate(createdAt);

  //삭제
  const deleteComment = async (id: string) => {
    alert('정말삭제하시겠습니까?');
    const docRef = doc(dbService, path, id);
    await deleteDoc(docRef);
  };
  //수정

  // console.log(commentText);
  const editComment = async (id: string) => {
    setEdit({ ...edit, active: !active });
    const commentText = editText;
    const docRef = doc(dbService, path, id);
    const payload = { commentText };
    updateDoc(docRef, payload);
  };

  return (
    <CommentListLayout>
      <WriteInformationDiv>
        <ProfileImg src={userProfile} alt="profileImg" />
        <div className="userInformation">
          <p className="nickName">{userNickName}</p>
          <p className="date">{nowDate}</p>
        </div>
      </WriteInformationDiv>
      <CommentText>
        {!active ? (
          <p className="commenText">{commentText}</p>
        ) : (
          // <div dangerouslySetInnerHTML={{ __html: commentText }}></div>
          <input
            className="editInput"
            type="text"
            placeholder={commentText}
            value={editText}
            onChange={(e) => setEdit({ ...edit, editText: e.target.value })}
          />
        )}
        {/* {auth.currentUser && ( */}
        <div className="commentModify">
          <CustomButton
            backgoundColor="none"
            fonstColor="#868E96"
            onClick={() => editComment(id)}
          >
            수정
          </CustomButton>
          <CustomButton
            backgoundColor="none"
            fonstColor="#868E96"
            onClick={() => deleteComment(id)}
          >
            삭제
          </CustomButton>
        </div>
        {/* )} */}
      </CommentText>
    </CommentListLayout>
  );
}

const CommentListLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 1.25rem;

  &:hover {
    background: #f1f3f5;
  }
`;

export const WriteInformationDiv = styled.div`
  display: flex;
  align-items: center;

  .userInformation {
    .nickName {
      margin-bottom: 0.125rem;
      font-size: 0.875rem;
      font-weight: 700;
    }

    .date {
      font-size: 0.75rem;
    }
  }
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 0.625rem;
  border-radius: 100%;
  object-fit: cover;
`;

const CommentText = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .commenText {
    overflow-wrap: anywhere;
    
  }

  .editInput {
    width: 80%;
    padding: 8px;
    border: none;
    background: none;
    border-bottom: 1px solid #868e96;
    color: #868e96;
    font-size: 0.875rem;
  }

  .commentModify {
    display: flex;
    font-size: 0.75rem;
  }
`;
