import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

type Props = {
  children?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};
// 모달 백드랍
const Backdrop = (props: any) => {
  return <ModalBackDrop onClick={props.onClose}></ModalBackDrop>;
};
//모달 오버레이
const ModalOverlay = (props: any) => {
  return (
    <div>
      <ModalOverlays>{props.children}</ModalOverlays>
    </div>
  );
};

const portalElement =
  typeof window !== 'undefined' &&
  (document.getElementById('modal-root') as HTMLElement);

//모달 함수
const DetailWriteSearchModal = (props: any) => {
  return (
    <>
      {createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement as HTMLElement,
      )}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement as HTMLElement,
      )}
    </>
  );
};

const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalOverlays = styled.div`
  position: fixed;
  top: 15vh;
  left: 25%;
  width: 50rem;
  height: 75vh;
  background-color: white;
  border-radius: 10px;
  z-index: 20;
  overflow-y: scroll;

  @media (min-width: 1px) and (max-width: 375px) {
    top: 9vh;
    left: 0%;
    width: 100%;
    height: 92%;
  }

  @media (min-width: 376px) and (max-width: 690px) {
    top: 8vh;
    left: 0%;
    width: 100%;
    height: 93%;
  }

  @media (min-width: 691px) and (max-width: 1200px) {
    top: 11vh;
    left: 15%;
    width: 70%;
  }
`;
export default DetailWriteSearchModal;
