import { useState } from 'react';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';

const ChangePassword = ({ user }: any) => {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPasswordVerfyInput, setNewPasswordVerifyInput] = useState('');
  const [nowPasswordVerfy, setNowPasswordVerfy] = useState(false);
  const [passwordVerfyValid, setPasswordVerfyValid] = useState(true);
  const [allDone, setAllDone] = useState(false);

  // 비밀번호 변경 버튼
  const handlePasswordChange = async () => {
    if (newPassword === newPasswordVerfyInput) {
      await setPasswordVerfyValid(true);
      const credential = await EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      console.log(user);

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
          console.log('현재 비밀번호를 확인하세요');
          setNowPasswordVerfy(true);
        });
    } else {
      setPasswordVerfyValid(false);
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
          value={newPasswordVerfyInput}
          onChange={(event) => {
            setNewPasswordVerifyInput(event.target.value);
          }}
        />
      </div>
      <div>
        <h3>에러메세지테스트</h3>
        <p>
          {passwordVerfyValid
            ? null
            : 'false 패스워드를확인해주세요(한번더 입력부분)'}
        </p>
        <p>{allDone ? '비밀번호 변경완료' : null}</p>
        <p>{nowPasswordVerfy ? '현재 비밀번호를 확인해주세요' : null}</p>
      </div>
      <button onClick={handlePasswordChange}>적용</button>
    </div>
  );
};

export default ChangePassword;
