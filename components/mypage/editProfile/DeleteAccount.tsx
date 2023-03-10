import useResponsive from '@/Hooks/useResponsive';
import { auth, dbService } from '@/shared/firebase';
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  reauthenticateWithPopup,
  OAuthProvider,
} from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

function DeleteAccount() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [errorPasswordValid, setErrorPasswordValid] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [errorEmailValid, setErrorEmailValid] = useState(false);
  // 이메일Regex
  const FullEmailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  //비번 regex
  const passwordRegex =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
  // 동의합니다 버튼
  const btnEvent = () => {
    if (check === false) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  // 이메일 유효성검사
  const handleEmail = (event: any) => {
    setEmail(event.target.value);
    if (FullEmailRegex.test(event.target.value)) {
      setEmailCheck(true);
    }
  };

  // 비밀번호 유효성검사
  const handlePassword = (event: any) => {
    setPassword(event.target.value);
    if (passwordRegex.test(event.target.value)) {
      setPasswordCheck(true);
    }
  };

  // 탈퇴 버튼클릭
  const DeleteButton = async () => {
    const user = auth.currentUser;
    if (user?.email !== email) {
      setErrorEmailValid(true);
    } else {
      let credential;
      let provider;
      if (user.providerData[0].providerId === 'google.com') {
        provider = new OAuthProvider('google.com');
        await reauthenticateWithPopup(user, provider)
          .then(() => {
            try {
              Promise.all([
                deleteDoc(doc(dbService, 'userInfo', user.uid)),
                deleteUser(user),
              ]);
              alert('계정 삭제가 완료되었습니다. 이용해주셔서 감사합니다.');
              router.push('/main');
            } catch (error) {
              console.log('error', error);
              alert('구글 계정이 일치하지 않습니다 다시한번 확인해주세요');
            }
          })
          .catch(() => {
            alert('구글 계정이 일치하지 않습니다 다시한번 확인해주세요');
          });
      } else if (user.providerData[0].providerId === 'facebook.com') {
        provider = new OAuthProvider('facebook.com');
        await reauthenticateWithPopup(user, provider)
          .then(() => {
            try {
              Promise.all([
                deleteDoc(doc(dbService, 'userInfo', user.uid)),
                deleteUser(user),
              ]);
              alert('계정 삭제가 완료되었습니다. 이용해주셔서 감사합니다.');

              router.push('/main');
            } catch (error) {
              console.log('error', error);
              alert('페이스북 계정이 일치하지 않습니다 다시한번 확인해주세요');
            }
          })
          .catch(() => {
            alert('페이스북 계정이 일치하지 않습니다 다시한번 확인해주세요');
          });
      } else {
        credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential)
          .then(() => {
            Promise.all([
              deleteDoc(doc(dbService, 'userInfo', user.uid)),
              deleteUser(user),
            ]);
            alert('계정 삭제가 완료되었습니다. 이용해주셔서 감사합니다.');
            router.push('/main');
          })
          .catch((error: any) => {
            console.log('error', error);
            setErrorPasswordValid(true);
          });
      }
    }
  };

  const { isMobile, isDesktop } = useResponsive({
    maxWidth: 1000,
    minWidth: 1001,
  });

  // 실시간 유효성 검사
  useEffect(() => {
    if (emailCheck && check && passwordCheck) {
      setAllDone(true);
    } else {
      setAllDone(false);
    }
  }, [emailCheck, check, passwordCheck]);
  return (
    <>
      {isDesktop && (
        <DeleteAccountContainer>
          <div className="emailDiv">
            <p className="subheadingText">이메일</p>
            <input
              type="text"
              placeholder="이메일을 입력해주세요."
              onChange={handleEmail}
              onFocus={() => setErrorEmailValid(false)}
              className={errorEmailValid ? 'error' : null}
            />
            <div className="errorMessageDiv">
              {errorEmailValid ? (
                <p className="errorMessageText">이메일을 확인해 주세요.</p>
              ) : null}
            </div>
          </div>
          {auth.currentUser?.providerData[0].providerId === 'password' ? (
            <div className="passwordDiv">
              <p className="subheadingText">비밀번호</p>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={handlePassword}
                onFocus={() => setErrorPasswordValid(false)}
                className={errorPasswordValid ? 'error' : null}
              />
              <div className="errorMessageDiv">
                {errorPasswordValid ? (
                  <p className="errorMessageText">비밀번호를 확인해 주세요.</p>
                ) : null}
              </div>
            </div>
          ) : (
            <div style={{ height: '102.87px' }}></div>
          )}
          <div className="cautionDiv">
            <ul>
              <li>주의사항</li>
              <li>
                1. 현재 사용중인 계정 정보는 회원 탈퇴후 복구가 불가합니다.
              </li>
              <li>2. 계정에 저장된 정보를 미리 백업해 두는 것이 좋습니다.</li>
              <li>3. 서비스 이용 내역을 미리 확인해 보세요.</li>
              <li>4. 탈퇴 전에 문의사항을 해결해 두세요.</li>
              <li>5. 계정 보안을 강화해 두는 것이 좋습니다.</li>
              <li>
                6. 탈퇴 후에도 연락이 필요한 서비스가 있는지 확인해 보세요.
              </li>
              <li>7. 재가입을 위한 절차나 방법을 미리 파악해 두세요.</li>
            </ul>
          </div>
          <div className="buttonDiv pwExist">
            <div className="agree-input-wrap">
              <label htmlFor="check1">
                <input
                  type="checkbox"
                  id="check1"
                  checked={check}
                  onChange={btnEvent}
                />
                <span className="check-custorm" />
                주의사항을 확인했습니다.
              </label>
            </div>
            <div className="buttonWrap">
              <button disabled={!allDone} onClick={DeleteButton}>
                회원탈퇴
              </button>
            </div>
          </div>
        </DeleteAccountContainer>
      )}
      {isMobile && (
        <MobileDeleteAccountContainer>
          <div className="emailDiv">
            <p className="subheadingText">이메일</p>
            <input
              type="text"
              placeholder="가입하신 이메일을 적어주세요."
              onChange={handleEmail}
              onFocus={() => setErrorEmailValid(false)}
              className={errorEmailValid ? 'error' : null}
            />
            <div className="errorMessageDiv">
              {errorEmailValid ? (
                <p className="errorMessageText">이메일을 확인해 주세요.</p>
              ) : null}
            </div>
          </div>
          {auth.currentUser?.providerData[0].providerId === 'password' && (
            <div className="passwordDiv">
              <p className="subheadingText">비밀번호</p>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={handlePassword}
                onFocus={() => setErrorPasswordValid(false)}
                className={errorPasswordValid ? 'error' : null}
              />
              <div className="errorMessageDiv">
                {errorPasswordValid ? (
                  <p className="errorMessageText">비밀번호를 확인해 주세요.</p>
                ) : null}
              </div>
            </div>
          )}

          <div className="cautionDiv">
            <ul>
              <li>주의사항</li>
              <li>
                1. 현재 사용중인 계정 정보는 회원 탈퇴후 복구가 불가합니다.
              </li>
              <li>2. 계정에 저장된 정보를 미리 백업해 두는 것이 좋습니다.</li>
              <li>3. 서비스 이용 내역을 미리 확인해 보세요.</li>
              <li>4. 탈퇴 전에 문의사항을 해결해 두세요.</li>
              <li>5. 계정 보안을 강화해 두는 것이 좋습니다.</li>
              <li>
                6. 탈퇴 후에도 연락이 필요한 서비스가 있는지 확인해 보세요.
              </li>
              <li>7. 재가입을 위한 절차나 방법을 미리 파악해 두세요.</li>
            </ul>
          </div>
          <div className="buttonDiv">
            <div className="agree-input-wrap">
              <label htmlFor="check1">
                <input
                  type="checkbox"
                  id="check1"
                  checked={check}
                  onChange={btnEvent}
                />
                <span className="check-custorm" />
                주의사항을 확인했습니다.
              </label>
            </div>
            <div className="buttonWrap">
              <button disabled={!allDone} onClick={DeleteButton}>
                회원탈퇴
              </button>
            </div>
          </div>
        </MobileDeleteAccountContainer>
      )}
    </>
  );
}

