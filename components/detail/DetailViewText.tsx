import React, { useEffect, useState } from 'react';
import { FacebookShareButton } from 'react-share';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGetKakao } from '../Hooks/useGetKakao';
import ReactHtmlParser from 'html-react-parser';
type Props = {};

export default function DetailViewText({ detail }) {
  const [socialSharing, setSocialSharing] = useState(false);

  const clickToShare = () => {
    setSocialSharing((prev) => !prev);
  };
  const currentUrl = window.location.href;

  const status = useGetKakao('https://developers.kakao.com/sdk/js/kakao.js');
  useEffect(() => {
    if (status === 'ready' && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        window.Kakao.init('a81b3af974c17b5fc4088249f10e7f77');
      }
    }
  }, [status]);

  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
    });
  };

  return (
    <>
      <DetailViewTextLayout>
        <div className="detail-view-title">{detail.postTitle}</div>
        <div className="detail-view-text">
          {ReactHtmlParser(detail.postText)}
        </div>
      </DetailViewTextLayout>
      <ShareLayout>
        <div className="share" onClick={clickToShare}>
          공유
        </div>
        {socialSharing && (
          <ul className="sns">
            <li className="sns-icon kakao" onClick={handleKakaoButton}>
              kakao
            </li>
            <FacebookShareButton url={currentUrl}>
              <li className="sns-icon facebook">facebook</li>
            </FacebookShareButton>
            <CopyToClipboard text={currentUrl}>
              <li className="sns-icon link">link</li>
            </CopyToClipboard>
          </ul>
        )}
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
  padding: 1rem;

  .share {
    display: block;
    width: 28px;
    height: 28px;
    background: url('/images/sprite_icon.png');
    background-position: -108px 0;
    cursor: pointer;
    text-indent: -999999%;
  }

  .sns {
    position: absolute;
    right: -4%;
    bottom: -3.125rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.625rem;
    width: 7.75rem;
    height: 3.5rem;
    background: url('/images/snsWrapper.png') no-repeat center;
    border-radius: 0.625rem;

    .sns-icon {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      width: 1.875rem;
      height: 1.875rem;
      text-indent: -999999%;
      background: url('/images/sprite_icon.png') no-repeat center;
      cursor: pointer;

      &.kakao {
        background-position: -2.125rem 0.0625rem;
      }
      &.facebook {
        background-position: 0 0.0625rem;
      }
      &.link {
        background-position: -72px 0.0625rem;
      }
    }
  }
`;
