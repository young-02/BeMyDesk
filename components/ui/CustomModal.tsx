import React from 'react';
import styled from 'styled-components';
import CustomButton from './CustomButton';
// import CustomButton from '../';

export default function CustomModal({
  children,
  title,
  description,
}: CustomModalType) {
  return (
    <CustomModalLayout>
      <ModalWrapDiv>
        <div className="title">{title}</div>
        <div className="description">{description}</div>
        {children}
      </ModalWrapDiv>
    </CustomModalLayout>
  );
}

const CustomModalLayout = styled.section`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalWrapDiv = styled.div`
  background: #fff;
  text-align: center;
  border-radius: 0.625rem;
  padding: 1.5rem 2.5rem;

  .buttonWrap {
    display: flex;
    gap: 0.625rem;
    flex-direction: column;
    min-width: 320px;
    margin-top: 2rem;
  }
`;
