import { useEffect, useState } from 'react';
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from 'firebase/auth';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import useResponsive from '@/Hooks/useResponsive';

const ChangePassword = ({ user, setProfileEditModalOpen }: any) => {
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

  // 현재 비밀번호 인풋 온포커스/온블러
  const handleCurrentPasswordInputFocus = () => {
    setErrorCurrentPasswordEmpty(false);
    setErrorCurrentPasswordVerify(false);
    setAllDone(false);
  };
  // 변경할 비밀번호 온포커스/온블러
  const handleNewPasswordInputFocus = () => {
    setErrorNewPasswordEmpty(false);
    setErrorNewPasswordVerify(false);
    setAllDone(false);
  };
  // 한번더 입력해주세요 온포커스/온블러
  const handlePasswordConfirmationInputFocus = () => {
    setErrorPasswordConfirmationEmpty(false);
    setErrorPasswordConfirmationVerify(false);
    setAllDone(false);
  };

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
      // 현재 비밀번호 재검증(로그인후 시간 오래지나면 비번변경, 회원삭제 할때 재인증 필요함)
      const credential = await EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );

      await reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword);
        })
        .then(() => {
          setAllDone(true);
        })
        .catch((error: any) => {
          console.error(error);
          setErrorCurrentPasswordVerify(true);
        });
    }
  };
  const { isMobile, isDesktop } = useResponsive({
    maxWidth: 1000,
    minWidth: 1001,
  });
  return (
    <>
      {isDesktop && (
        <PasswordChange>
          <label htmlFor="currentPassword">현재 비밀번호</label>

          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            placeholder="기존 비밀번호를 입력해주세요."
            onBlur={handleCurrentPasswordInputFocus}
            onFocus={handleCurrentPasswordInputFocus}
            className={
              errorCurrentPasswordEmpty || errorCurrentPasswordVerify
                ? 'error'
                : ''
            }
          />
          <div className="errorDiv">
            <p>{errorCurrentPasswordEmpty ? '필수 입력 항목입니다.' : null}</p>
            <p>
              {errorCurrentPasswordVerify
                ? '현재 비밀번호를 확인해주세요.'
                : null}
            </p>
          </div>
          <div className="newPasswordHeadDiv">
            <label htmlFor="newPassword">변경할 비밀번호</label>
            <p>8~16자리 / 영문 대소문자, 숫자, 특수문자 포함</p>
          </div>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="변경할 비밀번호를 입력해주세요."
            onBlur={handleNewPasswordInputFocus}
            onFocus={handleNewPasswordInputFocus}
            className={
              errorNewPasswordEmpty || errorNewPasswordVerify ? 'error' : ''
            }
          />
          <div className="errorDiv">
            <p>{errorNewPasswordEmpty ? '필수 입력 항목입니다.' : null}</p>
            <p>
              {errorNewPasswordVerify
                ? '비밀번호 양식을 다시 확인해주세요.'
                : null}
            </p>
          </div>
          <label htmlFor="newPasswordVerify">한번 더 입력해주세요</label>
          <input
            type="password"
            id="newPasswordVerify"
            value={passwordConfirmation}
            onChange={(event) => {
              setPasswordConfirmation(event.target.value);
            }}
            placeholder="변경할 비밀번호를 한 번 더 입력해주세요."
            onBlur={handlePasswordConfirmationInputFocus}
            onFocus={handlePasswordConfirmationInputFocus}
            className={
              errorPasswordConfirmationEmpty || errorPasswordConfirmationVerify
                ? 'error'
                : ''
            }
          />
          <div className="errorDiv">
            <p>
              {errorPasswordConfirmationEmpty ? '필수 입력 항목입니다.' : null}
            </p>
            <p>
              {errorPasswordConfirmationVerify
                ? '비밀번호를 확인해 주세요.'
                : null}
            </p>
          </div>
          <div className="passwordChangeButtonDiv">
            <p>{allDone ? '비밀번호를 성공적으로 변경하였습니다.' : null}</p>
            <button onClick={handlePasswordChange}>변경하기</button>
          </div>
        </PasswordChange>
      )}
      {isMobile && (
        <MobilePasswordChange>
          <label htmlFor="currentPassword">현재 비밀번호</label>

          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            placeholder="기존 비밀번호를 입력해주세요."
            onBlur={handleCurrentPasswordInputFocus}
            onFocus={handleCurrentPasswordInputFocus}
            className={
              errorCurrentPasswordEmpty || errorCurrentPasswordVerify
                ? 'error'
                : ''
            }
          />
          <div className="errorDiv">
            <p>{errorCurrentPasswordEmpty ? '필수 입력 항목입니다.' : null}</p>
            <p>
              {errorCurrentPasswordVerify
                ? '현재 비밀번호를 확인해주세요.'
                : null}
            </p>
          </div>
          <div className="newPasswordHeadDiv">
            <label htmlFor="newPassword">변경할 비밀번호</label>
            <p>8~16자리 / 영문 대소문자, 숫자, 특수문자 포함</p>
          </div>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="변경할 비밀번호를 입력해주세요."
            onBlur={handleNewPasswordInputFocus}
            onFocus={handleNewPasswordInputFocus}
            className={
              errorNewPasswordEmpty || errorNewPasswordVerify ? 'error' : ''
            }
          />
          <div className="errorDiv">
            <p>{errorNewPasswordEmpty ? '필수 입력 항목입니다.' : null}</p>
            <p>
              {errorNewPasswordVerify
                ? '비밀번호 양식을 다시 확인해주세요.'
                : null}
            </p>
          </div>
          <label htmlFor="newPasswordVerify">한번 더 입력해주세요</label>
          <input
            type="password"
            id="newPasswordVerify"
            value={passwordConfirmation}
            onChange={(event) => {
              setPasswordConfirmation(event.target.value);
            }}
            placeholder="변경할 비밀번호를 한 번 더 입력해주세요."
            onBlur={handlePasswordConfirmationInputFocus}
            onFocus={handlePasswordConfirmationInputFocus}
            className={
              errorPasswordConfirmationEmpty || errorPasswordConfirmationVerify
                ? 'error'
                : ''
            }
          />
          <div className="errorDiv">
            <p>
              {errorPasswordConfirmationEmpty ? '필수 입력 항목입니다.' : null}
            </p>
            <p>
              {errorPasswordConfirmationVerify
                ? '비밀번호를 확인해 주세요.'
                : null}
            </p>
          </div>
          <div className="MobileProfileCancelDiv">
            <button
              className="ProfileEditThirdLineCancelButton"
              onClick={() => setProfileEditModalOpen(false)}
            >
              취소
            </button>
            <div className="passwordChangeButtonDiv">
              <p>{allDone ? '비밀번호를 성공적으로 변경하였습니다.' : null}</p>
              <button onClick={handlePasswordChange}>변경하기</button>
            </div>
          </div>
        </MobilePasswordChange>
      )}
    </>
  );
};
const MobilePasswordChange = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  label {
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
    height: 42px;

    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    /* or 111% */

    /* Gray 09 */

    color: #17171c;
    border-radius: 0.625rem;
    border: 0.0625rem solid #adb5bd;
    padding: 0 20px;

    &:focus-within {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 20px;
      /* or 111% */

      display: flex;
      align-items: center;
      /* Gray 09 */
      padding: 0 20px;
      color: #17171c;
      border: 1px solid #17171c;
      border-radius: 10px;
    }
  }

  .MobileProfileCancelDiv {
    display: flex;
    justify-content: space-between;
    .ProfileEditThirdLineCancelButton {
      height: 48px;
      align-self: flex-end;
      margin-left: 25px;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 20px;
      text-align: center;
      color: #206efb;
      margin-top: 5px;
      :hover {
        opacity: 90%;
      }
    }
  }
  .passwordChangeButtonDiv {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    :hover {
      opacity: 90%;
    }
    > p {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      color: #206efb;
      margin-right: 5px;
    }
    > button {
      width: 200px;
      height: 48px;
      background: #206efb;
      border-radius: 10px;

      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      color: #ffffff;
      margin-top: 5px;
      margin-right: 10px;
    }
  }
  .errorDiv {
    min-height: 25px;
    > p {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */

      display: flex;
      align-items: center;

      /* Point Red */

      color: #f83e4b;
      margin-left: 5px;
      margin-top: 3px;
    }
  }

  .newPasswordHeadDiv {
    display: flex;
    justify-content: space-between;
    > p {
      font-style: normal;
      font-weight: 500;
      font-size: 11px;
      line-height: 16px;
      /* identical to box height, or 133% */

      text-align: right;

      /* Gray 04 */

      color: #adb5bd;
    }
  }
  .error {
    border-color: #f83e4b;
  }
