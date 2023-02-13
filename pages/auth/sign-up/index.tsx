import { auth } from '@/shared/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Props = {};

export default function SignUp({}: Props) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwVerfy, setPwVerfy] = useState('');
  const [nickname, setNickname] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwVerfyValid, setPwVerfyValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

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

  const handleVerfyPw = function (event: any) {
    setPwVerfy(event.target.value);
    if (pw === event.target.value) {
      setPwVerfyValid(true);
    } else {
      setPwVerfyValid(false);
    }
  };

  const handleNickname = function (event: any) {
    setNickname(event.target.value);
    const regex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$/;
    if (regex.test(event.target.value)) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  };

  const onClickConfirmButton = () => {
    createUserWithEmailAndPassword(auth, email, pw).then((data: any) => {
      const remainInfo = {
        email: email,
        displayName: nickname,
        photoURL:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png?20220226140232',
      };

      updateProfile(data.user, remainInfo);
    });
    alert('회원가입 성공');
    // router("/");
  };

  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);

  useEffect(() => {
    if (
      emailValid &&
      pwValid &&
      nicknameValid &&
      pwVerfyValid &&
      ageCheck &&
      useCheck
    ) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [emailValid, pwValid, nicknameValid, pwVerfyValid, ageCheck, useCheck]);

  return (
    <div className="page">
      <div className="titleWrap">회원가입</div>
      <div className="contentWrap">
        <div style={{ marginTop: '26px' }} className="inputTitle">
          닉네임
        </div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="잠은죽어서잔다
"
            value={nickname}
            onChange={handleNickname}
          />
        </div>
        <div>
          {!nicknameValid && nickname.length > 0 && (
            <div className="errorMessageWrap">
              닉네임은 특수문자를 포함할수 없고 2글자 이상 8자 이하이어야합니다.
            </div>
          )}
        </div>
        <div className="inputTitle">이메일</div>
        <div style={{ border: '1px solid black' }}>
          <div className="inputWrap">
            <input
              type="text"
              className="input"
              placeholder="이메일"
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
          @
          <div className="inputWrap">
            <input type="text" className="input" placeholder="이메일뒤(임시)" />
          </div>
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="비밀번호를 입력해주세요"
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

        <div style={{ marginTop: '26px' }} className="inputTitle">
          비밀번호 확인
        </div>
        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleVerfyPw}
          />
        </div>
        <div>
          {!pwVerfyValid && pwVerfy.length > 0 && (
            <div className="errorMessageWrap">비밀번호가 다릅니다.</div>
          )}
        </div>
      </div>

      <div>
        <div>
          <div>
            <input
              type="checkbox"
              id="all-check"
              checked={allCheck}
              onChange={allBtnEvent}
            />
            <label htmlFor="all-check">전체동의</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="check1"
              checked={ageCheck}
              onChange={ageBtnEvent}
            />
            <label htmlFor="check1">
              만 14세 이상입니다 <span>(필수)</span>
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="check2"
              checked={useCheck}
              onChange={useBtnEvent}
            />
            <label htmlFor="check2">
              개인정보 수집/이용에 동의합니다. <span>(필수)</span>
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="check3"
              checked={marketingCheck}
              onChange={marketingBtnEvent}
            />
            <label htmlFor="check3">
              마케팅동의 <span>(선택)</span>
            </label>
          </div>
        </div>

        <div>
          <button
            onClick={onClickConfirmButton}
            disabled={notAllow}
            className="bottomButton"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
