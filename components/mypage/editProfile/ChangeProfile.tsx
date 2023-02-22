import { updateProfile } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { app, auth, dbService } from '@/shared/firebase';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';

function ChangeProfile({ user }: any) {
  //적용버튼
  const [profileChangeDone, setProfileChangeDone] = useState(false);
  //자기소개
  const [countCharacters, setCountCharacters] = useState(0);
  const [Characters, setCharacters] = useState('');
  //닉네임
  const [nickNameEdit, setNickNameEdit] = useState('');
  const [nicknameInputEnable, setNicknameInputEnable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  //오류처리
  const [errorNickNameEmpty, setErrorNickNameEmpty] = useState(false);
  const [errorNickNameRegex, setErrorNickNameRegex] = useState(false);
  //자기소개 글자수 세기
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
  // 닉네임 onChange
  const nickNameEditonChangeHandler = function (
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const inputText = event.target.value;
    setNickNameEdit(inputText);
    // if (!inputText) {
    //   setNickNameEdit(user.displayName);
    //   setErrorNickNameEmpty(true);
    // } else {
    //   setNickNameEdit(inputText);
    // }
  };

  // disable 상태인 닉네임 첫클릭
  const handleDivClick = () => {
    setNicknameInputEnable(true);
  };

  // 적용 버튼

  const profileChangeConfirmButtonHandler = function () {
    const regex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$/;

    if (nicknameInputEnable) {
      //regex 통과시 닉네임 업데이트
      if (regex.test(nickNameEdit)) {
        updateProfile(auth.currentUser as any, {
          displayName: nickNameEdit,
        });
        setProfileChangeDone(true);
        // 자기소개가 들어있을때만 업데이트되게하기
        if (Characters !== '') {
          const collectionRef = doc(dbService, `userInfo/${user.uid}`);
          const payload = {
            userId: user.uid,
            // 스크랩한 글번호
            // 팔로잉한 사람 UID
            introduction: Characters,
          };

          updateDoc(collectionRef, payload)
            .then(() => {
              setCharacters('');
              setNickNameEdit(user.displayName);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else {
        {
          nickNameEdit === ''
            ? setErrorNickNameEmpty(true)
            : setErrorNickNameRegex(true);
        }
      }
    } else {
      if (Characters !== '') {
        const collectionRef = doc(dbService, `userInfo/${user.uid}`);
        const payload = {
          userId: user.uid,
          // 스크랩한 글번호
          // 팔로잉한 사람 UID
          introduction: Characters,
        };

        updateDoc(collectionRef, payload)
          .then(() => {
            setNickNameEdit(user.displayName);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  // input창 enable시 자동 focus
  useEffect(() => {
    if (nicknameInputEnable && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [nicknameInputEnable, inputRef]);
  return (
    <ProfileEdit>
      <div>닉네임</div>
      <div onClick={handleDivClick}>
        <input
          className="inputNickname"
          type="text"
          placeholder={
            !nicknameInputEnable ? user.displayName : '닉네임을 입력하세요'
          }
          disabled={!nicknameInputEnable}
          onChange={nickNameEditonChangeHandler}
          ref={inputRef}
        />
      </div>

      <br />
      <br />
      <div>프로필소개</div>
      {/* <input
        type="text"
        placeholder="프로필 소개 들어감"
        onChange={countOnChangeHandler}
        value={Characters}
        style={{ height: '3em' }}
      /> */}
      <textarea
        placeholder="프로필 소개 들어감"
        onChange={countOnChangeHandler}
        value={Characters}
        style={{ height: '3em' }}
        rows={3}
      />
      <p>{countCharacters}/50</p>
      <div>
        <div>
          <h3>에러메세지</h3>
          <p>
            {profileChangeDone
              ? '프로필 정보를 성공적으로 변경하였습니다.'
              : null}
          </p>
          <p>
            {errorNickNameRegex ? '닉네임 양식을 확인해주세요 2~8자' : null}
          </p>
          <p>{errorNickNameEmpty ? '(닉네임)필수 입력사항입니다' : null}</p>
        </div>
        <button onClick={profileChangeConfirmButtonHandler}>
          프로필 정보변경 적용하기
        </button>
      </div>
    </ProfileEdit>
  );
}
const ProfileEdit = styled.div`
  .inputNickname {
    /* Pretendard Medium 18 */

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    /* identical to box height, or 111% */

    /* Gray 09 */

    color: #17171c;
  }

  .inputNickname:focus-within {
    border-bottom: 5px solid #206efb;
    .inputIcon {
      color: #206efb;
    }
  }
`;

export default ChangeProfile;
