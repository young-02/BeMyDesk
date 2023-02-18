import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import DetailWriteSearch from './DetailWriteSearch';
import DetailWriteProductCard from './DetailWriteProductCard';
import DetaillWriteImageInput from './DetaillWriteImageInput';

type Props = {};

// 글쓰기 페이지 폼 함수입니다
const DetailWriteForm = () => {
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
      <DetailWriteLayout>
        {isModalShow && <DetailWriteSearch onClose={hideSearchModal} />}
        <DetailWriteSelectBox>
          <select className="job_select">
            <option value="select" className="optionOne">
              선택해주세요
            </option>
            <option value="개발자">개발자</option>
            <option value="디자이너">디자이너</option>
            <option value="기획자">기획자</option>
            <option value="학생">학생</option>
            <option value="기타">기타</option>
          </select>
          <p className="job_span">의 책상</p>
        </DetailWriteSelectBox>
        <DetailWriteTitleInput
          type="text"
          placeholder="제목을 입력해주세요"
          maxLength={30}
        />
        <Editor />
        <DetailWriteBox>
          <span className="title_span">
            테스크테리어 분위기 색상을 선택해주세요
            <DetaillWriteImageInput />
          </span>
        </DetailWriteBox>
        <DetailWriteBox>
          <span className="title_span">사용하신 제품을 선택해주세요</span>
          <DetailWriteProductCard />
        </DetailWriteBox>
        <DetailWriteButtonBox>
          <button className="btn">취소</button>
          <button className="btn">완료</button>
        </DetailWriteButtonBox>
      </DetailWriteLayout>

      <button onClick={showSearchModal}>기기검색</button>
    </>
  );
};

export default DetailWriteForm;

const DetailWriteLayout = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 80%;
  height: 125vh;
  padding: 0.5rem;
`;

const DetailWriteSelectBox = styled.div`
  display: flex;
  align-items: center;
  width: 75rem;
  height: 3.25rem;

  .job_select {
    width: 7.375rem;
    height: 1.75rem;
    border: 0.0625rem solid #868e96;
    border-radius: 0.625rem;
    padding: 0.25rem 0.5rem;

    &:hover {
      border-color: #206efb;
    }
  }

  .job_span {
    font-size: 1.125rem;
    line-height: 1.25rem;
  }
`;

const DetailWriteTitleInput = styled.input`
  display: flex;
  width: 75rem;
  height: 3.25rem;
  box-sizing: border-box;
  border: 0.125rem solid #868e96;
  border-radius: 0.625rem;
  padding: 0.875rem 1.25rem;
  font-size: 1.375rem;
`;

const DetailWriteButtonBox = styled.div`
  display: flex;
  justify-content: end;
  width: 75rem;
  height: 3.25rem;

  .btn {
    background-color: #206efb;
    border: none;
    border-radius: 0.625rem;
    color: white;
    font-size: 1.25rem;
    line-height: 1.25rem;
    width: 9.375rem;
    height: 3.25rem;
    margin: 0 0.8rem;
    padding: 1rem 2.5rem;

    &:hover {
      color: #206efb;
      background-color: #fff;
    }
  }
`;

const DetailWriteBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 75rem;
  height: 12.5rem;
  margin: 2rem;

  .title_span {
    margin-bottom: 0.625rem;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;
