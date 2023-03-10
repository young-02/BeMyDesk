import CustomButton from '@/components/ui/CustomButton';
import HeadSeo from '@/components/ui/HeadSeo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

type Props = {};

export default function CustomError({
  title,
  subtitle,
  children,
  errorMessage,
}) {
  const route = useRouter();

  return (
    <Error404Layout>
      <HeadSeo title={'404 | 페이지를 찾을 수 없습니다.'} />
      <p>{subtitle}</p>
      <div className="image-wrap">
        <Image
          src="/images/error_icon.jpg"
          layout="fill"
          object-fit="cover"
          alt="error_icon"
        />
      </div>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <h2>{title}</h2>
      {children}
    </Error404Layout>
  );
}

const Error404Layout = styled.section`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  @media (max-width: 690px) {
    padding: 0 1.25rem;
  }

  p {
    color: #868e96;
    line-height: 1.3;

    &:first-child {
      font-weight: 500;
    }

    @media (max-width: 690px) {
      font-size: 0.875rem;
    }
  }

  > h2 {
    color: #495057;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.625rem;

    @media (max-width: 690px) {
      font-size: 1.125rem;
    }
  }
  .image-wrap {
    position: relative;
    width: 10.25rem;
    height: 10.25rem;

    @media (max-width: 690px) {
     width:7.5rem;
     height:7.5rem;
    }
  }

  .button-wrap {
    display: flex;
    margin-top: 3.75rem;
    gap: 1.25rem;

    @media (max-width: 690px) {
      margin-top: 2.125rem;
    }
  }
`;

const ErrorMessage = styled.div`
  margin-bottom: 1rem;
  color: #f83e4b;
  font-size: 1.5rem;
  font-weight: 700;

  @media (max-width: 690px) {
    font-size: 1rem;
    margin-bottom: .75rem;
  }
`;
