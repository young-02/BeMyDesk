import CustomButton from '@/components/ui/CustomButton';
import CustomError from '@/components/ui/error/CustomError';
import HeadSeo from '@/components/ui/HeadSeo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

type Props = {};

export default function Error404() {
  const route = useRouter();

  return (
    <CustomError subtitle="404 ERROR" title="앗! 페이지를 찾을 수가 없어요">
       <div>
        <p>존재하지 않는 주소를 입력하셨거나,</p>
        <p>요청하신 페이지의 주소가 변경, 삭제가 되었나 봐요</p>
      </div>
      <div className="button-wrap">
        <CustomButton
          backgroundColor="#fff"
          paddingRow="2.125"
          paddingColumns=".625"
          onClick={() => {
            route.push('/main');
          }}
          border="1px solid"
          borderRadius=".625"
          fontWeight="700"
          color="#206EFB"
        >
          메인으로
        </CustomButton>
        <CustomButton
          backgroundColor="#206EFB"
          paddingRow="2.125"
          paddingColumns=".625"
          onClick={() => {
            history.back();
          }}
          fontColor="#000"
          border="1px solid"
          borderRadius=".625"
          fontWeight="700"
          color="#fff"
        >
          이전으로
        </CustomButton>
      </div>
    </CustomError>
  );
}

const Error404Layout = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  @media (max-width: 690px) {
    padding: 0 1.25rem;
  }

  > p {
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