const MobileDeleteAccountContainer = styled.div`
  padding: 20px;
  .emailDiv {
    .subheadingText {
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height, or 100% */

      /* Gray 09 */

      color: #17171c;
      margin-bottom: 10px;
    }
    > input {
      width: 100%;
      box-sizing: border-box;
    }
  }
  .passwordDiv {
    .subheadingText {
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height, or 100% */

      /* Gray 09 */

      color: #17171c;
      margin-bottom: 10px;
    }
    > input {
      width: 100%;
      box-sizing: border-box;
    }
  }
  .cautionDiv {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    /* Gray 00 */

    background: #f1f3f5;
    border-radius: 10px;
    ul li:first-child {
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 5px;
    }

    > ul {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      /* or 143% */

      /* Gray 06 */

      color: #495057;
    }
  }
  .buttonDiv {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 0.625rem;

    label {
      display: flex;
      align-items: center;
      font-size: 0.75rem;
      cursor: pointer;

      input[type='checkbox'] {
        display: none;
      }
      .check-custorm {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 0.625rem;
        border-radius: 100%;
        border: 0.0625rem solid #adb5bd;
      }
      input[type='checkbox']:checked + .check-custorm {
        display: flex;
        justify-content: center;
        align-items: center;

        :after {
          content: '';
          width: 8px;
          height: 8px;
          background: #206efb;
          border-radius: 100%;
        }
      }
    }
  }

  //버튼
  .buttonWrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    :hover {
      opacity: 90%;
    }
    > button {
      width: 132px;
      height: 48px;
      color: #ffffff;
      /* Gray 03 */
      background: #ac3939;
      border: 1px solid #ced4da;
      border-radius: 10px;

      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 20px;
      /* identical to box height, or 100% */

      text-align: center;

      /* Gray 09 */

      margin-top: 5px;
      margin-right: 10px;
      &:disabled {
        background: #ced4da;
        color: #868e96;
      }
    }
  }

  /* 여기부터 공통속성 */
  //에러메세지
  .errorMessageDiv {
    margin-left: 5px;
    margin-top: 5px;
    min-height: 20px;
    .errorMessageText {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */
      /* Point Red */

      color: #f83e4b;
    }
  }

  //서브헤딩 텍스트
  .subheadingText {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 10px 5px;
  }
  //인풋창
  input {
    border-radius: 0.625rem;
    padding: 0.8125rem 1.25rem;
    border: 0.0625rem solid #adb5bd;
    width: 86%;
    font-size: 18px;
    &.error {
      border: 1px solid red;
    }
    &:focus-within {
      border: 1px solid #17171c;
    }
  }
`;
const DeleteAccountContainer = styled.div`
  .emailDiv {
  }
  .passwordDiv {
  }

  .cautionDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 430px;
    height: 226px;
    left: 886px;
    top: 440px;

    /* Gray 00 */

    background: #f1f3f5;
    border-radius: 10px;
    > ul {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      /* or 143% */

      /* Gray 06 */

      color: #495057;
    }
  }
  .buttonDiv {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 0.625rem;
    label {
      display: flex;
      align-items: center;
      font-size: 0.75rem;
      cursor: pointer;

      input[type='checkbox'] {
        display: none;
      }
      .check-custorm {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-right: 0.625rem;
        border-radius: 100%;
        border: 0.0625rem solid #adb5bd;
      }
      input[type='checkbox']:checked + .check-custorm {
        display: flex;
        justify-content: center;
        align-items: center;

        :after {
          content: '';
          width: 8px;
          height: 8px;
          background: #206efb;
          border-radius: 100%;
        }
      }
    }
  }

  //버튼
  .buttonWrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    :hover {
      opacity: 90%;
    }
    > button {
      width: 132px;
      height: 48px;
      color: #ffffff;
      /* Gray 03 */
      background: #ac3939;
      border: 1px solid #ced4da;
      border-radius: 10px;

      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 20px;
      /* identical to box height, or 100% */

      text-align: center;

      /* Gray 09 */

      margin-top: 5px;
      margin-right: 10px;
      &:disabled {
        background: #ced4da;
        color: #868e96;
      }
    }
  }

  /* 여기부터 공통속성 */
  //에러메세지
  .errorMessageDiv {
    margin-left: 5px;
    margin-top: 5px;
    min-height: 20px;
    .errorMessageText {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */
      /* Point Red */

      color: #f83e4b;
    }
  }

  //서브헤딩 텍스트
  .subheadingText {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 10px 5px;
  }
  //인풋창
  input {
    border-radius: 0.625rem;
    padding: 0.8125rem 1.25rem;
    border: 0.0625rem solid #adb5bd;
    width: 86%;
    font-size: 18px;
    &.error {
      border: 1px solid red;
    }
    &:focus-within {
      border: 1px solid #17171c;
    }
  }
`;
export default DeleteAccount;
