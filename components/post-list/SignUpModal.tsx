import React, { useEffect } from 'react';
import CustomModal from '@/components/ui/CustomModal';
import CustomButton from '@/components/ui/CustomButton';
import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

function SignUpModal({ isModalOn, setIsModalOn }: any) {
  return (
    <>
      {isModalOn && (
        <CustomModal>
          <ModalDiv>
            <p className="headerText">회원가입을 축하드려요!</p>
            <Image
              className="profileImage"
              src="/images/laptop.png"
              alt="ProfileImage"
              width={150}
              height={150}
            />
            <p className="introduceText">BE MY DESK에서</p>
            <p className="introduceText">나만의 공간을 찾는 경험을 해보세요!</p>
            <CustomButton
              backgroundColor="#206EFB"
              fontColor="#fff"
              paddingColumns="0.575"
              paddingRow="0.575"
              fontSize="1"
              onClick={() => setIsModalOn(false)}
            >
              확인
            </CustomButton>
          </ModalDiv>
        </CustomModal>
      )}
    </>
  );
}

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 300px;
  align-items: center;
  .headerText {
    /* Pretendard Bold 30 */

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
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
    /* or 125% */

    text-align: center;

    /* Gray 09 */

    color: #17171c;
  }
  > button {
    width: 100%;
    font-size: 16px;
    margin-top: 15px;
    :hover {
      opacity: 90%;
    }
  }
`;

export default SignUpModal;
