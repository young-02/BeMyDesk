import { updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { app, auth, dbService } from '@/shared/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

function ChangeProfile({ user }: any) {
  const [profileChangeDone, setProfileChangeDone] = useState(false);
  const [nickNameEditEnable, setNickNameEditEnable] = useState(true);
  const [nickNameEdit, setNickNameEdit] = useState(user.displayName);
  const [countCharacters, setCountCharacters] = useState(0);
  const [Characters, setCharacters] = useState('');

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
  const nickNameEditonChangeHandler = function (event: any) {
    const inputText = event.target.value;

    if (!inputText) {
      setNickNameEdit(user.displayName);
    } else {
      setNickNameEdit(inputText);
    }
  };
  // 수정 버튼
  const profileChangeConfirmButtonHandler = function () {
    const regex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$/;
    if (regex.test(nickNameEdit)) {
      updateProfile(auth.currentUser as any, {
        displayName: nickNameEdit,
      });
      setProfileChangeDone(true);

      const collectionRef = doc(dbService, `userInfo/${user.uid}`);
      const payload = {
        userId: user.uid,
        // 스크랩한 글번호
        // 팔로잉한 사람 UID
        introduction: Characters,
      };

      setDoc(collectionRef, payload)
        .then(() => {
          setCharacters('');
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert(
        '닉네임은 특수문자를 포함할수 없고 2글자 이상 8자이하이어야합니다.',
      );
    }
  };
  return (
    <div className="ProfileEdit">
      <div>닉네임</div>
      <input
        type="text"
        placeholder={user.displayName}
        disabled={nickNameEditEnable}
        onChange={nickNameEditonChangeHandler}
      />
      <button
        onClick={() => {
          setNickNameEditEnable(!nickNameEditEnable);
        }}
      >
        닉네임수정
      </button>
      <br />
      <br />
      <div>프로필소개</div>
      <input
        type="text"
        placeholder="프로필 소개 들어감"
        onChange={countOnChangeHandler}
        value={Characters}
      />
      <p>{countCharacters}/50</p>
      <div>
        <p>
          {profileChangeDone
            ? '프로필 정보를 성공적으로 변경하였습니다.'
            : null}
        </p>
        <button onClick={profileChangeConfirmButtonHandler}>
          프로필 정보변경 적용하기
        </button>
      </div>
    </div>
  );
}

export default ChangeProfile;
