import React, { Children } from 'react';
import styled from 'styled-components';

type Props = {};

export default function Skeleton({ children }: Props) {
  return <SkeletonLayout>{children}</SkeletonLayout>;
}

const SkeletonLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  .animate-pulse {
    animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .skeleton {
    background-color: rgb(227, 227, 227);
  }
`;

export const ImgLayout = styled.div`
  width: 100%;
  height: 100%;
`;

export const Layout35 = styled.div`
  width: 35%;
  height: 0.75rem;
  border-radius: 8px;
`;

export const Layout50 = styled.div`
  width: 50%;
  height: 1rem;
  border-radius: 8px;
`;
export const Layout80 = styled.div`
  width: 80%;
  height: 0.75rem;
  border-radius: 0.5rem;
`;
