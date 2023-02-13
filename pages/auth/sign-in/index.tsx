import { app, auth } from '@/shared/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Props = {};

export default function SignIn({}: Props) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const handleEmail = function (event: any) {
    setEmail(event.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(event.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const handlePw = function (event: any) {
    setPw(event.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(event.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const signUpButtonHandler = function () {
    // router("/signup");
  };

  const onClickConfirmButton = () => {
    signInWithEmailAndPassword(auth, email, pw)
      .then(() => {
        alert('로그인 성공');
        console.log('login sucess', auth.currentUser);
        // router("/");
      })
      .catch((error) => {
        alert('로그인실패');
        console.log('login error log', error);
      });
  };

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  return (
    <div className="page">
      <div className="titleWrap">로그인</div>
      <div className="contentWrap">
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="Bemydesk@gmail.com"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div>
          {!emailValid && email.length > 0 && (
            <div className="errorMessageWrap">
              올바른 이메일을 입력해주세요.
            </div>
          )}
        </div>

        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="
비밀번호를 입력해주세요"
            value={pw}
            onChange={handlePw}
          />
        </div>
        <div>
          {!pwValid && pw.length > 0 && (
            <div className="errorMessageWrap">
              영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
            </div>
          )}
        </div>
      </div>

      <div>
        <button
          onClick={onClickConfirmButton}
          disabled={notAllow}
          className="bottomButton"
        >
          로그인
        </button>
      </div>
      <label>
        <input type="checkbox" />
        <p>로그인 유지</p>
      </label>
      <Link href="./find-password">비밀번호 찾기</Link>
      <div style={{ border: '1px solid black' }}>
        <p> SNS로 시작하기</p>
        <div>카카오톡 구글 네이버 페이스북</div>
      </div>
      <div>
        {/* <button onClick={signUpButtonHandler}>아이디가 없으신가요?</button> */}
        <Link href="./sign-up">아이디가 없으신가요?</Link>
      </div>
    </div>
  );
}
