import { app, auth, dbService } from '@/shared/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithCustomToken,
  updateProfile,
} from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc } from 'firebase/firestore';
import useGetReaction from '../../../components/Hooks/useGetReaction';
type Props = {};

export default function SignIn({}: Props) {
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
  const [user, setUser] = useAuthState(auth);
  const [stayLoginisChecked, setStayLoginIsChecked] = useState(false);

  const { follow, scrap } = useGetReaction();

  const handleRadioChange = (e: any) => {
    console.log(e.target.checked);
    setStayLoginIsChecked(e.target.checked);
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
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (regex.test(event.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  function handleEmailInputClick() {
    setEmailEmptyError(false);
    setEmailRegexError(false);
  }

  function handlePwInputClick() {
    setPwEmptyError(false);
    setPwRegexError(false);
  }

  const onClickLoginButton = () => {
    if (emailValid && pwValid) {
      signInWithEmailAndPassword(auth, email, pw)
        .then(() => {
          alert('로그인 성공');
          console.log('login sucess', auth.currentUser);
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
          // emailRef.current?.focus();
        }
      } else if (pwValid === false) {
        {
          pw.length === 0 ? setPwEmptyError(true) : setPwRegexError(true);
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

      await updateProfile(result_google.user, {
        photoURL: '/images/defaultProfile.png',
      });

      const collectionRef = doc(dbService, `userInfo/${auth.currentUser?.uid}`);
      const payload = {
        // 조건걸어서 해당값이 없을때마다 updatedoc으로 넣어주게 변경
        profileImage: '/images/defaultProfile.png',
        nickname: auth.currentUser?.displayName,
        userId: auth.currentUser?.uid,
        scraps: [...scrap],
        following: [...follow],
        introduction: '안녕하세요!',
      };

      await setDoc(collectionRef, payload);
    } catch (error) {
      console.error(error);
    }
    router.push('/post-list');
  };

  //페이스북 로그인

  const facebookAuth = new FacebookAuthProvider();
  const facebookLogin = async () => {
    try {
      const result_facebook = await signInWithPopup(auth, facebookAuth);

      await updateProfile(result_facebook.user, {
        photoURL: '/images/defaultProfile.png',
      });

      const collectionRef = doc(dbService, `userInfo/${auth.currentUser?.uid}`);
      const payload = {
        // 조건걸어서 해당값이 없을때마다 updatedoc으로 넣어주게 변경
        profileImage: '/images/defaultProfile.png',
        nickname: auth.currentUser?.displayName,
        userId: auth.currentUser?.uid,
        scraps: [...scrap],
        following: [...follow],
        introduction: '안녕하세요!',
      };

      await setDoc(collectionRef, payload).then(router.push('/post-list'));
    } catch (error) {
      console.error(error);
    }
    router.push('/post-list');
  };

  useEffect(() => {
    console.log('userInfo', auth.currentUser);
  }, [auth.currentUser]);

  return (
    <StyledBackground>
      <StyledDiv>
        <div className="titleWrap">로그인</div>

        <div className="inputDiv">
          <div
            id="loginInput"
            className={`inputWrap ${
              emailEmptyError || emailRegexError ? 'inputWrap-error' : ''
            }`}
            onClick={handleEmailInputClick}
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
          </div>
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
          <div
            id="pwInput"
            className={`inputWrap ${
              pwEmptyError || pwRegexError ? 'inputWrap-error' : ''
            }`}
            onClick={handlePwInputClick}
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
          </div>
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
              // checked={stayLoginisChecked}
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
            <div onClick={kakaoLogin}>
              {' '}
              <Image
                src="/images/kakaoLogo.png"
                alt="KakaoLogin"
                width={48}
                height={48}
              />
            </div>
            <div onClick={googleLogin}>
              <Image
                src="/images/googleLogo.png"
                alt="GoogleLogin"
                width={48}
                height={48}
              />
            </div>
            <div>
              <Image
                src="/images/naverLogo.png"
                alt="NaverLogin"
                width={48}
                height={48}
              />
            </div>
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
        {/* <StyledDivTest>
          {user ? '환영합니다,' + user.displayName + '님' : ''}
          <button
            onClick={() => {
              console.log(user);
              auth.signOut();
            }}
          >
            로그아웃하기
          </button>
          <button
            onClick={() => {
              console.log(user);
            }}
          >
            로그인 유저 정보
          </button>
        </StyledDivTest> */}
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
  width: 36.75rem;
  height: 44.75rem;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.29);
  border-radius: 20px;
  input {
    width: 100%;
    outline: none;
    border: none;
    height: 48px;
    font-size: 0.875rem;
    font-weight: 400;
  }
  .titleWrap {
    padding-top: 2.5rem;
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 48px;
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
    align-items: center;
    padding: 2.4px 8px 2.4px 8px;
    border-bottom: 2px solid #adb5bd;

    .iconSpan {
      margin-right: 1.25rem;
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
    font-size: 18px;
    line-height: 20px;
    /* identical to box height, or 111% */

    /* Gray 09 */

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
    border: 0.0625rem solid red;
  }
  .errorMessageWrapContainer {
    padding-top: 7px;
    padding-left: 5px;
    height: 14.5px;
  }
  .errorMessageWrap {
    color: #ef0000;
    font-size: 12px;
  }

  /* .inputWrap:focus-within .input-error {
    display: none;
  }

  .inputWrap:focus-within + .errorMessageWrap {
    display: none;
  } */

  .LoginButtonWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1.875rem;
  }
  .LoginButton {
    width: 480px;
    height: 48px;
    border: none;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.25rem;
    background: #206efb;
    border-radius: 10px;
    color: white;
    margin-bottom: 16px;
    cursor: pointer;
  }

  .buttonBottomWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 54px;
    p {
      /* Pretendard Medium 14 */

      font-family: 'Pretendard';
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

    font-family: 'Pretendard';
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
  }

  .SNSWrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 85px;
    p {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      /* or 125% */

      color: #000000;
    }
    .SNSLoginContainer {
      display: flex;
      div {
        font-size: 30px;
        padding: 10px;
        cursor: pointer;
      }
    }
  }

  .LinkSignUp {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 85px;
  }
  .LinkSignUpMessage {
    /* Pretendard Medium 12 */

    font-family: 'Pretendard';
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
  }
`;

const StyledDivTest = styled.div`
  position: fixed;
`;
