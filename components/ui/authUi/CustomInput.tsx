import React from 'react';
import styled from 'styled-components';

declare interface CustomInputProps {
  children?: React.ReactNode;
  type?: string;
  subHeadingText?: string;
  descriptionText?: string;
  placeholder?: string;
  disabled?: boolean;
}

function CustomInput({
  type,
  subHeadingText,
  descriptionText,
  placeholder,
  disabled,
}: CustomInputProps) {
  return (
    <CustomInputDiv>
      <div className="firstLineDiv">
        <p className="subHeading">{subHeadingText}</p>
        <p className="description">{descriptionText}</p>
      </div>
      <div className="SecondLineDiv">
        <input type={type} placeholder={placeholder} disabled={disabled} />
      </div>
    </CustomInputDiv>
  );
}

const CustomInputDiv = styled.div`
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
      width: 90%;
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
`;

export default CustomInput;
