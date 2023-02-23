import { useState } from 'react';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';

const ChangePassword = ({ user }: any) => {
  // 비밀번호 인풋
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // 현재 비밀번호 에러처리
  const [errorCurrentPasswordEmpty, setErrorCurrentPasswordEmpty] =
    useState(false);
  const [errorCurrentPasswordVerify, setErrorCurrentPasswordVerify] =
    useState(false);
  // 변경할 비밀번호 에러처리
  const [errorNewPasswordEmpty, setErrorNewPasswordEmpty] = useState(false);
  const [errorNewPasswordVerify, setErrorNewPasswordVerify] = useState(false);
  // 한번 더 입력해주세요 에러 처리
  const [errorPasswordConfirmationEmpty, setErrorPasswordConfirmationEmpty] =
    useState(false);
  const [errorPasswordConfirmationVerify, setErrorPasswordConfirmationVerify] =
    useState(false);

  const [allDone, setAllDone] = useState(false);

  // 비밀번호 변경 버튼
  const handlePasswordChange = async () => {
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    // 빈칸검증
    if (
      currentPassword == '' &&
      newPassword == '' &&
      passwordConfirmation == ''
    ) {
      {
        currentPassword == '' ? setErrorCurrentPasswordEmpty(true) : null;
      }
      {
        newPassword == '' ? setErrorNewPasswordEmpty(true) : null;
      }
      {
        passwordConfirmation == ''
          ? setErrorPasswordConfirmationEmpty(true)
          : null;
      }
      // 변경할 비밀번호 regex
    } else if (!regex.test(newPassword)) {
      setErrorNewPasswordVerify(true);
      // new패스워드 == new패스워드컨펌부분
    } else if (newPassword !== passwordConfirmation) {
      setErrorPasswordConfirmationVerify(true);
    } else {
      // 현재 비밀번호 유효성 검사
      const credential = await EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );

      await reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword);
        })
        .then(() => {
          console.log('비밀번호 변경 완료');
          setAllDone(true);
        })
        .catch((error: any) => {
          console.error(error);
          setErrorCurrentPasswordVerify(true);
        });
    }
  };

  return (
    <div>
      <h1>비밀번호 변경</h1>
      <div>
        <label htmlFor="currentPassword">현재 비밀번호</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">변경할 비밀번호</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPasswordVerify">한번 더 입력해주세요</label>
        <input
          type="password"
          id="newPasswordVerify"
          value={passwordConfirmation}
          onChange={(event) => {
            setPasswordConfirmation(event.target.value);
          }}
        />
      </div>
      <div>
        <h3>에러메세지테스트</h3>
        <div>
          <p>
            {errorCurrentPasswordEmpty
              ? '(현재 비밀번호)필수입력사항입니다'
              : null}
          </p>
          <p>
            {errorNewPasswordEmpty
              ? '(새로운 비밀번호)필수입력사항입니다'
              : null}
          </p>
          <p>
            {errorPasswordConfirmationEmpty
              ? '(새로운 비밀번호 한번더 확인)필수입력사항입니다'
              : null}
          </p>
        </div>
        <div>
          <p>
            {errorNewPasswordVerify
              ? '비밀번호 양식을 다시 확인해주세요'
              : null}
          </p>
        </div>
        <div>
          <p>
            {errorPasswordConfirmationVerify
              ? '(새로운비밀번호+한번더확인)비밀번호가 다릅니다'
              : null}
          </p>
        </div>
        <div>
          <p>
            {errorCurrentPasswordVerify ? '현재 비밀번호를 확인해주세요' : null}
          </p>
        </div>
        <div>
          <p>{allDone ? '적용완료!' : null}</p>
        </div>
      </div>
      <button onClick={handlePasswordChange}>적용</button>
    </div>
  );
};

export default ChangePassword;