`;
const PasswordChange = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    /* identical to box height, or 100% */

    /* Gray 09 */

    color: #17171c;
    margin-bottom: 10px;
  }
  > input {
    width: 87%;
    height: 42px;

    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    /* or 111% */

    /* Gray 09 */

    color: #17171c;
    border-radius: 0.625rem;
    border: 0.0625rem solid #adb5bd;
    padding: 0 20px;

    &:focus-within {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 20px;
      /* or 111% */

      display: flex;
      align-items: center;
      /* Gray 09 */
      padding: 0 20px;
      color: #17171c;
      border: 1px solid #17171c;
      border-radius: 10px;
    }
  }

  .passwordChangeButtonDiv {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    min-height: 65px;
    margin: 74.5px 0 0 0;
    :hover {
      opacity: 90%;
    }
    > p {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: #206efb;
      margin-right: 5px;
    }
    > button {
      width: 132px;
      height: 48px;
      background: #206efb;
      border-radius: 10px;

      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 20px;
      text-align: center;
      color: #ffffff;
      margin-top: 5px;
      margin-right: 10px;
    }
  }
  .errorDiv {
    min-height: 40px;
    > p {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */

      display: flex;
      align-items: center;

      /* Point Red */

      color: #f83e4b;
      margin-left: 5px;
      margin-top: 3px;
    }
  }

  .newPasswordHeadDiv {
    display: flex;
    justify-content: space-between;
    > p {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      /* identical to box height, or 133% */

      text-align: right;

      /* Gray 04 */

      color: #adb5bd;
      margin-right: 20px;
    }
  }
  .error {
    border-color: #f83e4b;
  }
`;
export default ChangePassword;
