import Image from 'next/image';
import React from 'react';
import { useUpdateLikes } from '@/Hooks/useUpdateLikes';
import activeLikes from '../../../public/images/userReaction/activeLikes.png';
import inactiveLikes from '../../../public/images/userReaction/inactiveLikes.png';
import styled from 'styled-components';
import { HiOutlineTrash } from 'react-icons/hi';
import { deleteDoc, doc } from 'firebase/firestore';
import { dbService } from '@/shared/firebase';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

type Props = {};

const PostCard = ({ post, currentUserId }: any) => {
  const queryClient = useQueryClient();
  // 좋아요
  const { isLikesClicked, myPostMutate: updateLikes } = useUpdateLikes(
    currentUserId,
    post,
  );

  const deletePost = async () => {
    alert('삭제?');
    await deleteDoc(doc(dbService, `postData/${post.id}`));
    queryClient.invalidateQueries(['my-page', 'myPost']);
  };

  return (
    <StyledContainer key={post.id}>
      <StyledLeftDiv>
        {post.postImage1 ? (
          <Image
            src={post.postImage1}
            alt="postImage1"
            width={282}
            height={197}
            style={{ cursor: 'pointer' }}
            className="img"
          />
        ) : (
          <Image
            src="/images/noImage.png"
            alt="postImage1"
            width={282}
            height={197}
            style={{ cursor: 'pointer' }}
            className="img"
          />
        )}
      </StyledLeftDiv>
      <StyledRightDiv>
        <div className="firstLine">
          <p className="Title">{post.postTitle}</p>
          <Image src="" alt="" />
        </div>

        <div className="secondLine">
          <p className="Text">{post.postText}</p>
        </div>
        <div className="thirdLine">
          <div className="LikesDiv" onClick={() => updateLikes(post.id)}>
            <Image
              src={isLikesClicked ? activeLikes : inactiveLikes}
              alt="likes-icon"
              width={24}
            />
            <p className={isLikesClicked ? 'active' : 'inactive'}>
              {post.likesCount}
            </p>
          </div>
          <HiOutlineTrash className="deleteButton" onClick={deletePost} />
        </div>
      </StyledRightDiv>
    </StyledContainer>
  );
};

export default PostCard;

const StyledContainer = styled.div`
  display: flex;
  width: 894px;
  height: 197px;
  background: #ffffff;
  border: 1px solid #868e96;
  border-radius: 10px;
  margin-bottom: 28px;
`;

const StyledLeftDiv = styled.div`
  .img {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`;
const StyledRightDiv = styled.div`
  padding: 20px;

  .firstLine {
    width: 500px;
    height: 30px;
    margin-bottom: 20px;
    overflow: hidden;

    .Title {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      color: #17171c;
    }
  }
  .secondLine {
    width: 572px;
    height: 58.12px;
    overflow: hidden;

    .Text {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #17171c;
    }
  }
  .thirdLine {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .LikesDiv {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #868e96;
      gap: 0.625rem;
      cursor: pointer;
      }
    }
    .deleteButton {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
`;
