import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function ProfileEditModal({ setProfileEditModalOpen, user }: any) {
  const [nickNameEditEnable, setNickNameEditEnable] = useState(true);
  const [nickNameEdit, setNickNameEdit] = useState('');
  const [countCharacters, setCountCharacters] = useState(0);
  const [Characters, setCharacters] = useState('');

  const countOnChangeHandler = function (event: any) {
    const inputText = event.target.value;
    const inputLength = inputText.length;

    if (countCharacters < 50) {
      setCharacters(inputText);
      setCountCharacters(inputLength);
    } else {
      alert('자기소개는 50자를 초과할 수 없습니다.');
      const truncated = inputText.substring(0, inputLength - 2);
      setCharacters(truncated);
      setCountCharacters(truncated.length);
    }
  };

  const nickNameEditHandler = function (event: any) {
    setNickNameEditEnable(!nickNameEditEnable);
  };

  const nickNameEditonChangeHandler = function (event: any) {
    const inputText = event.target.value;
    if (!inputText) {
      setNickNameEdit(user.displayName);
    } else {
      setNickNameEdit(inputText);
    }
  };

  return (
    <StyledEditProfileModalContainer>
      <div
        className="modal-overlay"
        onClick={() => setProfileEditModalOpen(false)}
      />
      <div className="modal-content">
        <div className="left-continer">
          <div>
            {' '}
            <img
              src={user.photoURL}
              alt="ProfileImage"
              width={202}
              height={202}
            />
          </div>
          <div>
            <ul>
              <li> 프로필 정보 설정</li>
              <li>비밀번호 변경</li>
            </ul>
          </div>
        </div>
        <div className="right-continer">
          <div>
            <p>프로필 정보 설정</p>
            <button
              className="modal-close"
              onClick={() => setProfileEditModalOpen(false)}
            >
              X
            </button>
          </div>
          <div>닉네임</div>

          <input
            type="text"
            placeholder={user.displayName}
            disabled={nickNameEditEnable}
            onChange={nickNameEditonChangeHandler}
            value={nickNameEdit}
          />
          <button onClick={nickNameEditHandler}>닉네임수정</button>
          <div>프로필소개</div>
          <input
            type="text"
            placeholder="프로필 소개 들어감"
            onChange={countOnChangeHandler}
            value={Characters}
          />
          <p>{countCharacters}/50</p>
          <p> 프로필 정보를 성공적으로 변경하였습니다.</p>
          <button>적용하기</button>
        </div>
      </div>
    </StyledEditProfileModalContainer>
  );
}

export default ProfileEditModal;

const StyledEditProfileModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    display: flex;
    justify-content: space-between;
    z-index: 101;
    width: 792px;
    height: 640px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    div {
      border: 1px solid black;
    }
  }

  .modal-close {
    font-size: 24px;
    line-height: 1;
    background: #17171c;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
