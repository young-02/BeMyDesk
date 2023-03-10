import CustomButton from '@/components/ui/CustomButton';
import CustomModal from '@/components/ui/CustomModal';
import { dbService } from '@/shared/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { QueryClient, useQueryClient } from 'react-query';
import styled from 'styled-components';

function DeleteModal({ isDeleteModalOn, setIsDeleteModalOn, post }: any) {
  const queryClient = useQueryClient();
  const deleteButton = async () => {
    await deleteDoc(doc(dbService, `postData/${post.id}`));
    queryClient.invalidateQueries(['my-page', 'myPost']);
    await setIsDeleteModalOn(false);
  };
  const cancelButon = () => {
    setIsDeleteModalOn(false);
  };

  return (
    <CustomModal>
      <ModalDiv>
        <p className="headerText">게시글을 정말 삭제하시겠습니까?</p>
        <p className="introduceText">삭제 이후 복원이 불가능합니다.</p>
        <div className="buttonWrap">
          <CustomButton
            paddingRow="0"
            paddingColumns="0.5"
            backgroundColor="#F83E4B"
            fontColor="#fff"
            hover="90"
            active="60"
            onClick={deleteButton}
          >
            삭제하기
          </CustomButton>
          <CustomButton
            paddingRow="0"
            paddingColumns="0.5"
            backgroundColor="#fff"
            fontColor="#868E96"
            hover="90"
            active="50"
            onClick={cancelButon}
          >
            취소
          </CustomButton>
        </div>
      </ModalDiv>
    </CustomModal>
  );
}

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 170px;
  align-items: center;
  .headerText {
    /* Pretendard Bold 30 */

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 48px;
    /* identical to box height, or 160% */

    text-align: center;

    /* Gray 09 */

    color: #17171c;
  }

  .introduceText {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 0.8rem;
    line-height: 20px;
    /* identical to box height, or 125% */

    text-align: center;

    /* Gray 05 */

    color: #868e96;
  }
`;

export default DeleteModal;
