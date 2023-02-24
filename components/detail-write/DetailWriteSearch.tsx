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
              {/* <span className="search">직접 등록하기</span> */}
            </div>
            <button className="closeBtn" onClick={onClose}>
              <img className="closeBtnImage" src={close.src} />
            </button>
          </DetailWriteSearchBox>
          <p className="search_products">제품을 검색해주세요</p>
          <SearchInputBox>
            <input
              className="searchInput"
              id="products"
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchWord}
              onChange={inputSearchWord}
            />
            <button onClick={getNaverData}>검색</button>
          </SearchInputBox>
        </DetailWriteSearchBoxTop>
        <div style={{ padding: '1rem' }}>
          {data?.map((item: any) => (
            <DetailWriteSearchProductBox
              key={item.productId}
              productClick={false}
              onClick={() => selectProduct(item)}
            >
              <div className="searchProduct">
                <div style={{ width: '600px' }}>
                  {item.title.split('<b>').join('').split('</b>').join('')}
                </div>
                <div
                  style={{
                    width: '80px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.category2}
                </div>
              </div>
            </DetailWriteSearchProductBox>
          ))}
        </div>
        <DetailWriteSearchBoxBottom>
          {list?.map((item: any) => (
            <PickProductsBox>
              <div key={item.productId} className="pickProducts">
                {parse(item.title)}
              </div>
              <div>
                <button onClick={() => deleteProduct(item)}>
                  <img className="closeBtn" src={close.src} />
                </button>
              </div>
            </PickProductsBox>
          ))}
          <ButtonBox>
            <button onClick={onClose}>닫기</button>
            <button onClick={onClick}>등록하기</button>
          </ButtonBox>
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
  justify-content: space-between;
  margin: 0.625rem;

  > div {
    display: flex;
    align-items: center;
  }

  .search {
    font-size: 1rem;
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

  .searchProduct {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 46.875rem;
    height: 3.5rem;
    font-size: 1rem;
    line-height: 1.25rem;
    border: 1px solid #868e96;
    padding: 1rem;
    margin: 0.625rem;

    border-radius: 0.625rem;
    overflow: hidden;
    cursor: pointer;
  }
  &:hover {
    color: #206efb;
  }
`;

const DetailWriteSearchBoxTop = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;

  .search_products {
    font-size: 22px;
    font-weight: 700;
    line-height: 3rem;
    margin-bottom: 0.625rem;
    padding-left: 1.25rem;
  }
`;

const DetailWriteSearchBoxBottom = styled.div`
  position: sticky;
  bottom: 0;
  height: 130px;
  width: 100%;
  background-color: #fff;

  .pickProducts {
    color: #fff;
    background-color: #206efb;
    width: 200px;
    height: 2.25rem;
    margin: 0.625rem;
    border-radius: 1.875rem;
    padding: 0.5rem 1.25rem;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SearchInputBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.625rem;

  > input {
    width: 37.5rem;
    height: 2.8125rem;
    border-radius: 0.625rem;
    border: 2px solid #868e96;
    padding: 0 1rem;
    font-size: 1rem;
    line-height: 0.75rem;

    &:focus {
      border-color: #206efb;
    }
  }

  > button {
    width: 5.5rem;
    height: 50px;
    border: none;
    border-radius: 0.625rem;
    background-color: #206efb;
    font-size: 16px;
    color: #fff;
    padding: 0.75rem;
  }
`;

const PickProductsBox = styled.div`
  display: flex;
  flex-direction: row;

  .closeBtn {
    width: 10px;
    height: 10px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: end;
  /* background-color: #f1f3f5; */
  /* width: 100%; */

  > button {
    border: none;
    border-radius: 0.625rem;
    background-color: #206efb;
    color: #fff;
    font-size: 1rem;
    margin: 0.625rem;
    padding: 0.5rem 1rem;
  }
`;

export default memo(DetailWriteSearch);
