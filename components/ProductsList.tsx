import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { dbService } from '../shared/firebase';
import styled from 'styled-components';

type Props = {};

const ProductsList = ({ postId }: { postId: string }) => {
  const [data, setData] = useState();
  const productsRef = collection(dbService, `postData/${postId}/products`);

  useEffect(() => {
    onSnapshot(productsRef, (snapshot) => {
      const productData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(productData);
    });
  }, []);

  return (
    <ProductsListLayout>
      {/* {loading && 'Loading...'} */}
      <ul>
        {data?.map((product) => (
          <ListItem key={product.id}>
            <li>{product.id}</li>
            <li>제품명 : {product.title}</li>
            <li>카테고리 : {product.hashTag}</li>
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
