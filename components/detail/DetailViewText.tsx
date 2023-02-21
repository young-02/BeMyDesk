import React from 'react';
import styled from 'styled-components';

type Props = {};

export default function DetailViewText({ detail }: Props) {
  return (
    <>
      <DetailViewTextLayout>
        <div className="detail-view-title">{detail.postTitle}</div>
        <div className="detail-view-text">{detail.postText}</div>
      </DetailViewTextLayout>
      <ShareLayout>
        <div className="share">공유</div>
        <ul className="sns">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </ShareLayout>
    </>
  );
}

const DetailViewTextLayout = styled.div`
  margin-top: 1.25rem;

  .detail-view-title {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }

  .detail-view-text {
    margin: 1.25rem 0;
    font-size: 1.125rem;
    line-height: 1.5rem;
    color: #343a40;
  }
`;

const ShareLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;

  .share {
    padding: 20px;
    cursor: point;
  }
  .sns {
    position: absolute;
    right: 0;
    bottom: 0;

    display: flex;
  }
`;
