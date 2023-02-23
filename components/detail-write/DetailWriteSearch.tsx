import React, { useCallback, useEffect, useState, memo } from 'react';
import DetailWriteSearchModal from './DetailWriteSearchModal';
import styled from 'styled-components';
import axios from 'axios';
import close from 'public/images/close.png';
const parse = require('html-react-parser');

axios.defaults.withCredentials = true;

interface DetailWriteSearchProductBox {
  productClick?: boolean;
  display?: string;
  overflow?: string;
  isActive?: boolean;
}

export interface listProps {
  title: string;
  category: string;
  image: string;
  productId?: string;
}

type Props = { item: listProps[] };

const DetailWriteSearch = ({
  searchWord,
  setSearchWord,
  data,
  setData,
  list,
  setList,
  inputSearchWord,
  getNaverData,
  selectProduct,
  deleteProduct,
  onClose,
  onClick,
}: any) => {
  return (
    <DetailWriteSearchModal onClose={onClose}>
      <DetailWriteSearchLayout>
        <DetailWriteSearchBoxTop>
          <DetailWriteSearchBox>
            <div>
              <span className="search">검색하기</span>
            </div>
            <button className="closeBtn" onClick={onClose}>
              <img className="closeBtnImage" src={close.src} />
            </button>
          </DetailWriteSearchBox>
          <span>제품을 검색해주세요</span>
          <div>
            <input
              id="products"
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchWord}
              onChange={inputSearchWord}
            />
            <button onClick={getNaverData}>검색</button>
          </div>
          <div>
            <span>제품을 선택해주세요</span>
          </div>
        </DetailWriteSearchBoxTop>
        <div>
          {data?.map((item: any) => (
            <DetailWriteSearchProductBox
              key={item.productId}
              productClick={false}
              onClick={() => selectProduct(item)}
            >
              <div className="searchProduct">
                {parse(item.title)}
                {item.category2}
              </div>
            </DetailWriteSearchProductBox>
          ))}
        </div>
        <DetailWriteSearchBoxBottom>
          {list?.map((item: any) => (
            <div key={item.productId}>
              {parse(item.title)}
              <button onClick={() => deleteProduct(item)}>삭제</button>
            </div>
          ))}
          <button onClick={onClose}>닫기</button>
          <button onClick={onClick}>등록하기</button>
        </DetailWriteSearchBoxBottom>
      </DetailWriteSearchLayout>
    </DetailWriteSearchModal>
  );
};

const DetailWriteSearchLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailWriteSearchBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .search {
    font-size: 1.25rem;
    line-height: 1.25rem;
    margin: 0.5rem 1rem;
    cursor: pointer;

    &:active {
      border-bottom: 2px solid #206efb;
    }
  }

  .closeBtn {
    border: none;
    background-color: #fff;
  }

  .closeBtnImage {
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    background-color: #fff;
    cursor: pointer;
  }
`;

const DetailWriteSearchProductBox = styled.div<DetailWriteSearchProductBox>`
  display: flex;
  /* overflow-y: scroll; */

  .searchProduct {
    display: flex;
    align-items: center;
    width: 46.875rem;
    height: 3.5rem;
    font-size: 1.25rem;
    line-height: 1.25rem;
    border: 1px solid #868e96;
    padding: 1rem;
    margin: 0.625rem;
    border-radius: 0.625rem;
    overflow: hidden;
    cursor: pointer;
  }
`;

const DetailWriteSearchBoxTop = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
`;

const DetailWriteSearchBoxBottom = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #fff;
`;

export default memo(DetailWriteSearch);
