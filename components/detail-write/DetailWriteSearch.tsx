import { get } from 'https';
import React, { use, useCallback, useEffect, useState } from 'react';
import DetailWriteSearchModal from './DetailWriteSearchModal';

type Props = {};

const DetailWriteSearch = (props: any) => {
  const [searchWord, setSearchWord] = useState('');

  const inputSearchWord = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchWord(e.target.value);
      console.log(searchWord);
    },
    [searchWord],
  );

  const getShoppingData = async () => {
    const client_id = 'vun5DYOIJXXPYvRe_UWV';
    const client_secret = 'XS7vVsF5av';
    const res = await fetch(
      `v1/search/shop?query=python&display=3&sort=count`,
      {
        headers: {
          'X-Naver-Client-Id': client_id,
          'X-Naver-Client-Secret': client_secret,
        },
      },
    )
      .then((res) => console.log(res))
      .catch((Error) => console.log(Error, '에러임'));
  };

  return (
    <DetailWriteSearchModal onClose={props.onClose}>
      <div>
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchWord}
          onChange={inputSearchWord}
        />
        <button onClick={getShoppingData}>검색</button>
        <button onClick={props.onClose}>X</button>
      </div>
    </DetailWriteSearchModal>
  );
};

export default DetailWriteSearch;
