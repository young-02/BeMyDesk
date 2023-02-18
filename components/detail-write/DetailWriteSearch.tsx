import React, { useCallback, useEffect, useState } from 'react';
import DetailWriteSearchModal from './DetailWriteSearchModal';
import styled from 'styled-components';
import axios from 'axios';
import close from 'public/images/close.png';
axios.defaults.withCredentials = true;

interface DetailWriteSearchProductBox {
  productClick?: boolean;
  display?: string;
  overflow?: string;
}

type Props = {};

const DetailWriteSearch = (props: any) => {
  // 검색어 state
  const [searchWord, setSearchWord] = useState('');

  // 네이버 데이터 state
  const [data, setData] = useState<any[]>([]);

  // 검색해서 선택한 제품 state
  const [list, setList] = useState<any[]>([]);

  /**
   * 인풋창에 작성할 때 딜레이가 안 되게끔 하는 함수
   */
  const inputSearchWord = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchWord(e.target.value);
    },
    [searchWord],
  );

  /**
   * pages/api/datas vpd로 우회해서 네이버 오픈 api 데이터 get해오는 함수
   */
  const getNaverData = async () => {
    const response = await axios
      .get('http://localhost:3000/api/naverData', {
        params: {
          query: searchWord,
        },
      })
      .then((response) => setData(response.data))
      .catch((Error) => console.log(Error));
  };

  // console.log(data);

  const selectProduct = (item: any) => {
    const newList = [...list, item];
    setList(newList);

    const changeJson = JSON.stringify(newList);
    const saveLocalStorage = localStorage.setItem('products', changeJson);
  };

  // 선택한 제품 삭제하기
  const deleteProduct = (item: any) => {
    const deletedList = list;
    setList(deletedList.filter((i) => i.productId !== item.productId));

    // 로컬스토리지에서 선택한 제품 삭제하기(아직 작업중)
    let index = 0;
    let product = JSON.parse(localStorage.getItem('products') || '[]');
    product.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(product));
  };

  const submitProduct = () => {
    console.log('gg');
  };

  return (
    <DetailWriteSearchModal onClose={props.onClose}>
      <DetailWriteSearchLayout>
        <DetailWriteSearchBoxTop>
          <DetailWriteSearchBox>
            <div>
              <span className="search">검색하기</span>
              <span className="search">직접 등록하기</span>
            </div>
            <button className="closeBtn" onClick={props.onClose}>
              <img className="closeBtnImage" src={close.src} />
            </button>
          </DetailWriteSearchBox>
          <span>제품을 검색해주세요</span>
          <div>
            <input
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
                {item.title.split('<b>').join('').split('</b>').join('')}
                {item.category2}
              </div>
            </DetailWriteSearchProductBox>
          ))}
        </div>
        <DetailWriteSearchBoxBottom>
          {list.map((item) => (
            <div>
              {item.title.split('<b>').join('').split('</b>').join('')}
              <button onClick={() => deleteProduct(item)}>삭제</button>
            </div>
          ))}
          <button onClick={props.onClose}>닫기</button>
          <button onClick={submitProduct}>등록하기</button>
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

export default DetailWriteSearch;
