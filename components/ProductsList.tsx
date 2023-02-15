import React from 'react';
import { collection } from 'firebase/firestore';
import { dbService } from '../shared/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';

type Props = {};

const ProductsList = ({ postId }: { postId: string }) => {
  // 하위 컬렉션 - comments 에서 가져오기
  const query = collection(dbService, `postData/${postId}/products`);
  const [data, loading, error] = useCollectionData(query);
  // console.log('readProductsData', data);

  return (
    <ProductsListLayout>
      {loading && 'Loading...'}
      <ul>
        {data?.map((product) => (
          <ListItem key={product.id}>
            <li>{product.id}</li>
            <li>{product.title}</li>
            <li>{product.hashTag}</li>
          </ListItem>
        ))}
      </ul>
    </ProductsListLayout>
  );
};

export default ProductsList;

const ProductsListLayout = styled.div``;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #d0d9df;
`;
