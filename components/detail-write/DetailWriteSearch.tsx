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
  isNotData,
  setIsNotData,
  leftToggle,
  rightToggle,
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
              <span className="search" onClick={leftToggle}>
                검색하기
              </span>
              <span className="search" onClick={rightToggle}>
                직접 등록하기
              </span>
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
          {isNotData ? (
            <p className="search_products">제품을 입력해주세요</p>
          ) : (
            <p className="search_products">제품을 검색해주세요</p>
          )}
          <SearchInputBox>
            <input
              className="searchInput"
              id="products"
              type="text"
              placeholder={
                isNotData ? '제품명을 입력해주세요' : '검색어를 입력해주세요'
              }
              value={searchWord}
              onChange={inputSearchWord}
            />
            {isNotData ? (
              <CustomButton onClick={getNaverData}>입력</CustomButton>
            ) : (
              <CustomButton onClick={getNaverData}>검색</CustomButton>
            )}
          </SearchInputBox>
          {isNotData ? (
            <>
              <div className="search_description">
                검색하기에서 안 나오는 제품들을 입력해주세요
              </div>
              <div className="laptop_box">
                <Image
                  src={'/images/laptop.png'}
                  alt="isYourProduct"
                  width={300}
                  height={300}
                  className="laptop"
                />
                <div className="check_text">입력하신 제품이 맞으신가요?</div>
                <div className="check_title_text">
                  입력한 값 여기 들어올거임
                </div>
              </div>
              <div className="enter_again_text">다시 입력할게요</div>
              <DetailWriteSearchBoxBottom>
                <PickProductListBox>
                  <PickProductList>
                    {list?.map((item: any) => (
                      <PickProductsBox key={item.productId}>
                        <div className="pickProducts">{parse(item.title)}</div>

                        <Image
                          className="closeBtnImage"
                          src={close.src}
                          alt="closeBtn"
                          width={24}
                          height={24}
                          onClick={() => deleteProduct(item)}
                          style={{
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}
                        />
                      </PickProductsBox>
                    ))}
                  </PickProductList>
                </PickProductListBox>
                <ButtonBox>
                  <CustomButton onClick={onClose}>닫기</CustomButton>
                  <CustomButton onClick={onClick}>등록하기</CustomButton>
                </ButtonBox>
              </DetailWriteSearchBoxBottom>
            </>
          ) : null}
        </DetailWriteSearchBoxTop>

        {isNotData ? null : (
          <>
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
                <PickProductList>
                  {list?.map((item: any) => (
                    <PickProductsBox key={item.productId}>
                      <div className="pickProducts">{parse(item.title)}</div>

                      <Image
                        className="closeBtnImage"
                        src={close.src}
                        alt="closeBtn"
                        width={24}
                        height={24}
                        onClick={() => deleteProduct(item)}
                        style={{
                          alignContent: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    </PickProductsBox>
                  ))}
                </PickProductList>
              </PickProductListBox>
              <ButtonBox>
                <CustomButton onClick={onClose}>닫기</CustomButton>
                <CustomButton onClick={onClick}>등록하기</CustomButton>
              </ButtonBox>
            </DetailWriteSearchBoxBottom>
          </>
        )}
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
    color: #868e96;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.25rem;
    margin: 0.5rem 1rem;
    border-bottom: 2px solid #fff;
    cursor: pointer;

    &:active {
      border-bottom: 2px solid #206efb;
      color: #000000;
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
    padding: 0 1.6rem;
  }

  .search_description {
    padding: 0 1.6rem;
    font-size: 0.875rem;
    color: #f83e4b;
  }

  .laptop_box {
    position: relative;
    width: 40%;
    margin: 0.625rem auto;
    padding: 5.2px 0;
  }

  .laptop {
    width: 100%;
    height: 100%;
    vertical-align: middle;
    opacity: 0.2;
    transform: rotate(14.85deg);
    z-index: 21;
    overflow: hidden;
  }

  .check_text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    text-align: center;
    z-index: 22;
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 3rem;
  }

  .check_title_text {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    z-index: 22;
    color: #206efb;
    text-align: center;
    font-size: 1.2rem;
    line-height: 1.25rem;
    text-decoration: underline 0.125rem #206efb;
    /* border-bottom: 0.125rem solid #206efb; */
  }

  .enter_again_text {
    position: absolute;
    top: 69%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    font-size: 1rem;
    line-height: 1.25rem;
    color: #868e96;
  }
`;

const DetailWriteSearchBoxBottom = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  /* overflow: hidden; */
  z-index: 30;
  justify-content: center;
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
  width: 16.75rem;
  /* height: 2.25rem; */
  /* margin: 0.625rem; */
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
  overflow-x: scroll;
  display: flex;
  align-items: center;
  height: fit-content;
  padding: 1rem;
`;

const PickProductList = styled.div`
  background-color: #fff;
  display: flex;
  /* overflow-x: scroll; */
  height: 4.625rem;
  flex-direction: column;
  flex-wrap: wrap;
  width: fit-content;
  gap: 0.625rem;
  /* width: 100%; */
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
