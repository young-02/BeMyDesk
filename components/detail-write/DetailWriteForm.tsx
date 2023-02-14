import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import DetailWriteSearch from './DetailWriteSearch';
type Props = {};

const DetailWriteForm = (props: any) => {
  const Editor = dynamic(() => import('./DetailWriteFormEditor'), {
    ssr: false,
  });

  const [isModalShow, setIsModalShow] = useState(false);

  const showSearchModal = (event: any) => {
    setIsModalShow(true);
  };

  const hideSearchModal = () => {
    setIsModalShow(false);
  };

  return (
    <>
      <DetailWriteFormLayout>
        {isModalShow && <DetailWriteSearch onClose={hideSearchModal} />}
        <div>
          <label>제목</label>
          <input />
        </div>
        <div>
          <select>
            <option value="select">선택해주세요</option>
            <option value="개발자">개발자</option>
            <option value="디자이너">디자이너</option>
            <option value="기획자">기획자</option>
            <option value="학생">학생</option>
            <option value="기타">기타</option>
          </select>
          <span>의 책상</span>
        </div>
        <Editor />
        <DetailWriteFormButtonBox>
          <button>취소</button>
          <button>완료</button>
        </DetailWriteFormButtonBox>
      </DetailWriteFormLayout>
      <button onClick={showSearchModal}>기기검색</button>
    </>
  );
};

export default DetailWriteForm;

const DetailWriteFormLayout = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: yellow;
  margin: 0 auto;
  width: 80%;
`;

const DetailWriteFormButtonBox = styled.div`
  display: flex;
`;
