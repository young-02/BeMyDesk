import { auth, dbService } from '@/shared/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import useGetReaction from '../../../Hooks/useGetReaction';
import useCheckUser from '@/Hooks/useCheckUser';
import { setAmplitudeUserId } from '@/amplitude/amplitude';
type Props = {};

export default function SignIn({}: Props) {
  // 유저 상태 체크
  useCheckUser();

  const router = useRouter();
  // const emailRef = useRef<HTMLInputElement>(null);
  // const pwRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const [emailRegexError, setEmailRegexError] = useState(false);
  const [pwRegexError, setPwRegexError] = useState(false);

  const [emailEmptyError, setEmailEmptyError] = useState(false);
  const [pwEmptyError, setPwEmptyError] = useState(false);
  const [stayLoginisChecked, setStayLoginIsChecked] = useState(false);

  // 로그인유지 버튼
  const handleRadioChange = (e: any) => {
    setStayLoginIsChecked(e.target.checked);
  };
  // 이메일 유효성검사
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
  // 비밀번호 유효성검사
  const handlePw = function (event: any) {
    setPw(event.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (regex.test(event.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  // 이메일 온포커스, 온블러 동작
  function handleEmailInputClick() {
    setEmailEmptyError(false);
    setEmailRegexError(false);
  }
  // 비밀번호 온포커스, 온블러 동작
  function handlePwInputClick() {
    setPwEmptyError(false);
    setPwRegexError(false);
  }

  //로그인 버튼동작
  const onClickLoginButton = async () => {
    if (emailValid && pwValid) {
      await signInWithEmailAndPassword(auth, email, pw)
        .then((UserCredential) => {
          console.log('UserCredential', UserCredential.user.uid);
          setAmplitudeUserId(UserCredential.user.uid);
          alert('로그인 성공');

          router.push('/post-list');
        })
        .catch((error) => {
          console.log('error message: ', error.message);

          // 회원이 아니거나, 비밀번호가 틀린 경우
          if (error.message.includes('user-not-found')) {
            alert('일치하는 회원 정보가 없습니다');
          }
          if (error.message.includes('wrong-password')) {
            alert('비밀번호가 틀렸습니다.');
          }
        });
    } else {
      if (emailValid === false) {
        {
          email.length === 0
            ? setEmailEmptyError(true)
            : setEmailRegexError(true);
          pw.length === 0 ? setPwEmptyError(true) : null;
          // emailRef.current?.focus();
        }
      } else if (pwValid === false) {
        {
          pw.length === 0 ? setPwEmptyError(true) : setPwRegexError(true);
          email.length === 0 ? setEmailEmptyError(true) : null;
          // pwRef.current?.focus();
        }
      }
    }
  };

  //카카오 로그인
  const kakaoLogin = function () {
    window.Kakao?.Auth.login({
      scope: 'profile_nickname, account_email, profile_image',
      success: function (authObj: any) {
        //authObj 토큰
        console.log('authObj', authObj);
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res: any) => {
            // kakao_account 유저정보
            const kakao_account = res.kakao_account;
            console.log('kakao.account', kakao_account);
            router.push('/post-list');
          },
        });
      },
    });
    // const auth = getAuth();
    // signInWithCustomToken(auth, authObj)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ...
    //   });
  };

  //구글로그인
  const googleAuth = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result_google = await signInWithPopup(auth, googleAuth);
      const collectionRef = doc(dbService, `userInfo/${auth.currentUser?.uid}`);
      const docSnap = await getDoc(collectionRef);
      const isFirstLogin = !docSnap.exists();

      if (isFirstLogin) {
        await updateProfile(result_google.user, {
          photoURL: '/images/defaultProfile.png',
        });
        // const payload = {
        //   profileImage: '/images/defaultProfile.png',
        //   nickname: auth.currentUser?.displayName,
        //   userId: auth.currentUser?.uid,
        //   scraps: [],
        //   following: [],
        //   introduction: '안녕하세요!',
        // };

        // await setDoc(collectionRef, payload);

        router.push('/auth/sns-nickname');
      } else {
        router.push('/post-list');
      }
    } catch (error) {
      console.error(error);
    }
  };

  //페이스북 로그인
  const facebookAuth = new FacebookAuthProvider();
  const facebookLogin = async () => {
    try {
      const result_facebook = await signInWithPopup(auth, facebookAuth);
      const collectionRef = doc(dbService, `userInfo/${auth.currentUser?.uid}`);
      const docSnap = await getDoc(collectionRef);
      const isFirstLogin = !docSnap.exists();

      if (isFirstLogin) {
        await updateProfile(result_facebook.user, {
          photoURL: '/images/defaultProfile.png',
        });

        // const payload = {
        //   profileImage: '/images/defaultProfile.png',
        //   nickname: auth.currentUser?.displayName,
        //   userId: auth.currentUser?.uid,
        //   scraps: [],
        //   following: [],
        //   introduction: '안녕하세요!',
        // };

        // await setDoc(collectionRef, payload);

        router.push('/auth/sns-nickname');
      } else {
        router.push('/post-list');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   console.log('userInfo', auth?.currentUser);
  // }, [auth?.currentUser]);

  return (
    <StyledBackground>
      <StyledDiv>
        <div className="titleWrap">로그인</div>

        <div className="inputDiv">
          <label
            id="loginInput"
            className={`inputWrap ${
              emailEmptyError || emailRegexError ? 'inputWrap-error' : ''
            }`}
            onFocus={handleEmailInputClick}
            onBlur={handleEmailInputClick}
          >
            <span className="iconSpan">
              <AiOutlineMail className="inputIcon" />
            </span>
            <input
              // ref={emailRef}
              type="text"
              placeholder="이메일 주소를 입력해주세요"
              value={email}
              onChange={handleEmail}
            />
          </label>
          <div className="errorMessageWrapContainer">
            <div className="errorMessageWrap">
              {emailEmptyError && '필수 입력 항목입니다.'}
            </div>
            <div className="errorMessageWrap">
              {emailRegexError && '이메일 형식이 잘못됐습니다.'}{' '}
            </div>
          </div>
        </div>

        <div className="inputDiv">
          <label
            id="pwInput"
            className={`inputWrap ${
              pwEmptyError || pwRegexError ? 'inputWrap-error' : ''
            }`}
            onFocus={handlePwInputClick}
            onBlur={handlePwInputClick}
          >
            <span className="iconSpan">
              <AiFillLock className="inputIcon" />
            </span>
            <input
              // ref={pwRef}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={pw}
              onChange={handlePw}
            />
          </label>
          <div className="errorMessageWrapContainer">
            <div className="errorMessageWrap">
              {pwEmptyError && '필수 입력 항목입니다.'}
            </div>
            <div className="errorMessageWrap">
              {pwRegexError &&
                '비밀번호는 8~16자리 / 영문 대소문자, 숫자, 특수문자 포함이어야합니다.'}
            </div>
          </div>
        </div>
        <div className="LoginButtonWrap">
          <button onClick={onClickLoginButton} className="LoginButton">
            로그인
          </button>
        </div>

        <div className="buttonBottomWrap">
          <label className="stayLogin">
            <input
              className="stayLoginButton"
              type="checkbox"
              onChange={handleRadioChange}
            />
            <p>로그인 유지</p>
          </label>
          <Link href="./find-password" className="findPassword">
            비밀번호 찾기
          </Link>
        </div>
        <div className="SNSWrap">
          <p> SNS로 시작하기</p>
          <div className="SNSLoginContainer">
            {/* <div onClick={kakaoLogin}>
              {' '}
              <Image
                src="/images/kakaoLogo.png"
                alt="KakaoLogin"
                width={48}
                height={48}
              />
            </div> */}
            <div onClick={googleLogin}>
              <Image
                src="/images/googleLogo.png"
                alt="GoogleLogin"
                width={48}
                height={48}
              />
            </div>
            {/* <div>
              <Image
                src="/images/naverLogo.png"
                alt="NaverLogin"
                width={48}
                height={48}
              />
            </div> */}
            <div onClick={facebookLogin}>
              {' '}
              <Image
                src="/images/facebookLogo.png"
                alt="FacebookLogin"
                width={48}
                height={48}
              />
            </div>
          </div>
        </div>

        <div className="LinkSignUp">
          <Link href="./sign-up" className="LinkSignUpMessage">
            아이디가 없으신가요?
          </Link>
        </div>
      </StyledDiv>
    </StyledBackground>
  );
}

const StyledBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  background: url(https://images.pexels.com/photos/251225/pexels-photo-251225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)
    no-repeat center;
  background-size: cover;

  /* div {
    border: .0625rem solid black;
  } */
`;

const StyledDiv = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  width: 466px;
  height: 570px;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.29);
  border-radius: 20px;
  input {
    width: 100%;
    outline: none;
    border: none;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 111% */

    /* Gray 09 */

    color: #17171c;
  }
  .titleWrap {
    padding-top: 2.5rem;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    justify-content: center;
  }
  .inputDiv {
    padding: 0px 60px 0 60px;
  }
  #loginInput {
    margin: 30px 0 0 0;
  }
  .inputWrap {
    display: flex;
    padding: 25px 8px 0 8px;
    border-bottom: 2px solid #adb5bd;
    min-height: 60px;

    :hover {
      border-bottom: 2px solid #6d7379;
    }

    .iconSpan {
      margin-right: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .inputIcon {
        width: 24px;
        height: 20px;
      }
    }
  }

  .inputTitle {
    /* Pretendard Medium 18 */
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;

    color: #17171c;
  }

  .inputWrap:focus-within {
    border-bottom: 2px solid #206efb;
    .inputIcon {
      color: #206efb;
    }
  }

  .stayLogin {
    display: flex;
    align-items: center;
  }

  .stayLoginButton {
    margin: 0;
    margin-right: 10px;
    width: 12px;
    outline: none;
    border: none;
    height: 12px;
    font-size: 0.875rem;
    font-weight: 400;
  }

  .inputWrap-error {
    /* border: 0.0625rem solid red; */
    border-color: red;
  }
  .errorMessageWrapContainer {
    padding-top: 6px;
    padding-left: 5px;
    min-height: 18px;
  }
  .errorMessageWrap {
    color: #ef0000;
    font-size: 12px;
  }

  .LoginButtonWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1.5rem;
  }
  .LoginButton {
    width: 386px;
    height: 48px;
    border: none;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.25rem;
    background: #206efb;
    border-radius: 10px;
    color: white;
    margin-bottom: 16px;
    cursor: pointer;
    :hover {
      opacity: 90%;
    }
  }

  .buttonBottomWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 50px;
    p {
      /* Pretendard Medium 14 */

      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      /* or 143% */

      display: flex;
      align-items: center;

      /* Gray 06 */

      color: #495057;
    }
  }

  .findPassword {
    /* Pretendard Medium 14 */

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    /* or 143% */

    display: flex;
    align-items: center;
    text-align: right;

    /* Gray 06 */

    color: #495057;
    text-decoration: none;
    :hover {
      opacity: 80%;
    }
  }

  .SNSWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 35px;
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      /* or 125% */

      color: #868e96;
    }
    .SNSLoginContainer {
      display: flex;
      div {
        font-size: 30px;
        padding: 10px;
        cursor: pointer;
        :hover {
          opacity: 80%;
        }
      }
    }
  }

  .LinkSignUp {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
  .LinkSignUpMessage {
    /* Pretendard Medium 12 */

    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    /* or 133% */

    display: flex;
    align-items: center;

    /* Gray 05 */

    color: #868e96;
    text-decoration: none;

    :hover {
      opacity: 70%;
    }
  }
`;
