import { updateProfile } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { app, auth, dbService } from '@/shared/firebase';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';

function ChangeProfile({ user, profileData }: any) {
  //자기소개
  const [countCharacters, setCountCharacters] = useState(0);
  const [Characters, setCharacters] = useState(profileData?.introduction);
  //닉네임
  const [nickNameEdit, setNickNameEdit] = useState('');
  const [nicknameInputEnable, setNicknameInputEnable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  //적용완료
  const [profileChangeDone, setProfileChangeDone] = useState(false);
  //오류처리
  const [errorNickNameEmpty, setErrorNickNameEmpty] = useState(false);
  const [errorNickNameRegex, setErrorNickNameRegex] = useState(false);
  const [errorIntroductionEmpty, setErrorIntroductionEmpty] = useState(false);
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
  };

  // disable 상태인 닉네임 첫클릭
  const handleDivClick = () => {
    setNicknameInputEnable(true);
  };

  // 적용 버튼
  const profileChangeConfirmButtonHandler = function () {
    const regex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$/;
    const collectionRef = doc(dbService, `userInfo/${user.uid}`);

    // 1. 닉네임 활성화 여부
    // 2. 닉네임 유효성검사
    // 3. 자기소개 입력여부

    //1.닉네임 활성화 여부 - 활성화
    if (nicknameInputEnable) {
      //2. 닉네임 유효성검사 - 정상입력
      // 3. 자기소개 입력여부 - 입력완료
      if (regex.test(nickNameEdit) && Characters !== '') {
        updateProfile(auth.currentUser as any, {
          displayName: nickNameEdit,
        });
        const payload = {
          nickname: nickNameEdit,
          introduction: Characters,
        };
        updateDoc(collectionRef, payload)
          .then(() => {
            setProfileChangeDone(true);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // 3. 자기소개 입력여부 - 비어있음
        if (Characters == '') {
          setErrorIntroductionEmpty(true);
          // 2. 닉네임 유효성검사 regex 오류
          // 2. 닉네임 유효성검사 비어있음
          nickNameEdit === ''
            ? setErrorNickNameEmpty(true)
            : setErrorNickNameRegex(true);
        } else {
          // 2. 닉네임 유효성검사 regex 오류
          // 2. 닉네임 유효성검사 비어있음
          nickNameEdit === ''
            ? setErrorNickNameEmpty(true)
            : setErrorNickNameRegex(true);
        }
      }
    }
    // 1.닉네임 활성화 여부 - 비활성화
    else {
      // 3. 자기소개 입력여부 - 비어있음
      if (Characters !== '') {
        const payload = {
          introduction: Characters,
        };
        updateDoc(collectionRef, payload)
          .then(() => {
            setProfileChangeDone(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      //2.자기소개 비어있음
      else {
        //3. 오류처리
        setErrorIntroductionEmpty(true);
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

      <textarea
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
          <p>{errorIntroductionEmpty ? '자기소개를 입력해주세요' : null}</p>
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
