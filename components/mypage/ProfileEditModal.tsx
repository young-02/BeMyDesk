import { app, auth } from '@/shared/firebase';
import { updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function ProfileEditModal({ setProfileEditModalOpen, user }: any) {
  const [toggleEditMenu, setToggleEditMenu] = useState(true);
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

  const confirmButtonHandler = function () {
    const regex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$/;
    if (regex.test(nickNameEdit)) {
      updateProfile(auth.currentUser as any, {
        displayName: nickNameEdit,
      });
    } else {
      alert(
        '닉네임은 특수문자를 포함할수 없고 2글자 이상 8자이하이어야합니다.',
      );
    }
  };

  // const confirmButtonHandler = function () {
  //   const regex =
  //     /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  //   if (regex.test(nickNameEdit)) {
  //     updateProfile(auth.currentUser as any, {
  //       displayName: nickNameEdit,
  //     });
  //   } else {
  //     alert(
  //       '비밀번호는 8~16자리 / 영문 대소문자, 숫자, 특수문자 포함이어야합니다.',
  //     );
  //   }
  // };
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
            <button onClick={() => setToggleEditMenu(true)}>
              프로필 정보 설정
            </button>
            <button onClick={() => setToggleEditMenu(false)}>
              비밀번호 변경
            </button>
          </div>
        </div>
        <div className="right-continer">
          <div>
            <p>{toggleEditMenu ? '프로필 정보 설정' : '비밀번호 변경'}</p>
            <button
              className="modal-close"
              onClick={() => setProfileEditModalOpen(false)}
            >
              X
            </button>
          </div>

          {toggleEditMenu ? (
            <div className="ProfileEdit">
              <div>닉네임</div>
              <input
                type="text"
                placeholder={user.displayName}
                disabled={nickNameEditEnable}
                onChange={nickNameEditonChangeHandler}
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
              <div>
                {' '}
                <p> 프로필 정보를 성공적으로 변경하였습니다.</p>
                <button onClick={confirmButtonHandler}>적용하기</button>
              </div>
            </div>
          ) : (
            <div className="PasswordEdit">
              <div>
                <p>현재 비밀번호</p>
                <input type="text" />
              </div>
              <div>
                <p>변경할 비밀번호</p>
                <input type="text" />
              </div>
              <div>
                <p>한번 더 입력해주세요 </p>
                <input type="text" />
              </div>
              <div>
                <p> 프로필 정보를 성공적으로 변경하였습니다.</p>
                <button onClick={confirmButtonHandler}>적용하기</button>
              </div>
            </div>
          )}
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
