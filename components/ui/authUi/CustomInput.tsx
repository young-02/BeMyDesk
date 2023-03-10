import React from 'react';
import styled from 'styled-components';

declare interface CustomInputProps {
  subHeadingText: string;
  descriptionText: string;
  errorMessageText?: string;
  width: string;
}

function CustomInput({
  subHeadingText,
  descriptionText,
  errorMessageText,
  width,
  ...rest
}: CustomInputProps) {
  return (
    <CustomInputDiv width={width}>
      <div className="firstLineDiv">
        <p className="subHeading">{subHeadingText}</p>
        <p className="description">{descriptionText}</p>
      </div>
      <div className="SecondLineDiv">
        <input {...rest} />
      </div>
      <div className="errorMessageDiv">
        {errorMessageText && <p className="errorMessage">{errorMessageText}</p>}
      </div>
    </CustomInputDiv>
  );
}

const CustomInputDiv = styled.div<CustomInputProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  .firstLineDiv {
    display: flex;
    justify-content: space-between;
    .subHeading {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 10px 5px;
    }
    .description {
      padding-top: 0.15rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: #adb5bd;
    }
  }
  .SecondLineDiv {
    //인풋창
    > input {
      border-radius: 0.625rem;
      padding: 0.8125rem 1.25rem;
      border: 0.0625rem solid #adb5bd;
      width: ${(props) => (props.width ? props.width + '%' : '90%')};
      font-weight: 500;
      font-size: 14px;

      &.error {
        border: 1px solid red;
      }
      &:focus-within {
        border: 1px solid #17171c;
      }
    }
  }
  .errorMessageDiv {
    margin: 5px 0 0 5px;
    height: 15px;
    .errorMessage {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      color: #f83e4b;
    }
  }
`;

export default CustomInput;
