import React, { useCallback, useEffect, useState, memo } from 'react';
import DetailWriteSearchModal from './DetailWriteSearchModal';
import styled from 'styled-components';
import axios from 'axios';
import close from 'public/images/close.png';
import CustomButton from '../ui/CustomButton';
import Image from 'next/image';

const parse = require('html-react-parser');
axios.defaults.withCredentials = true;

const DetailWriteSearch = ({
  searchWord,
  setSearchWord,
  data,
  setData,
  list,
  setList,
  select,
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
              <Image
                className="closeBtnImage"
                src={close.src}
                width={24}
                height={24}
                alt="closeBtnImage"
              />
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
            <CustomButton onClick={getNaverData}>검색</CustomButton>
          </SearchInputBox>
        </DetailWriteSearchBoxTop>
        <SelectProductBox>
          {data?.map((item: any) => (
            <DetailWriteSearchProductBox
              key={item.productId}
              onClick={() => selectProduct(item)}
            >
              <div className="searchProduct">
                <div style={{ width: '600px' }}>
                  {item.title.split('<b>').join('').split('</b>').join('')}
                </div>
                <div className="search_category">{item.category2}</div>
              </div>
            </DetailWriteSearchProductBox>
          ))}
        </SelectProductBox>
        <DetailWriteSearchBoxBottom>
          <PickProductListBox>
            {list?.map((item: any) => (
              <PickProductsBox>
                <div className="pickProducts" key={item.productId}>
                  {parse(item.title)}
                </div>

                <Image
                  className="closeBtnImage"
                  src={close.src}
                  alt="closeBtn"
                  width={24}
                  height={24}
                  onClick={() => deleteProduct(item)}
                  style={{ alignContent: 'center', justifyContent: 'center' }}
                />
              </PickProductsBox>
            ))}
          </PickProductListBox>
          <ButtonBox>
            <CustomButton onClick={onClose}>닫기</CustomButton>
            <CustomButton onClick={onClick}>등록하기</CustomButton>
          </ButtonBox>
        </DetailWriteSearchBoxBottom>
      </DetailWriteSearchLayout>
    </DetailWriteSearchModal>
  );
};

const DetailWriteSearchLayout = styled.div`
  display: block;
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

const DetailWriteSearchProductBox = styled.div`
  display: flex;
  overflow: hidden;

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

  .search_category {
    width: 3.125rem;
    align-items: center;
    justify-content: center;
  }
`;

const DetailWriteSearchBoxTop = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  overflow: hidden;
  /* overflow-y: hidden; */
  z-index: 30;

  .search_products {
    display: flex;
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
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  z-index: 30;
  /* flex-wrap: wrap; */
  /* width: fit-content; */
  /* align-items: flex-start; */

  .pickProducts {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SearchInputBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.625rem;
  padding: 0 0.5rem;

  > input {
    width: 34.375rem;
    height: 2.8125rem;
    border-radius: 0.625rem;
    border: 2px solid #868e96;
    padding: 0 2.3rem;
    font-size: 1rem;
    line-height: 0.75rem;
    background-image: url('/images/Search.png');
    background-repeat: no-repeat;
    background-position: 1% center;

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
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: #206efb;
  width: 23.125rem;
  height: 2.25rem;
  margin: 0.625rem;
  border-radius: 1.875rem;
  padding: 0.5rem 1.25rem;
  font-size: 1rem;

  .closeBtnImage {
    width: 0.625rem;
    height: 0.625rem;
    padding: 0;
  }
`;

const ButtonBox = styled.div`
  display: fixed;
  justify-content: end;
  background-color: #f1f3f5;
  padding: 0.5rem 0.5rem;

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

const SelectProductBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow-y: auto;
  height: 120vh;
  z-index: 25;
  /* position: relative; */
  /* bottom: 0; */
`;

const PickProductListBox = styled.div`
  background-color: #fff;
  display: flex;
  overflow-x: scroll;
  height: 9.375rem;
  flex-direction: column;
  flex-wrap: wrap;
  width: fit-content;
  width: 100%;
  align-items: flex-start;
`;

const TestBox = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  z-index: 30;
  /* flex-wrap: wrap; */
  /* width: fit-content; */
  /* align-items: flex-start; */
`;
export default memo(DetailWriteSearch);
